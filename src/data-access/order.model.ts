import mongoose, { Document, Schema } from "mongoose";

export interface IOrder extends Document {
  userId: string;
  products: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  paymentMethod: string;
  paymentResult?: {
    id: string;
    status: string;
    updateTime: string;
    emailAddress: string;
  };
  isPaid: boolean;
  paidAt?: Date;
  isDelivered: boolean;
  deliveredAt?: Date;
}

const orderSchema: Schema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  products: [
    {
      productId: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    zip: String,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  paymentResult: {
    id: String,
    status: String,
    updateTime: String,
    emailAddress: String,
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  paidAt: Date,
  isDelivered: {
    type: Boolean,
    default: false,
  },
  deliveredAt: Date,
}, {
  timestamps: true,
});

export default mongoose.model<IOrder>("Order", orderSchema);
