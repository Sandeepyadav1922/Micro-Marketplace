const express = require("express");
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isReviewAuthor } = require("../middleware");
const reviewController = require("../controllers/reviews.js");
const router = express.Router({ mergeParams: true });
const { validateReview } = require("../middleware.js");

// review create route
router.post(
  "/",
  isLoggedIn,
validateReview,
  wrapAsync(reviewController.createReview)
);

//review delete route
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(reviewController.deleteReview),
);

module.exports = router;