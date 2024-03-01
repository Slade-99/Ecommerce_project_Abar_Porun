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
      Service_serial_number: {
        type: String,
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