import mongoose from 'mongoose'



const billingSchema = new mongoose.Schema({
    Bill_ID: {
        type: String,
        required: true,
        unique: true
      },
      Description: {
        type: String,
        required: true
      },
      Date: {
        type: String,
        required: true
      },

      Time: {
        type: String,
        required: true
      },
      Amount: {
        type: Number,
        required: true
      },
      Customer_ID: {
        type: mongoose.ObjectId,
        ref: "customerModel",
        required: true
      },
      Admin_ID: {
        type: String,
        required: true
      },
      Price: {
        type: Number,
        required: true
      }





})




export default mongoose.model('billing',billingSchema)