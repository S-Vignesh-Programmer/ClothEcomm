import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String },
    price: { type: Number, required: true },
    description: { type: String },
    category: { type: String },
    rating: { type: Number, default: 0 }, 
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
