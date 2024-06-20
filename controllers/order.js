import asyncHandler from "express-async-handler";
import { OrderStatus } from "../utils/orderStatus.js";
import { OrderModel } from "../models/order.js";
import ProductModel from "../models/productModel.js";
import { updateProduct } from "./productControllers.js";

const updateProductQuantity = async (items) => {
  const updateAllItems = async () => {
    for (let i = 0; i < items.length; i++) {
      console.log("before db", i);
      const item = items[i];
      let product = await ProductModel.findById(item.product);
      console.log("item here", item);
      await ProductModel.updateOne(
        { _id: item.product },
        {
          quantity: product.quantity - item.quantity,
        }
      );
      // await updateProduct({
      //   body: { quantity: product.quantity - item.quantity },
      //   params: { id: item.product },
      // });
    }
  };
  await updateAllItems();
};

const calcTotalCartPrice = async (items) => {
  const calculate = async () => {
    let totalP = 0;
    for (let i = 0; i < items.length; i++) {
      console.log("before db", i);
      const item = items[i];
      let product = await ProductModel.findById(item.product);
      console.log("item here", item);
      if (product.quantity < item.quantity) {
        throw new Error("Qunatity is not available");
      }
      totalP += item.quantity * product.price;
      console.log("prix", totalP);
    }
    return totalP;
  };
  return await calculate();
};

export const createOrder = asyncHandler(async (req, res) => {
  const requestOrder = req.body;
  try {
    const totalPrice = await calcTotalCartPrice(requestOrder.items);

    const newOrder = new OrderModel({
      ...requestOrder,
      totalPrice,
      user: req.user.userId,
    });
    await newOrder.save();

    await updateProductQuantity(requestOrder.items);

    res.status(201).json(newOrder);
  } catch (error) {
    if (
      error.name === "ValidationError" ||
      error.message == "Qunatity is not available"
    ) {
      console.error("Validation Error:", error.message); // Log Mongoose validation error
      return res.status(400).json({ error: error.message });
    }

    console.error("Database Error:", error); // Log other database-related errors
    res.status(500).json({ error: "Database Error" });
  }
});

// Update an order by ID
export const updateOrder = async (req, res) => {
  const orderId = req.params.id;
  const updateFields = req.body;

  try {
    // Find the order by ID and update it
    const updatedOrder = await OrderModel.findByIdAndUpdate(
      orderId,
      updateFields,
      {
        new: true, // Return the updated document
        runValidators: true, // Run Mongoose validators
      }
    );

    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

// Cancel an order
export const cancelOrder = asyncHandler(async (req, res) => {
  const orderId = req.params.id;

  // Find the order by ID and update its status and isCanceled field
  const order = await OrderModel.findByIdAndUpdate(
    orderId,
    { isCanceled: true },
    { new: true }
  );

  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }

  res.json(order);
});

// Get all orders (accessible to all users)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find().populate("user").exec();

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

// Get new order for current user
export const getNewOrderForCurrentUser = async (req, res) => {
  try {
    const order = await OrderModel.findOne({
      user: req.user.userId, // Ensure you are using req.user.userId
      status: OrderStatus.NEW,
    });

    if (order) {
      res.status(200).json(order);
    } else {
      res
        .status(404)
        .json({ message: "No new order found for the current user" });
    }
  } catch (error) {
    console.error("Error fetching new order:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

// Pay for an order
export const payForOrder = asyncHandler(async (req, res) => {
  const { paymentId } = req.body;
  const order = await OrderModel.findOne({
    user: req.user.id,
    status: OrderStatus.NEW,
  });

  if (!order) {
    res.status(400).send("Order Not Found!");
    return;
  }

  order.paymentId = paymentId;
  order.status = OrderStatus.PAYED;
  await order.save();

  res.send(order._id);
});

// Track an order by ID
export const trackOrderById = asyncHandler(async (req, res) => {
  const order = await OrderModel.findById(req.params.id);
  res.send(order);
});
