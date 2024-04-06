import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        type: mongoose.ObjectId,
        ref: "Products",
        
      },
    ],
    payment: {},
    Customer_ID: {
      type: mongoose.ObjectId,
      ref: "customerModel",
      required: true,
    },
    status: {
      type: String,
      default: "Not Processing",
      enum: ["Not Processing", "Processing", "Shipped", "Delivered", "Cancelled"],
    },
    Date: {
      type: String,
      required: true
    },
    
    Time: {
      type: String,
      required: true
    },
    Quantity: {
      type: Number,
      required: true
    },
    Price: {
      type: Number,
      required: true
    },
    Address: {
      type: String,
      required: true
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);