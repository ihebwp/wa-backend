import mongoose from "mongoose";

const reviewsSchema = new mongoose.Schema({
  rating: { type: String },
  text: { type: String },
});

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  imgUrl: [{ type: String }],
  imgLink: { type: String },
  category: { type: String },
  description: { type: String },
  discount: { type: String },
  avgRating: { type: String },
  reviews: [reviewsSchema],
  newProduct: { type: Boolean },
});

export default mongoose.model("Product", productSchema);
