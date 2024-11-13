const Product = require("../../models/Product");

const searchProducts = async (req, res) => {
  try {
    const { keyword } = req.params;
    const { page = 1, limit = 10 } = req.query;

    if (!keyword || typeof keyword !== "string") {
      return res.status(400).json({
        success: false,
        message: "Keyword is required and must be a string.",
      });
    }

    const regEx = new RegExp(keyword, "i");
    const createSearchQuery = {
      $or: [
        { title: regEx },
        { description: regEx },
        { category: regEx },
        { brand: regEx },
      ],
    };

    const searchResults = await Product.find(createSearchQuery)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Product.countDocuments(createSearchQuery);

    // Fetch suggestions for similar matches
    const suggestions = await Product.find({ title: regEx }).limit(5);

    res.status(200).json({
      success: true,
      data: searchResults,
      suggestions,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error occurred.",
    });
  }
};

module.exports = { searchProducts };
