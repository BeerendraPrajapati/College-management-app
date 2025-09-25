const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId()
  },
  courseName: { type: String, required: true },
  price: { type: String, required: true },
  description: { type: String, required: true },
  startingDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  imageId: { type: String, required: true },
  imageUrl: { type: String, required: true },
  uId: { type: String, required: true }
});

module.exports = mongoose.model("courses", courseSchema);
  