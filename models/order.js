import mongoose from "mongoose";
import { OrderStatus } from "../utils/orderStatus.js";

const { Schema, model } = mongoose;

const LatLngSchema = new Schema({
  lat: { type: String, required: true },
  lng: { type: String, required: true },
});

// Define a separate schema for address to reuse and ensure required fields
const AddressSchema = new Schema({
  details: { type: String, required: true },
  phone: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
});

// Define schema for order items
const OrderItemSchema = new Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  // price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

// Define main order schema
const OrderSchema = new Schema(
  {
    name: { type: String, required: true },
    address: { type: AddressSchema, required: true }, // Embed AddressSchema for address field
    // addressLatLng: { type: LatLngSchema, required: true },
    paymentId: { type: String },
    isCanceled: {
      type: Boolean,
      default: false,
    },
    totalPrice: { type: Number, required: true },
    items: { type: [OrderItemSchema], required: true }, // Array of OrderItemSchema
    status: { type: String, default: OrderStatus.NEW },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User model
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

// Create and export the OrderModel based on OrderSchema
export const OrderModel = model("Order", OrderSchema);
