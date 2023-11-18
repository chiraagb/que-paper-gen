const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB...!");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB...!");
  });

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    unique: true,
  },
  subject: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
  },
  marks: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Question", questionSchema);
