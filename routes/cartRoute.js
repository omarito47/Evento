import express from "express";

import {
  addProductToCart,
  getLoggedUserCart,
  removeSpecificCartItem,
  clearCart,
  updateCartItemQuantity,
} from "../controllers/cartController.js";

const router = express.Router();

router.route("/").post(addProductToCart).delete(clearCart);
router.route("/:userId").get(getLoggedUserCart);

router
  .route("/:itemId")
  .put(updateCartItemQuantity)
  .delete(removeSpecificCartItem);

export default router;