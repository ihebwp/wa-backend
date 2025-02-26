import mongoose from "mongoose";

const reviewsSchema = new mongoose.Schema({
  rating: { type: String },
  text: { type: String },
});
const allowedCategories = [
  "Computing",
  "Phones",
  "Storage",
  "Printing",
  "Multimedia",
  "Appliances",
  "Security",
  "Office",
];
const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  imgUrl: [{ type: String }],
  imgLink: { type: String },
  category: { type: String, enum: allowedCategories, required: true },
  description: { type: String },
  discount: { type: String },
  avgRating: { type: String },
  reviews: [reviewsSchema],
  newProduct: { type: Boolean },
}, { timestamps: true });

export default mongoose.model("Product", productSchema);
