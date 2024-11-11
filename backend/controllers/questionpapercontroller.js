const QuestionPaper = require("../models/question_paper");
const { validationResult } = require("express-validator");
const filterDocuments = require("../utils/filter");

// ========================= Get Question Paper ========================= //
const getQuestionPaper = async (req, res, next) => {
  try {
    const questions = await QuestionPaper.find().populate("uploadedBy"); // Fetch all questions
    // console.log("questions")
    res.json({
      data: questions.map((question) => question.toObject({ getters: true })),
    }); // Respond with the fetched data
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" }); // Send error response
  }
};

// ========================= Add Question Paper ========================= //

const insertQuestionPaper = async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { Q_paper, year, subject, uploadDate, uploadedBy, fileType } =
      req.body;

    // Get the file URL
    const fileUrl = req.file ? `/uploads/${req.file.filename}` : null;
    console.log(fileUrl);
    console.log(req.body.file);
    // Create a new question paper document
    const newQuestionPaper = new QuestionPaper({
      Q_paper,
      year,
      subject,
      uploadDate: uploadDate || new Date(),
      uploadedBy,
      fileType: fileType || "pdf",
      fileUrl,
    });

    // Save the document to the database
    const result = await newQuestionPaper.save();

    res.status(201).json({
      message: "Question paper inserted successfully",
      data: result,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Internal server error: ${error.message}` });
  }
};

// ========================= Delete Question Paper ========================= //

const deleteQuestionPaper = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the document by ID
    const result = await QuestionPaper.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "Question paper not found" });
    }

    res.status(200).json({
      message: "Question paper deleted successfully",
      data: result,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Internal server error: ${error.message}` });
  }
};

// ========================= Filter Question Paper ========================= //

const filterQuestionsPapers = async (req, res, next) => {
  try {
    const filterCriteria = req.body;
    const sortCriteria = { marks: 1 };

    const result = await filterDocuments(
      QuestionPaper,
      filterCriteria,
      sortCriteria
    );

    res.json({ data: result });
  } catch (e) {
    res.status(500).json({ message: `Internal server error ${e}` });
  }
};

// ========================= Get Distinct Standards ========================= //
const getYears = async (req, res) => {
  try {
    // Fetch distinct standards from the Question collection
    const standards = await QuestionPaper.distinct("year");

    // Respond with the list of distinct standards
    res.json({ data: standards });
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).json({ message: "Internal server error" });
  }
};

// ========================= Get Distinct Subjects ========================= //
const getSubjects = async (req, res) => {
  try {
    // Fetch distinct standards from the Question collection
    const standards = await QuestionPaper.distinct("subject");

    // Respond with the list of distinct standards
    res.json({ data: standards });
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.insertQuestionPaper = insertQuestionPaper;
exports.deleteQuestionPaper = deleteQuestionPaper;
exports.filterQuestionsPapers = filterQuestionsPapers;
exports.getQuestionPaper = getQuestionPaper;
exports.getYears = getYears;
exports.getSubjects = getSubjects;
