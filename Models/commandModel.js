import mongoose from "mongoose";

const commandSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true }, // ✅ Correct reference
        qty: { type: Number, required: true }
      }
    ],
    prixTotale: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"], // ✅ Enforced valid statuses
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Command", commandSchema);
