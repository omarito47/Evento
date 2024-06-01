import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import { notFound, errorHandler } from "./middlewares/errorHandler.js";
import dbConnection from "./config/database.js";
import ApiError from "./utils/apiError.js";
import routeCategory from "./routes/CategoryRoute.js";
import routeProduct from "./routes/productRoute.js";
import routeOrder from "./routes/orderRoute.js";
import userRoutes from "./routes/user.js";
import cartRoutes from "./routes/cartRoute.js";

const app = express();
const PORT = process.env.PORT || 8000;

// Load environment variables
dotenv.config({ path: "config.env" });

// Connect to the database
dbConnection();

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(morgan("dev")); // Logger middleware
app.use(cors()); // CORS middleware

// Routes
app.use("/categories", routeCategory);
app.use("/products", routeProduct);
app.use("/orders", routeOrder);
app.use("/user", userRoutes);
app.use("/cart", cartRoutes);

// Error handling middleware
app.all("*", (req, res, next) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});
app.use(notFound); // Handle 404 errors
app.use(errorHandler); // General error handler

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
