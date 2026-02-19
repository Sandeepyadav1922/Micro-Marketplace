require("dotenv").config({path: "../.env"});
const mongoose = require("mongoose");
const initData = require("./data.js");
const Product = require("../models/product.js");

async function main() {
    await mongoose.connect(process.env.MONGO_URL);
}

main()
.then(() => {
    console.log("Connected to mongoDB");
})
.catch((err) => {
    console.log(err);
});

const addProducts = async() => {
    await Product.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner: "699709c98d7a8a57a2decc55"}));
    await Product.insertMany(initData.data);
    console.log("data was initialized");
};

addProducts();