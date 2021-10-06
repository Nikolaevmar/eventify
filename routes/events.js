const express = require("express");
const router = express.Router();
const catchAsync = require("../utilities/catchAsync");
const ExpressError = require("../utilities/ExpressError");
const Event = require("../models/event");
const { eventSchema } = require("../validationSchemas/schemas.js");
const { isLoggedIn } = require("../middleware");

const validateEvent = (req, res, next) => {
  const { error } = eventSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

router.get(
  "/",
  catchAsync(async (req, res) => {
    const events = await Event.find({});
    res.render("events/index", { events });
  })
);

router.get("/new", isLoggedIn, (req, res) => {
  res.render("events/new");
});

router.post(
  "/",
  isLoggedIn,
  validateEvent,
  catchAsync(async (req, res) => {
    const event = new Event(req.body.event);
    await event.save();
    req.flash("success", "Successfully made a new event!");
    res.redirect(`/events/${event._id}`);
  })
);

router.get(
  "/:id",
  catchAsync(async (req, res) => {
    const event = await Event.findById(req.params.id).populate("reviews");
    if (!event) {
      req.flash("error", "Event not found!");
      return res.redirect("/events");
    }
    res.render("events/show", { event });
  })
);

router.get(
  "/:id/edit",
  isLoggedIn,
  catchAsync(async (req, res) => {
    const event = await Event.findById(req.params.id);
    if (!event) {
      req.flash("error", "Event not found!");
      return res.redirect("/events");
    }
    res.render("events/edit", { event });
  })
);

router.put(
  "/:id",
  isLoggedIn,
  validateEvent,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const event = await Event.findByIdAndUpdate(id, { ...req.body.event });
    req.flash("success", "Successfully updated event!");
    res.redirect(`/events/${event._id}`);
  })
);

router.delete(
  "/:id",
  isLoggedIn,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await Event.findByIdAndDelete(id);
    req.flash("success", "Successfully deleted event!");
    res.redirect("/events");
  })
);




module.exports = router;
