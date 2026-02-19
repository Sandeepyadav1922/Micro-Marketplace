require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const ExpressError = require("./utils/ExpressError.js");
const productRouter = require("./routes/product.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

async function main() {
    await mongoose.connect(process.env.MONGO_URL);
}

main()
.then(() => {
    console.log("Connected to mongoDB");
})
.catch((err) => {
    console.log(err);
})

app.use("/products", productRouter);
app.use("/products/:id/review", reviewRouter);
app.use("/", userRouter);

app.use("/", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});

app.use((err, req, res, next) => {
    let {statusCode = 500, message = "Something went wrong"} = err;
    res.status(statusCode).json({ message: message });
});

app.listen("8080", (req, res) => {
    console.log("Server running on Port 8080");
})