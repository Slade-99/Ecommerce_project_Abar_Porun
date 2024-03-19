import mongoose from 'mongoose'



const billingSchema = new mongoose.Schema({
    Bill_ID: {
        type: String,
        required: true,
        unique: true
      },
      
      Date: {
        type: String,
        
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
        type: String,
        required: true
      }





})




export default mongoose.model('billing',billingSchema)