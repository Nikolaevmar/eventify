const { eventSchema, reviewSchema } = require("./schemas/schemas.js");
const ExpressError = require("./utilities/ExpressError");
const Event = require("./models/event");
const Review = require('./models/review')

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash("error", "You must be signed in");
    return res.redirect("/login");
  }
  next();
};

module.exports.validateEvent = (req, res, next) => {
  const { error } = eventSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

module.exports.validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

module.exports.isAuthor = async (req, res, next) => {
  const { id } = req.params;
  const event = await Event.findById(id);
  if (event.author.equals(req.user._id) || req.user.isAdmin) {
   next();
  }else{
    req.flash("error", "You do not have permission to do that!");
    return res.redirect(`/events/${id}`);
  }
};

module.exports.isReviewAuthor = async (req, res, next) => {
  const { id, reviewId } = req.params;
  const review = await Review.findById(reviewId);
  if (review.author.equals(req.user._id) || req.user.isAdmin) {
    next();
  }else{
    req.flash("error", "You do not have permission to do that!");
    return res.redirect(`/events/${id}`);
  }
};
