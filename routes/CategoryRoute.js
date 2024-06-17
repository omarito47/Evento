import express from "express";
import multer from "../middlewares/multer-config.js";

import {
  getCategoryValidator,
  createCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} from "../utils/categoryValidator.js";

import {
  getAllCategory,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryControllers.js";

const router = express.Router();

router
  .route("/")
  .get(getAllCategory)
  .post(multer, createCategoryValidator, createCategory);

router
  .route("/:id")
  .get(getCategoryValidator, getCategory)
  .put(multer, updateCategoryValidator, updateCategory)
  .delete(deleteCategoryValidator, deleteCategory);

export default router;
