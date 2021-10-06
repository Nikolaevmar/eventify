const express = require("express");
const router = express.Router({ mergeParams: true });

const ExpressError = require("../utilities/ExpressError");
const catchAsync = require("../utilities/catchAsync");

const { reviewSchema } = require("../validationSchemas/schemas.js");

const Event = require("../models/event");
const Review = require("../models/review");

const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

router.post(
  "/",
  validateReview,
  catchAsync(async (req, res) => {
    const event = await Event.findById(req.params.id);
    const review = new Review(req.body.review);
    event.reviews.push(review);
    await review.save();
    await event.save();
    req.flash("success", "Created a new review!");
    res.redirect(`/events/${event._id}`);
  })
);

router.delete(
  "/:reviewId",
  catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Event.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Successfully deleted review!");
    res.redirect(`/events/${id}`);
  })
);

module.exports = router;
