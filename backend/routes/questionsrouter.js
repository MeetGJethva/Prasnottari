const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const User = require("../models/users");

const questioncontroller = require("../controllers/questioncontroller");

//get questions

router.get("/", questioncontroller.getQuestion);

// add questions
router.post(
  "/add",
  [
    body("question").isString().withMessage("Question must be a string"),
    body("answer").isString().withMessage("Answer must be a string"),
    body("uploadedBy")
      .isMongoId()
      .withMessage("UploadedBy must be a valid MongoDB ObjectId")
      .custom(async (value) => {
        const userExists = await User.findById(value);
        if (!userExists) {
          throw new Error("User does not exist");
        }
        return true;
      }),
    body("standard")
      .isInt({ min: 1 })
      .withMessage("Standard must be a positive integer"),
    body("subject").isString().withMessage("Subject must be a string"),
    body("marks")
      .isInt({ min: 0 })
      .withMessage("Marks must be a non-negative integer"),
  ],
  questioncontroller.addQuestion
);

// Route to delete a question by ID
router.delete("/:id", questioncontroller.deleteQuestion);

// Route to filter a question
router.post("/filter", questioncontroller.filterQuestions);

// route for getting distinct standards
router.get("/standards", questioncontroller.getStandards);

// route for getting distinct subjects
router.get("/subjects", questioncontroller.getSubjects);

// generate paper randomly
router.post("/random", questioncontroller.getRandomQuestions);


module.exports = router;
