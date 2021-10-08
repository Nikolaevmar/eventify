const express = require("express");
const router = express.Router({ mergeParams: true });
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware");
const catchAsync = require("../utilities/catchAsync");

const Event = require("../models/event");
const Review = require("../models/review");

router.post(
  "/",
  isLoggedIn,
  validateReview,
  catchAsync(async (req, res) => {
    const event = await Event.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    event.reviews.push(review);
    await review.save();
    await event.save();
    req.flash("success", "Created a new review!");
    res.redirect(`/events/${event._id}`);
  })
);

router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Event.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Successfully deleted review!");
    res.redirect(`/events/${id}`);
  })
);

module.exports = router;
