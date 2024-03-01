import JWT from 'jsonwebtoken';

import employeeModel from "../models/employeeModel.js";



// protected Routes token base

export const requireSignIn = async(req,res,next)=>{

    
    

    try {
        const decode = JWT.verify(
          req.headers.authorization,
          process.env.JWT_SECRET
        );
        req.customer = decode;
        next();
      } catch (error) {
        console.log(error);
      }
    };



export const isAdmin = async (req, res, next) => {
  
  
  
  try {
    
    const {Employee_ID,Password} = req.body
    
    const employee = await employeeModel.findOne(Employee_ID);
    if (employee.Employee_ID[1]!= "A") {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middelware",
    });
  }
};