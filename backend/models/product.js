const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("../models/review.js");

const productSchema =new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
});

productSchema.post("findOneAndDelete", async(product) => {
    if(product) {
        await Review.deleteMany({_id: {$in: product.reviews}});
    }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
