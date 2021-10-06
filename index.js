const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const { eventSchema, reviewSchema } = require("./validationSchemas/schemas.js");
const ExpressError = require("./utilities/ExpressError");
const catchAsync = require("./utilities/catchAsync");
const methodOverride = require("method-override");
const Event = require("./models/event");
const Review = require("./models/review");

const events = require("./routes/events");
// const { events } = require("./models/event");

mongoose.connect("mongodb://localhost:27017/eventify", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database is connected");
});

const app = express();

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

app.use("/events", events);

app.get("/", (req, res) => {
  res.render("home");
});

app.post(
  "/events/:id/reviews",
  validateReview,
  catchAsync(async (req, res) => {
    const event = await Event.findById(req.params.id);
    const review = new Review(req.body.review);
    event.reviews.push(review);
    await review.save();
    await event.save();
    res.redirect(`/events/${event._id}`);
  })
);

app.delete(
  "/events/:id/reviews/:reviewId",
  catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Event.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/events/${id}`);
  })
);

app.all("*", (req, res, next) => {
  next(new ExpressError("Page not found!", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Something went wrong";
  res.status(statusCode).render("error", { err });
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
