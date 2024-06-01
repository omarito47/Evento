import slugify from "slugify";
import { check, body } from "express-validator";

export const getCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid category id format"),
];

export const createCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("Category required")
    .isLength({ min: 3 })
    .withMessage("Too short category name")
    .isLength({ max: 32 })
    .withMessage("Too long category name")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
];

export const updateCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid category id format"),
  body("name")
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
];

export const deleteCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid category id format"),
];
