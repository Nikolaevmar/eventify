const mongoose = require("mongoose");
const Review = require("./review");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  title: String,
  description: String,
  images: [{ url: String, filename: String }],
  ticketPrice: Number,
  date: String,
  location: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

//Middleware to delete leftover reviews of deleted events.
EventSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Review.deleteMany({
      _id: {
        $in: doc.reviews,
      },
    });
  }
});

module.exports = mongoose.model("Event", EventSchema);
