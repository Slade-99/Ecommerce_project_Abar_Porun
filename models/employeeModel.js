import mongoose from 'mongoose'



const employeeSchema = new mongoose.Schema({
    Employee_ID: {
        type: String,
        required: true
      },
      Name: {
        type: String,
        required: true
      },
      Password: {
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
      Type: {
        type: String,
        required: true
      },
      Salary: {
        type: Number,
        
      },
      Salary_per_day: {
        type: Number,
        
      }





})




export default mongoose.model('employeeModel',employeeSchema)