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
        type: String
      },
      Address: {
        type: String
      },
      Phone: {
        type: String
      },
      Gender: {
        type: String
      }





})




export default mongoose.model('customerModel',customerSchema)