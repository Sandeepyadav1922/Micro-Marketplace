const mongoose = require("mongoose");
const Product = require("../models/product.js");
const ExpressError = require("../utils/ExpressError");
const Review = require("../models/review.js");
const { status } = require("http-status");

module.exports.createReview = async (req, res) => {
    let productId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      throw new ExpressError(400, "Invalid school id");
    }
    let { rating, comment } = req.body;
    let product = await Product.findById(productId);
    if (!product) {
      throw new ExpressError(status.NOT_FOUND, "Product not found");
    }
    let newReview = new Review({
      rating: rating,
      comment: comment,
    });
    newReview.author = req.user.userId;
    product.reviews.push(newReview);
    await newReview.save();
    await newReview.populate("author")
    await product.save();
    res.status(status.OK).json({message: "Review Created", review: newReview});
  }

  module.exports.deleteReview = async (req, res) => {
      let { id, reviewId } = req.params;
      await Product.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
      let review = await Review.findByIdAndDelete(reviewId);
      if (!review) {
        throw new ExpressError(status.NOT_FOUND, "review not found");
      }
      res.status(status.OK).json({ message: "review Deleted successfully" });
    }