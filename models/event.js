const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  title: String,
  description: String,
  image: String,
  ticketPrice: Number,
  date: String,
  location: String,
});

module.exports = mongoose.model("Event", EventSchema);
