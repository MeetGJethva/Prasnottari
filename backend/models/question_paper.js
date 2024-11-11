const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the question paper schema
const questionPaperSchema = new Schema({
  Q_paper: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  uploadDate: {
    type: Date,
    default: Date.now,
    required: true
  },
  uploadedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model
    required: true
  },
  fileType: {
    type: String,
    default: 'pdf'
  },
  fileUrl: {
    type: String,
    required: true
  }
}, { timestamps: true });

// Create the QuestionPaper model
const QuestionPaper = mongoose.model('QuestionPaper', questionPaperSchema);

module.exports = QuestionPaper;
