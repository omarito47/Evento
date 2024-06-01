import express from "express";

import {
  getProductValidator,
  createProductValidator,
  updateProductValidator,
  deleteProductValidator,
} from "../utils/productValidator.js";

import {
  getAllProduct,
  getProduct,
  createProduct,
  updateProduct,
  searchProduct,
  deleteProduct,
} from "../controllers/productControllers.js";

const router = express.Router();

router
  .route("/")
  .get(getAllProduct)
  .post(createProductValidator, createProduct);
router.route("/search/:key").get(searchProduct);
router
  .route("/:id")
  .get(getProductValidator, getProduct)
  .put(updateProductValidator, updateProduct)
  .delete(deleteProductValidator, deleteProduct);

export default router;
