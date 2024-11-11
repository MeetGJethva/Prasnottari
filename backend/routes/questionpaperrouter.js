const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const questionpaercontroller = require("../controllers/questionpapercontroller");
const multer = require('multer');
const path = require('path');

// Configure multer for storing PDF files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory where files will be saved
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique file name
  },
});

const upload = multer({ 
  storage, 
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== '.pdf') {
      return cb(new Error('Only PDFs are allowed'));
    }
    cb(null, true);
  }
});


//get questions

router.get("/", questionpaercontroller.getQuestionPaper);

// Route to insert a question paper
router.post(
  "/add",
  upload.single('file'), // Handling single file upload
  [
    body("Q_paper").notEmpty().withMessage("Question paper title is required"),
    body("year").isNumeric().withMessage("Year must be a number"),
    body("subject").notEmpty().withMessage("Subject is required"),
    body("uploadedBy").isMongoId().withMessage("Invalid uploadedBy ID format"),
  ],
  questionpaercontroller.insertQuestionPaper
);

// Route to delete a question paper by ID
router.delete("/:id", questionpaercontroller.deleteQuestionPaper);

// Route to filter a question paper
router.post("/filter", questionpaercontroller.filterQuestionsPapers);

// route for getting distinct standards
router.get("/years", questionpaercontroller.getYears);

// route for getting distinct subjects
router.get("/subjects", questionpaercontroller.getSubjects);


module.exports = router;
