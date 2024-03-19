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
      default: "Not Process",
      enum: ["Not Process", "Processing", "Shipped", "deliverd", "cancel"],
    },
    Date: {
      type: String,
      required: true
    },
    Time: {
      type: String,
      required: true
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);