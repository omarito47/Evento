import { validationResult } from "express-validator";

// @desc  Finds the validation errors in this request and wraps them in an object with handy functions
const notFound = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Error Handler Middleware
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    status: "fail",
    message: err?.message || "Internal Server Error",
    stack: err?.stack,
  });
};

export { errorHandler, notFound };
