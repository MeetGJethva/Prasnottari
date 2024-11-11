// models/questions.js

const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the question schema
const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    uploadedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    standard: {
      type: Number,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    marks: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

// Create the Question model
const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
