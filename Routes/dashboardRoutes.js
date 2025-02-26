// Routes/dashboardRoutes.js
import express from "express";
import {
  getMostExpensiveProduct,
  getUserStats,
  getProductStats,
  getProductCountByCategory,
  getUserGrowthOverTime,
  getProductPriceDistribution,
  getTopCategoriesByCount,
  getDiscountedVsNonDiscounted,
  getTotalCommands, 
  getCommandCountByCategory
} from "../Controllers/dashboardController.js";

const router = express.Router();

// Route for getting the most expensive product
router.get("/api/dashboard/most-expensive-product", getMostExpensiveProduct);

// Route for getting user stats (total number of users)
router.get("/api/dashboard/user-stats", getUserStats);

// Route for getting product stats (total number of products)
router.get("/api/dashboard/product-stats", getProductStats);

// Route for getting products by category
router.get("/api/dashboard/product-count-by-category", getProductCountByCategory);

router.get("/api/dashboard/user-growth", getUserGrowthOverTime);
router.get("/api/dashboard/product-price-distribution", getProductPriceDistribution);
router.get("/api/dashboard/top-categories", getTopCategoriesByCount);
router.get("/api/dashboard/discounted-vs-non-discounted", getDiscountedVsNonDiscounted);
router.get('/api/dashboard/commands/total', getTotalCommands);
router.get("/api/dashboard/commands-by-category", getCommandCountByCategory);

export default router;
