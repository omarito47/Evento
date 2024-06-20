import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Order must belong to a user"],
    },
    cartItem: {
      type: mongoose.Schema.ObjectId,
      ref: "Cart",
      required: [true, "Order must have cart item"],
    },
    address: {
      details: String,
      phone: String,
      city: String,
      postalCode: String,
    },
    totalOrderPrice: {
      type: Number,
    },
    isCanceled: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
