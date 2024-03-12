import mongoose, { Document, Schema } from "mongoose";

export interface IOrder extends Document {
  userId: string;
  productIds: string[];
  quantities: number[];
  totalAmount: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema: Schema = new Schema({
  userId: { type: String, required: true },
  productIds: [{ type: String, required: true }],
  quantities: [{ type: Number, required: true }],
  totalAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "processing", "shipped", "delivered"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model<IOrder>("Order", OrderSchema);
