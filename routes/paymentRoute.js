import express from "express";
import { processPayment } from "../controllers/order.js";

const router = express.Router();

router.route("/").post(processPayment);

export default router;
