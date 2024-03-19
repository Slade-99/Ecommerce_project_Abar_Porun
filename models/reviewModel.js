import mongoose from 'mongoose'



const reviewSchema = new mongoose.Schema({
    
      
      

      
      
      
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