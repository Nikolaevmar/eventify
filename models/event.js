const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  title: String,
  ticketPrice: String,
  description: String,
  location: String,
});

module.exports = mongoose.model("Event", EventSchema);
