const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const engine = require("ejs-mate");
const methodOverride = require("method-override");
const Event = require("./models/event");

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

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/events", async (req, res) => {
  const events = await Event.find({});
  res.render("events/index", { events });
});

app.get("/events/new", (req, res) => {
  res.render("events/new");
});

app.post("/events", async (req, res) => {
  const event = new Event(req.body.event);
  await event.save();
  res.redirect(`/events/${event._id}`);
});

app.get("/events/:id", async (req, res) => {
  const event = await Event.findById(req.params.id);
  res.render("events/show", { event });
});

app.get("/events/:id/edit", async (req, res) => {
  const event = await Event.findById(req.params.id);
  res.render("events/edit", { event });
});

app.put("/events/:id", async (req, res) => {
  const { id } = req.params;
  const event = await Event.findByIdAndUpdate(id, { ...req.body.event });
  res.redirect(`/events/${event._id}`);
});

app.delete("/events/:id", async (req, res) => {
  const { id } = req.params;
  await Event.findByIdAndDelete(id);
  res.redirect("/events");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
