import billingModel from "../models/billingModel.js"
import slugify from "slugify";

export const billingController = async (req, res) => {
    try {
      const { Bill_ID,Description,Date,Time,Amount,Service_serial_number,Admin_ID,Price } = req.body;

      const existingbilling = await billingModel.findOne({ Bill_ID });
      if (existingbilling) {
        return res.status(200).send({
          success: true,
          message: "Category Already Exisits",
        });
      }
      const billing = await new billingModel({
        
        Bill_ID,
        Description,
        Date,
        Time,
        Amount,
        Service_serial_number,
        Admin_ID,
        Price,
        
      }).save();
      res.status(201).send({
        success: true,
        message: "new bill created",
        billing,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Errro in Billing",
      });
    }
  };


  export const billingControllerAll = async (req, res) => {
    try {
      const billing = await billingModel.find({});
      res.status(200).send({
        success: true,
        message: "All Categories List",
        billing,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error while getting all categories",
      });
    }
  };