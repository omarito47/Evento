import { Router } from "express";
// import auth from "../middlewares/auth.js";
import { authenticateToken } from "../controllers/user.js";
import {
  createOrder,
  getNewOrderForCurrentUser,
  updateOrder,
  cancelOrder,
  payForOrder,
  getAllOrders,
  trackOrderById,
  getOrderById,
} from "../controllers/order.js";

const router = Router();
router.use(authenticateToken);

router.post("/", createOrder);

router.get("/newOrderForCurrentUser", getNewOrderForCurrentUser);
router.get("/", getAllOrders);
router.get("/:id", getOrderById);
router.put("/:id", updateOrder);
router.put("/cancel/:id", cancelOrder);

router.post("/pay", payForOrder);

router.get("/track/:id", trackOrderById);

export default router;
