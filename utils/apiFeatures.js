import mongoose from "mongoose";

export default class ApiFeatures {
  constructor(mongooseQuery, queryString) {
    this.mongooseQuery = mongooseQuery;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ["page", "sort", "limit", "fields", "keyword"];

    // Remove excluded fields from query
    excludedFields.forEach((field) => delete queryObj[field]);

    // Convert values to MongoDB operators where needed
    for (const key in queryObj) {
      if (queryObj[key].startsWith("$")) continue; // Skip already transformed operators
      if (Array.isArray(queryObj[key])) {
        queryObj[key] = { $in: queryObj[key] };
      } else if (
        typeof queryObj[key] === "object" &&
        !Array.isArray(queryObj[key])
      ) {
        for (const operator in queryObj[key]) {
          queryObj[key][`$${operator}`] = queryObj[key][operator];
          delete queryObj[key][operator];
        }
      } else {
        queryObj[key] = { $eq: queryObj[key] };
      }
    }

    this.mongooseQuery = this.mongooseQuery.find(queryObj);

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.sort(sortBy);
    } else {
      this.mongooseQuery = this.mongooseQuery.sort("-createdAt"); // Default sort by createdAt
    }

    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.select(fields);
    } else {
      this.mongooseQuery = this.mongooseQuery.select("-__v"); // Exclude __v by default
    }

    return this;
  }

  search(modelName) {
    if (this.queryString.keyword) {
      let query = {};
      if (modelName === "Products") {
        query.$or = [
          { title: { $regex: this.queryString.keyword, $options: "i" } },
          { description: { $regex: this.queryString.keyword, $options: "i" } },
        ];
      } else {
        query = { name: { $regex: this.queryString.keyword, $options: "i" } };
      }

      this.mongooseQuery = this.mongooseQuery.find(query);
    }

    return this;
  }

  paginate() {
    const page = parseInt(this.queryString.page, 10) || 1;
    const limit = parseInt(this.queryString.limit, 10) || 10;
    const skip = (page - 1) * limit;

    this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);

    // Count total documents without applying skip and limit
    this.queryString.limit = limit; // Store limit for later use

    return this;
  }
}
