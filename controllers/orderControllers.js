import asyncHandler from "express-async-handler";
import ApiError from "../utils/apiError.js";
import mongoose from "mongoose";
import Order from "../models/orderModel.js";
import Cart from "../models/cartModel.js";
export const createOrder = async (req, res, next) => {
  try {
    const { address, user } = req.body;
    const { cartId } = req.params;

    // Check if the user ID is valid
    if (!mongoose.Types.ObjectId.isValid(user)) {
      return next(new ApiError("Invalid user ID", 400));
    }

    // Find the cart by ID
    const cart = await Cart.findById(cartId).populate("cartItems.product");
    if (!cart) {
      return next(new ApiError(`Cart not found with ID ${cartId}`, 404));
    }

    // Verify that the cart belongs to the provided user
    if (cart.user.toString() !== user) {
      return next(
        new ApiError("Unauthorized to create order for this cart", 403)
      );
    }

    // Calculate total order price based on cart items
    const totalOrderPrice = cart.totalCartPrice;

    // Create the order
    const order = await Order.create({
      user, // Use the provided user ID
      cartItems: cart.cartItems,
      address,
      totalOrderPrice,
    });

    // Optionally, clear the cart after creating the order
    // await Cart.findByIdAndDelete(cartId);

    res.status(201).json({ status: "success", data: order });
  } catch (error) {
    next(error);
  }
};

export const findSpecificOrder = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  let query = Order.findById(id);

  const document = await query;

  if (!document) {
    return next(new ApiError(`No document for this id ${id}`, 404));
  }
  res.status(200).json({ data: document });
});

export const findAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find();

  res.status(200).json({ results: orders.length, data: orders });
});

export const updateOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(
      new ApiError(`There is no such order with this id: ${req.params.id}`, 404)
    );
  }

  const updatedOrder = await order.save();

  res.status(200).json({ status: "success", data: updatedOrder });
});

export const cancelOrder = async (req, res, next) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);
    if (!order) {
      return res
        .status(404)
        .json({ status: "fail", message: "Order not found" });
    }
    order.isCanceled = true;
    await order.save();
    res
      .status(200)
      .json({ status: "success", message: "Order canceled successfully" });
  } catch (err) {
    next(err);
  }
};
