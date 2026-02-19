const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware.js");
const wrapAsync = require("../utils/wrapAsync.js");

const userController = require("../controllers/users.js");

router.post("/auth/register", wrapAsync(userController.register));
router.post("/auth/login", wrapAsync(userController.login));
router.get("/authenticate", isLoggedIn, wrapAsync(userController.authenticate));

module.exports = router;
