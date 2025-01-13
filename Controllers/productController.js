import Product from "../Models/productModel.js";

export const createProduct = async (req, res) => {
  try {
    const {
      productName,
      price,
      category,
      discount,
      description,
      reviews,
      newProduct,
      imgLink
    } = req.body;
    const imgUrl = req.file.filename;
    const product = await Product.create({
      productName,
      price,
      imgUrl,
      imgLink,
      category,
      description,
      reviews,
      discount,
      newProduct,
    });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { productName, price, category, description, discount, newProduct,imgLink } = req.body;
    const imgUrl = req.file.filename; // assuming you also allow updating the image

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        productName,
        price,
        imgLink,
        category,
        description,
        discount,
        newProduct,
        imgUrl,
      },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
