import express from "express";
const router = express.Router();

import {
  findAllOrders,
  findSpecificOrder,
  updateOrder,
  cancelOrder,
  createOrder,
} from "../controllers/orderControllers.js";

router.post("/:cartId", createOrder);
router.get("/", findAllOrders);
router.get("/:id", findSpecificOrder);
router.put("cancelorder/:id", cancelOrder); // Route for canceling an order

router.put("/:id", updateOrder);

export default router;
