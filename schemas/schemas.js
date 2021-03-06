const Joi = require("joi");

module.exports.eventSchema = Joi.object({
  event: Joi.object({
    title: Joi.string().required(),
    ticketPrice: Joi.number().required().min(0),
    location: Joi.string().required(),
    description: Joi.string().required(),
    date: Joi.string().required(),
  }).required(),
  deleteImages: Joi.array()
});

module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required(),
    body: Joi.string().required(),
  }).required(),
});
