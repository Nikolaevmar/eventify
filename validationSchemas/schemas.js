const Joi = require("Joi");

module.exports.eventSchema = Joi.object({
  event: Joi.object({
    title: Joi.string().required(),
    ticketPrice: Joi.number().required().min(0),
    location: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required(),
    date: Joi.string().required(),
  }).required(),
});

