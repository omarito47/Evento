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

export const createProduct = asyncHandler(async (req, res) => {
  const newDoc = await ProductModel.create({
    ...req.body,
    image: req.file
      ? `${req.protocol}://${req.get("host")}/img/${req.file.filename}`
      : undefined,
  });
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

export const getAllProduct = asyncHandler(async (req, res) => {
  // Build query
  const apiFeatures = new ApiFeatures(ProductModel.find(), req.query)
    .filter()
    .limitFields()
    .sort()
    .paginate();

  // Execute query
  const { mongooseQuery } = apiFeatures;
  const products = await mongooseQuery;

  // Calculate total number of items for pagination
  const totalItems = await ProductModel.countDocuments();

  // Return response with pagination information
  res.status(200).json({
    results: products.length,
    paginationResult: {
      totalItems,
      numberOfPages: Math.ceil(totalItems / apiFeatures.queryString.limit),
    },
    data: products,
  });
});

export async function searchProduct(req, res) {
  try {
    let searchedProduct = await ProductModel.find({
      $or: [
        { title: { $regex: req.params.key } },
        { description: { $regex: req.params.key } },
      ],
    });
    console.log(searchedProduct);
    res.status(200).json(searchedProduct);
  } catch (error) {
    console.log(error);
  }
}
