const express = require("express");
const { check } = require("express-validator");
const router = express.Router();

const usercontroller = require("../controllers/usercontroller");

router.get("/", usercontroller.getUsers);

router.post(
  "/signup",
  [
    check("name").notEmpty().withMessage("Name is required"),
    check("password").notEmpty().withMessage("Password is required"),
    check("contact").notEmpty().withMessage("Contact number is required"),
    check("email").isEmail().withMessage("Please enter a valid email address"),
    check("dob").notEmpty().withMessage("Date of birth is required"),
    check("college").notEmpty().withMessage("College name is required"),
    check("sem").notEmpty().withMessage("Semester is required"),
  ],
  usercontroller.signUp
);

router.post("/login", usercontroller.signIn);

// add question to bookmark
router.post("/bookmark", usercontroller.addBookmark);

// get bookmarked questions
router.get("/bookmark/:id", usercontroller.getBookmarkedQuestions);

// remove bookmarked questions
router.post("/removebookmark", usercontroller.removeBookmarked);

module.exports = router;
