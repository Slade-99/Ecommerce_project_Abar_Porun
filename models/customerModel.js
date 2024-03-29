import mongoose from 'mongoose'



const customerSchema = new mongoose.Schema({
    Customer_ID: {
        type: String,
        required: true,
        unique: true
      },
      Name: {
        type: String,
        required: true
      },
      Password: {
        type: String,
        required: true
      },

      Email: {
        type: String,
        required: true
      },
      Address: {
        type: String,
        required: true
      },
      Phone: {
        type: String,
        required: true
      },
      Gender: {
        type: String,
        required: true
      },
      Question: {
        type: String,
        required: true
      }





})




export default mongoose.model('customerModel',customerSchema)