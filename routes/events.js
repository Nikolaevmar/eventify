const express = require("express");
const router = express.Router();
const events = require("../controllers/events");
const catchAsync = require("../utilities/catchAsync");
const { isLoggedIn, isAuthor, validateEvent } = require("../middleware");

router.get("/", catchAsync(events.index));

router.get("/new", isLoggedIn, events.renderNewForm);

router.post("/", isLoggedIn, validateEvent, catchAsync(events.createEvent));

router.get("/:id", catchAsync(events.showEvent));

router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  catchAsync(events.renderEditForm)
);

router.put(
  "/:id",
  isLoggedIn,
  isAuthor,
  validateEvent,
  catchAsync(events.updateEvent)
);

router.delete(
  "/:id",
  isLoggedIn,
  isAuthor,
  catchAsync(events.deleteEvent)
);

module.exports = router;
