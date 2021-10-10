const express = require("express");
const router = express.Router();
const events = require("../controllers/events");
const catchAsync = require("../utilities/catchAsync");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const { isLoggedIn, isAuthor, validateEvent } = require("../middleware");

router
  .route("/")
  .get(catchAsync(events.index))
  .post(upload.single("image"), (req, res) => {
    res.send(req.body);
  });
// .post(isLoggedIn, validateEvent, catchAsync(events.createEvent));

router.get("/new", isLoggedIn, events.renderNewForm);

router
  .route("/:id")
  .get(catchAsync(events.showEvent))
  .put(isLoggedIn, isAuthor, validateEvent, catchAsync(events.updateEvent))
  .delete(isLoggedIn, isAuthor, catchAsync(events.deleteEvent));

router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  catchAsync(events.renderEditForm)
);

module.exports = router;
