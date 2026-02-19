const Product = require("../models/product.js");
const mongoose = require("mongoose");
const ExpressError = require("../utils/ExpressError.js");
const { status } = require("http-status");

module.exports.index = async (req, res) => {
  let allProducts = await Product.find();
  // console.log(req.headers.authorization);
  res.status(status.OK).json(allProducts);
};

module.exports.createProduct = async (req, res) => {
  let { title, description, image, price } = req.body;
  const newProduct = new Product({
    title: title,
    description: description,
    image: image,
    price: price,
  });
  newProduct.owner = req.user.userId;
  console.log("create", req.user)
  await newProduct.save();
  res.status(status.OK).json({ message: "Product Created Successfuly" });
};

module.exports.showProduct = async (req, res) => {
  let { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ExpressError(status.BAD_REQUEST, "Invalid Product id");
  }

  let product = await Product.findById(id)
  .populate({
          path: "reviews",
          populate: {
            path: "author",
            select: "name"
          }
        })
  .populate("owner");

  if (!product) {
    throw new ExpressError(status.NOT_FOUND, "Product Not Found");
  }
  res.status(status.OK).json(product);
};

module.exports.updateProduct = async (req, res) => {
  let { id } = req.params;
  let { title, description, image, price } = req.body;
  
  let product = await Product.findByIdAndUpdate(id, {
    title: title,
    description: description,
    image: image,
    price: price,
  });
  await product.save();
  res.status(status.OK).json({ message: "Product updated successfully" });
};

module.exports.deleteProduct = async (req, res) => {
  let { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ExpressError(status.BAD_REQUEST, "Invalid Product id");
  }
  let deleteProduct = await Product.findByIdAndDelete(id);
  if (!deleteProduct) {
    throw new ExpressError(status.NOT_FOUND, "Product not found");
  }
  res.status(status.OK).json({ message: "Product Deleted successfully" });
};