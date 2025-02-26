// Controllers/dashboardController.js
import Product from "../Models/productModel.js";  // Correct path to your Product model
import User from "../Models/userModel.js";  // Correct path to your User model
// Controllers/dashboardController.js
import Command from "../Models/commandModel.js";  // Assuming your Command model is located here

// Method to get the total number of commands
export const getTotalCommands = async (req, res) => {
  try {
    const commandCount = await Command.countDocuments();
    res.status(200).json({ commandCount });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Method to get the most expensive product
export const getMostExpensiveProduct = async (req, res) => {
  try {
    const product = await Product.findOne().sort({ price: -1 }).limit(1);
    if (!product) {
      return res.status(404).json({ message: "No products found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Method to get user stats (e.g., total number of users)
export const getUserStats = async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    res.status(200).json({ userCount });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Method to get product stats (e.g., total number of products)
export const getProductStats = async (req, res) => {
  try {
    const productCount = await Product.countDocuments();
    res.status(200).json({ productCount });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Method to get products categorized by category
export const getProductCountByCategory = async (req, res) => {
  try {
    const categories = await Product.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]);
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
// Method to get commands categorized by category
export const getCommandCountByCategory = async (req, res) => {
  try {
    const categories = await Command.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
// Method to get user growth over time (e.g., by month)
export const getUserGrowthOverTime = async (req, res) => {
  try {
    const users = await User.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Method to get product price distribution (price ranges)
export const getProductPriceDistribution = async (req, res) => {
  try {
    const products = await Product.aggregate([
      {
        $bucket: {
          groupBy: "$price",
          boundaries: [0, 50, 100, 200, 500, 1000, 5000],
          default: "Other",
          output: {
            count: { $sum: 1 },
          },
        },
      },
    ]);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Method to get the top 5 categories by product count
export const getTopCategoriesByCount = async (req, res) => {
  try {
    const categories = await Product.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Method to get discounted vs non-discounted products
export const getDiscountedVsNonDiscounted = async (req, res) => {
  try {
    const discountedProducts = await Product.countDocuments({ discount: { $gt: 0 } });
    const nonDiscountedProducts = await Product.countDocuments({ discount: 0 });

    res.status(200).json({
      discounted: discountedProducts,
      nonDiscounted: nonDiscountedProducts,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};


