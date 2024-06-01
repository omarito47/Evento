import asyncHandler from "express-async-handler";
import ProductModel from "../models/productModel.js";
import ApiError from "../utils/apiError.js";
import ApiFeatures from "../utils/apiFeatures.js";

export const deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const document = await ProductModel.findByIdAndDelete(id);

  if (!document) {
    return next(new ApiError(`No document for this id ${id}`, 404));
  }

  res.status(200).json({ message: "Product deleted successfully" });
});

export const updateProduct = asyncHandler(async (req, res, next) => {
  console.log("Request Params:", req.params.id);
  console.log("Request Body:", req.body);

  const document = await ProductModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  if (!document) {
    return next(new ApiError(`No document for this id ${req.params.id}`, 404));
  }

  console.log("Updated Document:", document);

  document.save();
  res.status(200).json({ data: document });
});

export const createProduct = asyncHandler(async (req, res) => {
  const newDoc = await ProductModel.create(req.body);
  res.status(201).json({ data: newDoc });
});

export const getProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  let query = ProductModel.findById(id);

  const document = await query;

  if (!document) {
    return next(new ApiError(`No document for this id ${id}`, 404));
  }
  res.status(200).json({ data: document });
});

// productController.js
export const getAllProduct = asyncHandler(async (req, res) => {
  // Build query
  const apiFeatures = new ApiFeatures(ProductModel.find(), req.query)
    .filter()
    .search("Products") // Le paramètre modelName indique qu'il s'agit de produits
    .limitFields()
    .sort()
    .paginate(3);

  // Exécution de la requête
  const { mongooseQuery, paginationResult } = apiFeatures;
  const products = await mongooseQuery;

  res
    .status(200)
    .json({ results: products.length, paginationResult, data: products });
});
