import expressAsyncHandler from "express-async-handler";
import ApiError from "../utils/apiError.js";
import mongoose from "mongoose";
import Product from "../models/productModel.js";
import Cart from "../models/cartModel.js";
import User from "../models/user.js";

const calcTotalCartPrice = (cart) => {
  let totalPrice = 0;
  cart.cartItems.forEach((item) => {
    totalPrice += item.quantity * item.price;
  });
  cart.totalCartPrice = totalPrice;
  cart.totalPriceAfterDiscount = undefined;
  return totalPrice;
};
export const addProductToCart = expressAsyncHandler(async (req, res, next) => {
  const { user: userId, cartItems } = req.body;

  try {
    // Check if the user ID is valid
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid user ID",
      });
    }

    // Find the user with the provided user ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: `User with ID ${userId} not found`,
      });
    }

    // Find or create the cart for the provided user
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = await Cart.create({ user: userId, cartItems: [] });
    }

    // Loop through each cart item and verify the product ID and quantity
    for (const cartItemData of cartItems) {
      const { product: productId, quantity } = cartItemData;

      // Check if the product exists in the database
      const product = await Product.findById(productId);

      if (!product) {
        // If product not found, return error response
        return res.status(404).json({
          status: "fail",
          message: `Product with ID ${productId} not found.`,
        });
      }

      // Check if the product is already in the cart
      const existingItem = cart.cartItems.find(
        (item) => item.product.toString() === productId.toString()
      );

      // Calculate total requested quantity (existing + new)
      const totalRequestedQuantity = existingItem
        ? existingItem.quantity + quantity
        : quantity;

      // Check if requested quantity exceeds available quantity of the product
      if (totalRequestedQuantity > product.quantity) {
        // If requested quantity exceeds available quantity, return error response
        return res.status(400).json({
          status: "fail",
          message: `Requested quantity exceeds available quantity for product with ID ${productId}. Available quantity: ${product.quantity}.`,
        });
      }

      // If product and quantity are valid, add or update the cart item in the valid cart items array
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.cartItems.push({
          product: productId,
          quantity,
          price: product.price,
        });
      }
    }

    // Calculate total cart price
    calcTotalCartPrice(cart);

    // Save the cart
    await cart.save();

    res.status(200).json({
      status: "success",
      message: "Products added to cart successfully",
      data: cart,
    });
  } catch (error) {
    // Handle any unexpected errors
    console.error("Error adding products to cart:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
});

export const removeSpecificCartItem = expressAsyncHandler(
  async (req, res, next) => {
    const cart = await Cart.findOneAndUpdate(
      { user: req.user._id },
      {
        $pull: { cartItems: { _id: req.params.itemId } },
      },
      { new: true }
    );

    calcTotalCartPrice(cart);
    await cart.save();

    res.status(200).json({
      status: "success",
      numOfCartItems: cart.cartItems.length,
      data: cart,
    });
  }
);
export const getLoggedUserCart = expressAsyncHandler(async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return next(
        new ApiError(`Cart not found for user ID: ${req.user._id}`, 404)
      );
    }

    res.status(200).json({
      status: "success",
      numOfCartItems: cart.cartItems.length,
      data: cart,
    });
  } catch (error) {
    console.error("Error fetching cart for logged-in user:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
});
export const clearCart = expressAsyncHandler(async (req, res, next) => {
  await Cart.findOneAndDelete({ user: req.user._id });
  res.status(204).send();
});

// Controller function to handle updating a cart item's quantity
export const updateCartItemQuantity = expressAsyncHandler(
  async (req, res, next) => {
    try {
      const { quantity } = req.body;
      const itemId = req.params.itemId; // Assuming itemId is passed in the URL params

      // Find the cart using the user ID
      const cart = await Cart.findOne({ user: req.user._id });

      if (!cart) {
        return next(
          new ApiError(`Cart not found for user ID: ${req.user._id}`, 404)
        );
      }

      // Find the index of the cart item to update
      const itemIndex = cart.cartItems.findIndex(
        (item) => item._id.toString() === itemId
      );

      if (itemIndex === -1) {
        return next(
          new ApiError(`Cart item not found for item ID: ${itemId}`, 404)
        );
      }

      // Update the quantity of the cart item
      cart.cartItems[itemIndex].quantity = quantity;

      // Recalculate total cart price
      calcTotalCartPrice(cart);

      // Save the updated cart
      await cart.save();

      res.status(200).json({
        status: "success",
        message: "Cart item quantity updated successfully",
        data: cart,
      });
    } catch (error) {
      console.error("Error updating cart item quantity:", error);
      res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }
);
