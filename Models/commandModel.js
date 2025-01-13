import mongoose from "mongoose";

const commandSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products:{
      type: [Object]
    },
    prixTotale: { type: Number, required: true },
    status: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Command", commandSchema);
