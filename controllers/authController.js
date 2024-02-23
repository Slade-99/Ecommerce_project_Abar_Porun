import customerModel from "../models/customerModel.js"
import employeeModel from "../models/employeeModel.js";
import {hashPassword,comparePassword} from './../helpers/authHelper.js';
import JWT from "jsonwebtoken";
import nodemailer from 'nodemailer';



///Mail Sending function
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


        const {Name,Password,Email,Address,Phone,Gender} = req.body
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
        var Customer_ID = "C_0"+totalCount

        const hashedPassword = await hashPassword(Password)
        //save
        const Customer = await new customerModel({Customer_ID,Name,Password,Email,Address,Phone,Gender}).save()
        res.status(201).send({
            success:true,
            message:"User Registered Successfully"
        })

        

        // Sending email
        await sendEmail(Email, 'Welcome!', 'Thank you for registering.');

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
                email:customer.Email

                
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
        const token = await JWT.sign({_id:employee.Employee_ID} , process.env.JWT_SECRET,{


            expiresIn:"7d",
        });
        res.status(200).send({
            success:true,
            message:"login successful",
            employee:{
                name:employee.Name,
                email:employee.Type

                
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