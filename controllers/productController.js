import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";
import billingModel from "../models/billingModel.js";
import fs from "fs";
import PDFDocument from "pdfkit";
import slugify from "slugify";
import braintree from "braintree";
import dotenv from "dotenv";
import nodemailer from 'nodemailer';
import orderModel from "../models/orderModel.js";
import recommendationModel from "../models/recommendationModel.js";
import path from 'path';

dotenv.config();



const sendEmail = async (to, subject, text) => {
  try {
    // Create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'azwad.aziz2002@gmail.com', // Your email
        pass: 'hvhk xzxa fnly lzcq', // Your password
      },
    });

    // Send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Abar Porun" <your@gmail.com>', // Sender address
      to: to, // List of receivers
      subject: subject, // Subject line
      text: text, // Plain text body
    });

    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.error('Error occurred while sending email:', error);
  }
};

//payment gateway
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});


export const createProductController = async (req, res) => {
  try {
    const { description,colour,design,fabric_type,size, price, category, quantity, admin_id,review } = req.fields;
    const { photo } = req.files;
    //alidation
    switch (true) {
      


      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !fabric_type:
        return res.status(500).send({ error: "fabric_type is Required" });
        case !price:
        return res.status(500).send({ error: "Price is Required" });
        case !size:
        return res.status(500).send({ error: "size is Required" });
        case !admin_id:
        return res.status(500).send({ error: "admin_id is Required" });
        case !review:
          return res.status(500).send({ error: "review is Required" });

      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    var totalCount = await productModel.countDocuments();
    totalCount = totalCount +1
    const code = "P_"+totalCount
    
    
    
    const products = new productModel({ ...req.fields, code:code, slug: slugify(description) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating product",
    });
  }
};

//get all products
export const getProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .populate("admin_id")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      counTotal: products.length,
      message: "ALlProducts ",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in getting products",
      error: error.message,
    });
  }
};



export const getTrendingProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .populate("admin_id")
      .select("-photo")
      .limit(6)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      counTotal: products.length,
      message: "ALlProducts ",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in getting products",
      error: error.message,
    });
  }
};


//get a user's recommendation
export const getUserRecommendationController = async (req, res) => {
  try {
    const Customer_ID = req.params.ID;
    const recommendation = await recommendationModel.findOne({Customer_ID:Customer_ID});
      
    res.status(200).send({success: true, message: "Customer Found",recommendation});
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in getting products",
      error: error.message,
    });
  }
};

   



//get the recommended products
export const getRecommendedProductsController = async (req, res) => {
  try {
    const Fabric=req.params.Fabric;
    const Colour = req.params.Colour;
    const Design = req.params.Design;
    const Price = req.params.Price;
    const products = await productModel
      .find({price_range: Price, 
        design: Design,      
        fabric_type: Fabric,
        colour: Colour  })
      .populate("category")
      .populate("admin_id")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      counTotal: products.length,
      message: "ALlProducts ",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in getting products",
      error: error.message,
    });
  }
};



// get single product
export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel .findOne({ slug: req.params.slug }) .select("-photo") .populate("category").populate("admin_id")
    res.status(200).send({success: true, message: "Single Product Fetched",product,});
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror while getitng single product",
      error,
    });
  }
};

// get photo
export const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr while getting photo",
      error,
    });
  }
};

//delete controller
export const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};




// delete where quantity===0
export const clearStockController = async (req, res) => {
  try {
    // Delete all products where quantity equals 0
    await productModel.deleteMany({ quantity: 0 });

    res.status(200).send({
      success: true,
      message: "Products with quantity 0 deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting products with quantity 0",
      error,
    });
  }
};



//upate product
export const updateProductController = async (req, res) => {
  try {
    const { description, fabric_type, size, price, category, quantity, admin_id, review } = req.fields;
    const { photo } = req.files;

    const product = await productModel.findById(req.params.pid);

    if (!product) {
      return res.status(404).send({ error: "Product not found" });
    }

    // Prepare the update object with provided fields
    const updateFields = {};
    if (description) updateFields.description = description;
    if (fabric_type) updateFields.fabric_type = fabric_type;
    if (size) updateFields.size = size;
    if (price) updateFields.price = price;
    if (category) updateFields.category = category;
    if (quantity) updateFields.quantity = quantity;
    if (admin_id) updateFields.admin_id = admin_id;
    if (review) updateFields.review = review;
    if (description) updateFields.slug = slugify(description);

    // If photo is provided, update photo data and content type
    if (photo) {
      updateFields.photo = {
        data: fs.readFileSync(photo.path),
        contentType: photo.type
      };
    }

    // Update the product
    const updatedProduct = await productModel.findByIdAndUpdate(req.params.pid, updateFields, { new: true });

    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      product: updatedProduct,
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Update product",
    });
  }
};






// filters
export const productFiltersController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModel.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Filtering Products",
      error,
    });
  }
};


// filters 2
export const productFiltersController2 = async (req, res) => {
  try {
    const {  radio } = req.body;
    let args = {};
    
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModel.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Filtering Products",
      error,
    });
  }
};









// product count
export const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in product count",
      error,
      success: false,
    });
  }
};


export const productListController = async (req, res) => {
  try {
    const perPage = 2;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in per page ctrl",
      error,
    });
  }
};




// searchProduct

export const searchProductController = async (req,res) => {
  try {
    const {keyword} =req.params;
    const results = await productModel.find({
      $or:[
        
        {description:{$regex : keyword, $options:"i"}},
      ],
    })
    .select("-photo");
    res.json(results);
  } catch (error){
    console.log(error);
    res.status(400).send({
      success:false,
      message:'Error in search product API',
      error,
    });
  } 
};



//payment gateway api
//token
export const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};



