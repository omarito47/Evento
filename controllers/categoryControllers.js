import mongoose from "mongoose";

import asyncHandler from "express-async-handler";
import CategoryModel from "../models/categoryModel.js";
import ApiError from "../utils/apiError.js";
import ProductModel from "../models/productModel.js";
import { getDefaultCategoryId } from "../utils/defaultCategory.js";
import ApiFeatures from "../utils/apiFeatures.js";

export const deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  try {
    const defaultCategoryId = await getDefaultCategoryId();

    if (id === defaultCategoryId.toString()) {
      return next(new ApiError("Cannot delete default category", 400));
    }

    const updateResult = await ProductModel.updateMany(
      { category: new mongoose.Types.ObjectId(id) },
      { $set: { category: new mongoose.Types.ObjectId(defaultCategoryId) } }
    );

    console.log(
      `Updated ${updateResult.nModified} products to default category`
    );

    const deletedCategoryId = await CategoryModel.findByIdAndDelete(id);

    if (!deletedCategoryId) {
      return next(new ApiError(`No category found with id ${id}`, 404));
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error while deleting category:", error);
    return next(new ApiError("Error while deleting category", 500));
  }
});

export const updateCategory = asyncHandler(async (req, res, next) => {
  console.log("Request Params:", req.params.id);
  console.log("Request Body:", req.body);

  const document = await CategoryModel.findByIdAndUpdate(
    req.params.id,
    {
      ...req.body,
      image: req.file
        ? `${req.protocol}://${req.get("host")}/img/${req.file.filename}`
        : undefined,
    },
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

export const createCategory = asyncHandler(async (req, res) => {
  const newDoc = await CategoryModel.create({
    ...req.body,
    image: req.file
      ? `${req.protocol}://${req.get("host")}/img/${req.file.filename}`
      : undefined,
  });
  console.log("req", req.file);
  res.status(201).json({ data: newDoc });
});

export const getCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  let query = CategoryModel.findById(id);

  const document = await query;

  if (!document) {
    return next(new ApiError(`No document for this id ${id}`, 404));
  }
  res.status(200).json({ data: document });
});

export const getAllCategory = asyncHandler(async (req, res) => {
  // Extract the keyword from the query parameter
  const keyword = req.query.keyword;

  // Build query
  const apiFeatures = new ApiFeatures(CategoryModel.find(), req.query)
    .filter()
    .search(keyword) // Pass the keyword here
    .limitFields()
    .sort()
    .paginate(3);

  // Execute query
  const { mongooseQuery, paginationResult } = apiFeatures;
  const categories = await mongooseQuery;

  res
    .status(200)
    .json({ results: categories.length, paginationResult, data: categories });
});
