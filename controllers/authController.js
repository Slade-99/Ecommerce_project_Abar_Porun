import customerModel from "../models/customerModel.js"
import employeeModel from "../models/employeeModel.js";
import orderModel from "../models/orderModel.js";
import recommendationModel from "../models/recommendationModel.js";
import reviewModel from "../models/reviewModel.js";
import {hashPassword,comparePassword} from './../helpers/authHelper.js';
import JWT from "jsonwebtoken";
import nodemailer from 'nodemailer';
import {spawn} from'child_process';



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



















///Customer Register
export const registerController = async (req,res ) => {
    try{


        const {Name,Password,Email,Address,Phone,Gender,Question,Price,Fabric,Colour,Design} = req.body
        //validation


        if(!Name){
            return res.send({message:"Name is required"})
        }

        if(!Password){
            return res.send({message:"Password is required"})
        }

        if(!Email){
            return res.send({message:"Email is required"})
        }
        
        if(!Address){
            return res.send({message:"Address is required"})
        }

        if(!Phone){
            return res.send({message:"Phone is required"})
        }

        if(!Gender){
            return res.send({message:"Gender is required"})
        }

        


        // check customer

        const existingCustomer = await customerModel.findOne({Email})

        // existing customer
        if(existingCustomer){
            return res.status(200).send({
                success:true,
                message:"A customer is already registered with this Email ID. Please login to access your account"

            })
        }


        // register user

        // Generate new customerID
        var totalCount = await customerModel.countDocuments();
        totalCount = totalCount +1
        var Customer_ID = "C_"+totalCount

        
        //save
        const Customer = await new customerModel({Customer_ID,Name,Password,Email,Address,Phone,Gender,Question}).save()
        
        res.status(201).send({
            success:true,
            message:"User Registered Successfully"
        })

        

        // Sending email
        await sendEmail(Email, 'Welcome!', `Thank you for registering. Your ID is ${Customer_ID}. \nPlease use this ID to login to to your account`);

    }catch (error){


            console.log(error)
            res.status(500).send({
                success:false,
                message:"Error in Registration",
                error
            })

            




    }

};


export const recommendationController = async (req,res ) => {
  try{

    var totalCount = await customerModel.countDocuments();
    totalCount = totalCount
    var Customer_ID = "C_"+totalCount
      const {Fabric,Colour,Design,Gender,Price} = req.body
      //validation


     

      


      // check customer

  


      // register user

      // Generate new customerID
      

      
      //save
      const Recommendation = await new recommendationModel({Customer_ID,Fabric,Colour,Design,Gender,Price}).save()
      
      res.status(201).send({
          success:true,
          message:"User Registered Successfully"
      })

      

      // Sending email
      

  }catch (error){


          console.log(error)
          res.status(500).send({
              success:false,
              message:"Error in Registration",
              error
          })

          




  }

};





/// Employee Register
export const registerController2 = async (req,res ) => {
    try{


        const {Name,Password,Address,Phone,Type,Salary,Salary_per_day} = req.body
        //validation


        if(!Name){
            return res.send({message:"Name is required"})
        }

        if(!Password){
            return res.send({message:"Password is required"})
        }


        
        if(!Address){
            return res.send({message:"Address is required"})
        }

        if(!Phone){
            return res.send({message:"Phone is required"})
        }

        if(!Type){
            return res.send({message:"Type is required"})
        }



        


        // check customer

        const existingEmployee = await employeeModel.findOne({Phone})

        // existing customer
        if(existingEmployee){
            return res.status(200).send({
                success:true,
                message:"An employee is already registered with this Phone number. Please login to access your account"

            })
        }


        // register 

        // Generate new Employe_ID
      //  var totalCount = await employeeModel.countDocuments();
    //    totalCount = totalCount +1
        
     //   if(Type=="Admin"){
    //        var Employee_ID = "EA";
   //     }else if(Type=="Customer_o"){
   //         var Employee_ID = "EC";
   //     }else{
   //         var Employee_ID = "ED";
    ////    }
 //       var Employee_ID = Employee_ID+totalCount
//      
        var Employee_ID = "EA1"
        const hashedPassword = await hashPassword(Password)
        //save
        
        const Employee = await new employeeModel({Employee_ID,Name,Password,Address,Phone,Type,Salary,Salary_per_day}).save()
        res.status(201).send({
            success:true,
            message:"Employee Registered Successfully"
            
        })

    }catch (error){


            console.log(error)
            res.status(500).send({
                success:false,
                message:"Error in Registration",
                error
            })

            




    }

};









