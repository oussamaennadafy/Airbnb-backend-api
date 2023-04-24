const Category = require("./../models/categoryModel");
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({
      status: "success",
      result: categories.length,
      body: {
        categories,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      reason: "something went wrong",
    });
  }
};

module.exports = {
  getAllCategories,
};
