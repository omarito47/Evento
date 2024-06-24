import mongoose from "mongoose";

export default class ApiFeatures {
  constructor(mongooseQuery, queryString) {
    this.mongooseQuery = mongooseQuery;
    this.queryString = queryString;
  }

  filter() {
    let queryStringObj = { ...this.queryString };
    const excludesFields = ["page", "sort", "limit", "fields"];
    console.log("queryStringObj.category", queryStringObj.category);
    excludesFields.forEach((field) => delete queryStringObj[field]);

    // Apply filtration using [gte, gt, lte, lt]
    // let queryStr = JSON.stringify(queryStringObj);
    // queryStr = queryStr.replace(
    //   /\b(gte|gt|lte|lt|eq)\b/g,
    //   (match) => `$${match}`
    // );
    // Check if the category field is present and is an array or string for name filtering
    // if (queryStringObj.category) {
    //   const categoryNameFilter = queryStringObj.category;
    //   delete queryStringObj.category;
    //   console.log("categoryNameFilter", categoryNameFilter);
    //   this.mongooseQuery = this.mongooseQuery.populate({
    //     path: "category",
    //     match: {
    //       name: Array.isArray(categoryNameFilter)
    //         ? { $in: categoryNameFilter }
    //         : categoryNameFilter,
    //     },
    //   });
    // }
    // Apply other filtration using [gte, gt, lte, lt, eq]
    for (let key in queryStringObj) {
      if (Array.isArray(queryStringObj[key])) {
        queryStringObj[key] = { $in: queryStringObj[key] };
      } else if (
        typeof queryStringObj[key] === "object" &&
        !Array.isArray(queryStringObj[key])
      ) {
        for (let operator in queryStringObj[key]) {
          queryStringObj[key][`$${operator}`] = queryStringObj[key][operator];
          delete queryStringObj[key][operator];
        }
      } else {
        queryStringObj[key] = { $eq: queryStringObj[key] };
      }
    }

    this.mongooseQuery = this.mongooseQuery.find(queryStringObj);

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.sort(sortBy);
    } else {
      this.mongooseQuery = this.mongooseQuery.sort("-createdAt"); // Adjust to your actual createdAt field
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.select(fields);
    } else {
      this.mongooseQuery = this.mongooseQuery.select("-__v");
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
    const page = parseInt(this.queryString.page) || 1; // Current page (default: 1)
    const limit = parseInt(this.queryString.limit) || 10; // Products per page (default: 10)
    const skip = (page - 1) * limit; // Items to skip for pagination

    this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);
    return this;
  }
}
