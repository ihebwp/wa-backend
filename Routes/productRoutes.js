import express from "express";
import * as productController from "../Controllers/productController.js";
import multer from "multer";

// multer configuration

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads");
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + "-" + file.originalname;
    cb(null, fileName);
  },

});

const upload = multer({ storage: storage });
const router = express.Router();

// Create a product
router.post("/product", upload.single('imgUrl'),productController.createProduct);

// Get all products
router.get("/products", productController.getProducts);

// Get a single product by ID
router.get("/product/:id", productController.getProductById);

// Update a product by ID
router.put("/product/:id",upload.single('imgUrl'), productController.updateProduct);

// Delete a product by ID
router.delete("/product/:id", productController.deleteProduct);

export default router;
