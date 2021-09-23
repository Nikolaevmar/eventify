const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
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

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/events", async (req, res) => {
  const events = await Event.find({});
  res.render("events/index", { events });
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
