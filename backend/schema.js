const Joi = require("joi");

module.exports.productSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required(),
    price: Joi.number().required()
}).required();

module.exports.reviewSchema = Joi.object({
    rating: Joi.number().required(),
    comment: Joi.string().required(),
}).required();