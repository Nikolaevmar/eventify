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

const validateEvent = (req, res, next) => {
  const { error } = eventSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

app.get("/", (req, res) => {
  res.render("home");
});

app.get(
  "/events",
  catchAsync(async (req, res) => {
    const events = await Event.find({});
    res.render("events/index", { events });
  })
);

app.get("/events/new", (req, res) => {
  res.render("events/new");
});

app.post(
  "/events",
  validateEvent,
  catchAsync(async (req, res) => {
    // if(!req.body.even) throw new ExpressError("Invalid data", 400);
    const event = new Event(req.body.event);
    await event.save();
    res.redirect(`/events/${event._id}`);
  })
);

app.get(
  "/events/:id",
  catchAsync(async (req, res) => {
    const event = await Event.findById(req.params.id);
    res.render("events/show", { event });
  })
);

app.get(
  "/events/:id/edit",
  catchAsync(async (req, res) => {
    const event = await Event.findById(req.params.id);
    res.render("events/edit", { event });
  })
);

app.put(
  "/events/:id",
  validateReview,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const event = await Event.findByIdAndUpdate(id, { ...req.body.event });
    res.redirect(`/events/${event._id}`);
  })
);

app.delete(
  "/events/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await Event.findByIdAndDelete(id);
    res.redirect("/events");
  })
);

app.post(
  "/events/:id/reviews",
  validateEvent,
  catchAsync(async (req, res) => {
    const event = await Event.findById(req.params.id);
    const review = new Review(req.body.review);
    event.reviews.push(review);
    await review.save();
    await event.save();
    res.redirect(`/events/${event._id}`);
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
