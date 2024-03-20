import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {

    code: {
        type: String,
        required: true,
        unique: true,
      },
    
    description: {
      type: String,
      required: true,
    },
    colour: {
      type: String,
      required: true,
    },
    design: {
      type: String,
      required: true,
    },
    slug: {
        type: String,
        required: true,
      },
    fabric_type: {
        type: String,
        required: true,
      },
    size: {
        type: Number,
        required: true,
      },
    price: {
      type: Number,
      required: true,
    },
    price_range: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.ObjectId,
      ref: "Category",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    review: {
        type: String,
    },
    admin_id: {
        type: mongoose.ObjectId,
        ref: "employeeModel",
        required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Products", productSchema);