import mongoose from "mongoose";
import { OrderStatus } from "../constants/order_status";
import ProductModel from "./productModel";
const { Schema, model } = mongoose;

const AdressSchema = new Schema({
  details: { type: String, required: true },
  phone: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
});

const OrderItemSchema = new Schema({
  product: { type: mongoose.Schema.ObjectId, ref: "Product", required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const orderSchema = new Schema(
  {
    name: { type: String, required: true },
    // address: { type: String, required: true },
    address: { type: AdressSchema, required: true },
    paymentId: { type: String },
    totalPrice: { type: Number, required: true },
    items: { type: [OrderItemSchema], required: true },
    status: { type: String, default: OrderStatus.NEW },
    user: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

export const OrderModel = model("order", orderSchema);
