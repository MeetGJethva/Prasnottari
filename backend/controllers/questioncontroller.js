const Question = require("../models/questions");
const { validationResult } = require("express-validator");
const filterDocuments = require("../utils/filter");

// ========================= Get Question Paper ========================= //
const getQuestion = async (req, res, next) => {
  try {
    const questions = await Question.find().populate("uploadedBy"); // Fetch all questions
    res.json({
      data: questions.map((question) => question.toObject({ getters: true })),
    }); // Respond with the fetched data
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" }); // Send error response
  }
};

// ========================= Add Question ========================= //

const addQuestion = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { question, answer, uploadedBy, standard, subject, marks } = req.body;

  //   check if the question already exists
  let existquestion;
  try {
    existquestion = await Question.findOne({ question: question });
  } catch (e) {
    res.json({ error: "e" });
  }

  if (existquestion) {
    return res.status(409).json({ message: "Question already exists" });
  }
  console.log("uploaded by: "+ uploadedBy);
  //   add new question
  const newQuestion = new Question({
    question: question,
    answer: answer,
    uploadedBy: uploadedBy,
    standard: standard,
    subject: subject,
    marks: marks,
  });

  try {
    await newQuestion.save();
  } catch (e) {
    console.error(e); // Log the error for debugging
    return res.status(500).json({ error: "Error saving question" });
  }

  res.status(200).json({ Question: newQuestion.toObject({ getters: true }) });
};

// ========================= Delete Question ========================= //

const deleteQuestion = async (req, res) => {
  const { id } = req.params;

  try {
    // Find and delete the question by ID
    const deletedQuestion = await Question.findByIdAndDelete(id);

    // Check if the question was found and deleted
    if (!deletedQuestion) {
      return res.status(404).json({ message: "Question not found" });
    }

    // Successfully deleted
    res.status(200).json({ message: "Question deleted successfully" });
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).json({ message: "Internal server error" });
  }
};

// ========================= Filter Question ========================= //

const filterQuestions = async (req, res, next) => {
  try {
    const filterCriteria = req.body;
    const sortCriteria = { marks: 1 };

    const result = await filterDocuments(
      Question,
      filterCriteria,
      sortCriteria
    );

    res.json({ data: result });
  } catch (e) {
    res.status(500).json({ message: `Internal server error ${e}` });
  }
};

// ========================= Get Distinct Standards ========================= //
const getStandards = async (req, res) => {
  try {
    // Fetch distinct standards from the Question collection
    const standards = await Question.distinct("standard");

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
    const standards = await Question.distinct("subject");

    // Respond with the list of distinct standards
    res.json({ data: standards });
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).json({ message: "Internal server error" });
  }
};

// ========================= get questions randomly =========================
const getRandomQuestions = async (req, res) => {
  const { subject, standard, numberOfQuestions } = req.body;

  // Ensure that the required parameters are provided
  if (!subject || !standard || !numberOfQuestions) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  try {
    // Define filter criteria for subject and standard
    const filterCriteria = {
      subject: subject,
      standard: parseInt(standard, 10),
    };

    // Sorting criteria (can be adjusted if needed, for example by date)
    const sortCriteria = { createdAt: -1 }; // Sort by most recent

    // Get filtered questions using the filterDocuments function
    const filteredQuestions = await filterDocuments(
      Question,
      filterCriteria,
      sortCriteria
    );

    // If no questions are found, return a 404
    if (!filteredQuestions.length) {
      return res.status(404).json({ message: "No questions found." });
    }

    // If not enough questions are found, return a 404
    if (filteredQuestions.length < numberOfQuestions) {
      return res.status(404).json({ message: "sorry we dont have enough question for your requirements" });
    }

    // Randomly select questions from the filtered list
    const shuffled = filteredQuestions.sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffled.slice(0, numberOfQuestions);

    // Return the randomly selected questions in the response
    return res.status(200).json({ data: selectedQuestions });
  } catch (error) {
    console.error("Error fetching random questions:", error);
    return res.status(500).json({ message: "Server error." });
  }
};

exports.addQuestion = addQuestion;
exports.deleteQuestion = deleteQuestion;
exports.filterQuestions = filterQuestions;
exports.getQuestion = getQuestion;
exports.getStandards = getStandards;
exports.getSubjects = getSubjects;
exports.getRandomQuestions = getRandomQuestions;
