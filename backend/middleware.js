require("dotenv").config();
const { productSchema, reviewSchema } = require("./schema");
const ExpressError = require("./utils/ExpressError");
const Product = require("./models/product.js");
const Review = require("./models/review.js");
const { status } = require("http-status");
const jwt = require("jsonwebtoken");

module.exports.validateProduct = (req, res, next) => {
    let { error } = productSchema.validate(req.body);
    // console.log(error.details[0].message);
    if(error) {
        let errMsg = error.details.map((el) => el.message).join("").replace(/"/g, "");
        throw new ExpressError(status.BAD_REQUEST, errMsg);
    } else {
        next();
    }
};

module.exports.validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    // console.log(error.details[0].message);
    if(error) {
        let errMsg = error.details.map((el) => el.message).join("").replace(/"/g, "");
        throw new ExpressError(status.BAD_REQUEST, errMsg);
    } else {
        next();
    }
};

module.exports.isLoggedIn = (req, res, next) => {
    let token = req.headers.authorization;
    if(!token) {
        throw new ExpressError(status.NOT_FOUND, "You are not logged in")
    }
    let decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        
        req.user = decoded;
        next();
};

module.exports.isOwner = async (req, res, next) => {
    let {id} = req.params;
    let product = await Product.findById(id);
    if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
    if (!product.owner.equals(req.user.userId)) {
    return res.status(403).json({ message: "You are not owner of this product" });
  }
  req.product = product;
    next();
}

module.exports.isReviewAuthor = async(req, res, next) => {
    let {reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if(!review) {
        return res.status(404).json({message: "Review not found"});
    }
    if(!review.author.equals(req.user.userId)) {
        return res.status(403).json({message: "you are not author of this review"});
    }
    next();
}