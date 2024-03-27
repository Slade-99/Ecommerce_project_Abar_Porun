import mongoose from 'mongoose'



const reviewSchema = new mongoose.Schema({
    
      
      

  product: {
    type: mongoose.ObjectId,
    ref: "productModel",
    required: true,
},
      
      
      Comments: {
        type: String,
        required: true
      },
      Rating: {
        type: String,
        required: true
      }





})




export default mongoose.model('review',reviewSchema)