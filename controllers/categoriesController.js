const Category = require("./../models/categoryModel");
const catchAsync = require("../utils/catchAsync");

const getAllCategories = catchAsync(async (req, res) =>
{
  const categories = await Category.find();
  res.status(200).json({
    status: "success",
    result: categories.length,
    body: {
      categories,
    },
  });
});

module.exports = {
  getAllCategories,
};
