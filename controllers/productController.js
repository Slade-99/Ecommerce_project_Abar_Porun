import productModel from "../models/productModel.js";
import fs from "fs";
import slugify from "slugify";



export const createProductController = async (req, res) => {
  try {
    const { description,fabric_type,size, price, category, quantity, admin_id,review } = req.fields;
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