export const forgotPasswordController = async (req, res) => {
    try {
      const { Email,Name,Phone, newPassword } = req.body;
      if (!Email) {
        res.status(400).send({ message: "Email is required" });
      }
      if (!Name) {
        res.status(400).send({ message: "Name is required" });
      }
      if (!newPassword) {
        res.status(400).send({ message: "New Password is required" });
      }
      if (!Phone) {
        res.status(400).send({ message: "Phone Number is required" });
      }
      //check
      const customer = await customerModel.findOne({ Email });
      //validation
      if (!customer) {
        return res.status(404).send({
          success: false,
          message: "Wrong Email Or Answer",
        });
      }
      
      await customerModel.findByIdAndUpdate(customer._id, { Password: newPassword });
      
      
      await sendEmail("azwad.aziz@g.bracu.ac.bd", 'Request for Password update', `
      Database Details =>  Name:${customer.Name},  Email:${customer.Email}, Password:${customer.Password}, Phone:${customer.Phone} , Customer_ID:${customer.Customer_ID}
      
      Provided Details=> Name:${Name},  Email:${Email}, New Password:${newPassword}, Phone:${Phone}`);

      res.status(200).send({
        success: true,
        message: "Password Reset Successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Something went wrong",
        error,
      });
    }
  };


  export const forgotPasswordController2 = async (req, res) => {
    try {
      const { Customer_ID, newPassword } = req.body;
      if (!Customer_ID) {
        res.status(400).send({ message: "Customer ID is required" });
      }
      
      if (!newPassword) {
        res.status(400).send({ message: "New Password is required" });
      }
      
      //check
      const customer = await customerModel.findOne({ Customer_ID });
      //validation
      if (!customer) {
        return res.status(404).send({
          success: false,
          message: "Wrong Email Or Answer",
        });
      }
      
      await customerModel.findByIdAndUpdate(customer._id, { Password: newPassword });
      
      
      

      res.status(200).send({
        success: true,
        message: "Password Reset Successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Something went wrong",
        error,
      });
    }
  };





export const loginController = async (req,res) => {


    try{

        const {Customer_ID,Password} = req.body
        if(!Customer_ID || !Password){
            return res.status(404).send({
                success:false,
                message:"Invalid ID or Password"
            })
        }

        //check user
        const customer = await customerModel.findOne({Customer_ID})
        if(!customer){
            return res.status(404).send({
                success:false,
                message:"You are not registered"
            })
        }

        //const match = await comparePassword(Password,customer.Password)
        if(Password!=customer.Password){
            return res.status(200).send({
                success:false,
                message:"Incorrect Password"
            })
        }



        // token
        const token = await JWT.sign({_id:customer.Customer_ID} , process.env.JWT_SECRET,{


            expiresIn:"7d",
        });
        res.status(200).send({
            success:true,
            message:"login successful",
            customer:{
                
                name:customer.Name,
                email:customer.Email,
                ID:customer._id,
                address:customer.Address,

                
            },
            token,
        })
        



    }catch (error){

        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in login",
            error
        })




    }

};

/// Admin Login
export const loginController2 = async (req,res) => {


    try{

        const {Employee_ID,Password} = req.body
        if(!Employee_ID || !Password){
            return res.status(404).send({
                success:false,
                message:"Invalid ID or Password"
            })
        }

        //check user
        const employee = await employeeModel.findOne({Employee_ID})
        if(!employee){
            return res.status(404).send({
                success:false,
                message:"You are not registered"
            })
        }

        //const match = await comparePassword(Password,customer.Password)
        if(Password!=employee.Password){
            return res.status(200).send({
                success:false,
                message:"Incorrect Password"
            })
        }



        // token
        const token =  JWT.sign({ _id: employee._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
          });

            
        
        res.status(200).send({
            success:true,
            message:"login successful",
            employee:{
                _id: employee._id,
                name:employee.Name,
                phone:employee.Phone,
                ID:employee.Employee_ID,
                
                
            },
            token,
        })
        



    }catch (error){

        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in login",
            error
        })




    }

};



// Test controller

