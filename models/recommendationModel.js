import mongoose from "mongoose";

const recommendationSchema = new mongoose.Schema(
  {

    Customer_ID: {
        type: String,
        required: true,
        unique: true,
      },
    
    Fabric: {
      type: String,
      required: true,
    },
    Colour: {
        type: String,
        required: true,
      },
    Design: {
        type: String,
        required: true,
      },
    Gender: {
        type: String,
        required: true,
      },
    Price: {
      type: String,
      required: true,
    },
    
  },
  { timestamps: true }
);

export default mongoose.model("recommendation", recommendationSchema);