export const productCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    const products = await productModel.find({ category }).populate("category");
    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error While Getting products",
    });
  }
};


//payment
export const brainTreePaymentController = async (req, res) => {
  try {
    const { nonce, cart , Customer_ID , currentDate, currentTime,quant ,Price , newAddress,Email} = req.body;
    
    
    
    let newTransaction = gateway.transaction.sale(
      {
        amount: Price,
        
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      
      function (error, result) {
        
        if (result) {
          
          const order = new orderModel({
            products: cart,
            payment: result,
            Customer_ID: Customer_ID,
            Date:currentDate,
            Time:currentTime,
            Quantity:quant,
            Price:Price,
            Address:newAddress,
          }).save();
          res.json({ ok: true });
        } else {
          res.status(500).send(error);
        }
      }
    );



    


    
  } catch (error) {
    console.log(error);
  }
};

export const sendPurchaseEmail = async (req,res) => {
  try {

    const { Email,Price} = req.body;
  

  const orders = await orderModel.find({}).sort({ createdAt: -1 }).limit(1);
const lastOrder = orders[0];

const lastOrderID = lastOrder._id.toString().substring(lastOrder._id.length - 5);

    await sendEmail(Email, 'Purchase Successful!', `Thank you for ordering from Abar Porun. Your ID is ${lastOrderID.slice(-7,-1)}. \nPlease use this Order_ID to track your order\nTotal price of your order is: ${Price}`);
    res.json({ ok: true });
  } catch (error) {
    console.error('Error occurred while sending email:', error);
  }
};






//update stock
export const updateStockDecController = async (req, res) => {
  
    
  
  const product = await productModel.findById(req.params.pid);
  
  if (!product) {
    return res.status(404).send({ error: "Product not found" });
  }


  



  const updateFields = {
    $inc: { quantity: -1 } // Decrease the quantity field by 1
  };
   
  
  
  const updatedProduct = await productModel.findByIdAndUpdate(req.params.pid, updateFields, { new: true });
  
   

    // Prepare the update object with provided fields
  if(updatedProduct){
    return res.status(200).send({success:"Updated"})
  }

    

   
};


//update stock
export const updateStockIncController = async (req, res) => {
  
    
  
  const product = await productModel.findById(req.params.pid);
  
  if (!product) {
    return res.status(404).send({ error: "Product not found" });
  }


  



  const updateFields = {
    $inc: { quantity: 1 } // Decrease the quantity field by 1
  };
   
  
  
  const updatedProduct = await productModel.findByIdAndUpdate(req.params.pid, updateFields, { new: true });
  
   

    // Prepare the update object with provided fields
  if(updatedProduct){
    return res.status(200).send({success:"Updated"})
  }

    

   
};






























export const createInvoice = async (req, res) => {
  try {
    // Extract data from the request body
    const { currentDate,Amount,Price,items} = req.body;
    const orders = await orderModel.find({}).sort({ createdAt: -1 }).limit(1);
    const lastOrder = orders[0];
    
    const lastOrderID = lastOrder._id.toString().substring(lastOrder._id.length - 5);
    // Create a new PDF document
    const doc = new PDFDocument();
    const filename = 'invoice.pdf';
    
    // Set response headers
    res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"');
    res.setHeader('Content-type', 'application/pdf');

    var totalCount = await billingModel.countDocuments();
    totalCount = totalCount;
    var Bill_ID = "B_"+totalCount;
    var date = currentDate.split("T")[0];

    const logoPath = 'logo.png'; 
    const signaturePath = 'signature.png';// Adjust the filename and path as needed
    doc.image(logoPath, 25, 25, { width: 85 });
   
    
    doc.text('ABAR POPRUN\n', { align: 'center' });
    doc.text('------------------\n', { align: 'center' });
    doc.text('Invoice\n\n\n\n', { align: 'center' });
    
    
    doc.text(`Order_ID                            TOTAL                            QUANTITY                            DATE\n`);
    doc.text(`____________________________________________________________________\n`);
    doc.text(`${lastOrderID.slice(-7,-1)}                                    ${Price}                                   ${Amount}                            ${date}`);
    

        // Add rows dynamically for each item in the cart using map
    doc.text('___________',50,600);
    doc.text('Your signature',50,620);


    
    doc.image(signaturePath,450,580,{ width: 60 });
    doc.text('___________',450,600);
    doc.text("Employee's signature",450,620);
    

    // Pipe the PDF content to the response
    doc.pipe(res);
    
    
    doc.end();
  } catch (error) {
    console.error('Error generating invoice:', error);
    res.status(500).send('Error generating invoice');
  }
};
/*
export const createInvoice = async (req, res) => {
  try {
    // Extract data from the request body
    const { currentDate, cart } = req.body;

    // Create a new PDF document
    const doc = new PDFDocument();
    const filename = 'invoice.pdf';
    
    // Set response headers
    res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"');
    res.setHeader('Content-type', 'application/pdf');

    var totalCount = await billingModel.countDocuments();
    totalCount = totalCount;
    var Bill_ID = "B_" + totalCount;
    var date = currentDate.split("T")[0];
    
    doc.text('ABAR POPRUN\n', { align: 'center' });
    doc.text('Invoice\n\n\n\n', { align: 'center' });
    doc.text(`BILL_ID\tTOTAL\tQUANTITY\tDATE\n\n`);
    doc.text(`${Bill_ID}\tPrice\tAmount\t${date}\n\n`);
    
    // Add rows dynamically for each item in the cart
    cart.forEach((item) => {
      doc.text(`${item.description}\t${item.price}\n`);
    });

    // Pipe the PDF content to the response
    doc.pipe(res);
    doc.end();
  } catch (error) {
    console.error('Error generating invoice:', error);
    res.status(500).send('Error generating invoice');
  }
};
*/