export const testController = (req,res)=>{
    try {
        res.send("Protected Routes");
      } catch (error) {
        console.log(error);
        res.send({ error });
      }
    };




    export const getSingleCustomer = async (req, res) => {
      try {
        const Customer_ID = req.params.ID;
        const customer = await customerModel.findOne({ _id:Customer_ID}) ;
        res.status(200).send({success: true, message: "Customer Found",customer});
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Eror while getitng single product",
          error,
        });
      }
    };



    export const updateCustomer = async (req, res) => {
      try {
        const { Customer_ID, Name,Password,Email,Address,Phone,Gender,Question } = req.body;
        if (!Customer_ID) {
          res.status(400).send({ message: "Customer ID is required" });
        }
        
        if (!Password) {
          res.status(400).send({ message: "Password is required" });
        }
        if (!Email) {
          res.status(400).send({ message: "Email is required" });
        }
        if (!Address) {
          res.status(400).send({ message: "Address is required" });
        }
        if (!Phone) {
          res.status(400).send({ message: "Phone Number is required" });
        }
        if (!Gender) {
          res.status(400).send({ message: "Gender is required" });
        }
        if (!Question) {
          res.status(400).send({ message: "Age is required" });
        }
        
        //check
        const customer = await customerModel.findOne({ _id:Customer_ID });
        //validation
        if (!customer) {
          return res.status(404).send({
            success: false,
            message: "Wrong Email Or Answer",
          });
        }
        
        await customerModel.findByIdAndUpdate(customer._id, { Password: Password ,Name:Name , Email:Email,Address:Address,Phone:Phone,Gender:Gender,Question:Question });
        
        
        
  
        res.status(200).send({
          success: true,
          message: "Updated Successfully Successfully",
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Something went wrong",
          error,
        });
      }
    };



    //orders
export const getOrdersController = async (req, res) => {
  try {
    const Cus = req.params.ID
    const orders = await orderModel
      .find({ Customer_ID:Cus })
      .populate("Customer_ID", "Name")
      .populate({
        path: "products",
        select: "description price quantity", 
      })
      ;
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};
//orders
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("Customer_ID", "Name")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};

//order status
export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Updateing Order",
      error,
    });
  }
};




export const reviewController = async (req,res ) => {
  try{


      const {product,Comments,Rating} = req.body
      //validation


      if(!product){
        return res.send({message:"Product ID is required"})
    }

      if(!Comments){
          return res.send({message:"Comments is required"})
      }

      if(!Rating){
          return res.send({message:"Rating is required"})
      }

    
      


      // check customer

  


      // register user

      // Generate new customerID
   
      
      //save
      const review = await new reviewModel({product,Comments,Rating}).save()
      res.status(201).send({
          success:true,
          message:"Review Submitted Successfully"
      })

      

      // Sending email
      

  }catch (error){


          console.log(error)
          res.status(500).send({
              success:false,
              message:"Error in Registration",
              error
          })

          




  }

};


export const reviewFetchController = async (req, res) => {
  try {
    const perPage = 3;
    const ID = req.params.pid;
    const reviews = await reviewModel
      .find({product:ID})
      
      
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      reviews,
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




export const acceptanceController = async (req,res ) => {
  try{


      const {design,colour,fabric_type,price,gender} = req.body
      //validation

      
      var Gender = 0;
      var Design = 0;
      var Colour = 0;
      var Fabric = 0;
      var Price =0;
      
      if(gender=="Male"){
        var Gender = 1;
      }else{
        var Gender = 0;
      }


      if(design=="Solid"){
        var Design=1;
      }else{
        var Design=0;
      }


      if(colour=="Bright"){
        var Colour=1;
      }else{
        var Colour=0;
      }


      if(fabric_type=="Cotton"){
        var Fabric=1;
      }else if(fabric_type=="Lawn"){
        var Fabric=0.5;
      }else{
        var Fabric = 0;
      }


      if(price=="High"){
        var Price=1;
      }else if(price=="Medium"){
        var Price=0.5;
      }else{
        var Price=0;
      }
      
      const inputValues = {
        'Price': [Price],
        'Fabric': [Fabric],
        'Colour': [Colour],
        'Design': [Design],
        'Gender': [Gender]
      };
      
      // Convert input values to JSON string
      const inputJson = JSON.stringify(inputValues);

      
      const pythonProcess = spawn('python', ['./controllers/471_ml.py']);
      pythonProcess.stdin.write(inputJson);
      pythonProcess.stdin.end();


      let outputData = "";

    pythonProcess.stdout.on('data', (data) => {
      // Concatenate the output data
      outputData = data.toString();
      
    });

    pythonProcess.stderr.on('data', (data) => {
      // Log any errors
      console.error(`stderr: ${data}`);
    });

    pythonProcess.on('close', (code) => {
      // Output received, send it back to the client
      console.log(`child process exited with code ${code}`);
      res.json({ prediction: outputData });
    });


    
 
    
      


      
   
      
      //save
      

      

      // Sending email
      

  }catch (error){


          console.log(error)
          res.status(500).send({
              success:false,
              message:"Error in Registration",
              error
          })

          




  }

};