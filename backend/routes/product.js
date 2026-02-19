const express = require("express");
const wrapAsync = require("../utils/wrapAsync.js");
const router = express.Router();

const productController = require("../controllers/products.js");
const { validateProduct, isLoggedIn, isOwner } = require("../middleware.js");

router.get("/", wrapAsync(productController.index));
router.post(
  "/",
  isLoggedIn,
  validateProduct,
  wrapAsync(productController.createProduct),
);
router.get("/:id", wrapAsync(productController.showProduct));
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  validateProduct,
  wrapAsync(productController.updateProduct),
);
router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(productController.deleteProduct),
);

module.exports = router;
