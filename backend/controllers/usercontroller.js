const { validationResult } = require("express-validator");
const Question = require("../models/questions");

// Model User
const User = require("../models/users");

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password");
    res.json(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
    return next(error);
  }

  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const signUp = async (req, res, next) => {
  //   console.log("signUp");
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  //check if the user already exists

  const { name, password, contact, email, dob, college, sem } = req.body;
  let newUser;
  try {
    newUser = await User.findOne({ email: email });
  } catch (e) {
    console.log(e);
    return next(e);
  }

  if (newUser) {
    res.status(400).json({ errors: "User already exist" });
    return;
  }

  const createdUser = new User({
    name,
    password,
    contact,
    email,
    dob,
    college,
    sem,
    bookmarked: [],
  });

  try {
    await createdUser.save();
  } catch (err) {
    console.log(err);
    return next(err);
  }

  res.status(200).json({ user: createdUser.toObject({ getters: true }) });
};

const signIn = async (req, res, next) => {
  let { email, password } = req.body;
  let user;
  try {
    user = await User.findOne({ email: email });
  } catch (err) {
    return next(err);
  }

  if (!user || user.password != password) {
    res.status(400).json({ errors: "Wrong username or password" });

    // const err = new Error("Invalid credentials");
    return;
  }

  res.json({ userId: user.id });
};

// ===================== add question to bookmarks list =====================
const addBookmark = async (req, res, next) => {
  const { id, userId } = req.body;

  if (!id || !userId) {
    res.status(400).json({ error: "Invalid question" });
    return next();
  }

  const existQuestion = await Question.findById(id);

  if (!existQuestion) {
    res.status(400).json({ error: "Question not found" });
    return next();
  }

  const existingUser = await User.findById(userId);

  if (!existingUser) {
    res.status(400).json({ error: "User not found" });
    return next();
  }

  if (existingUser.bookmarked.includes(id)) {
    res.status(400).json({ message: "Question already exists" });
    return next();
  }

  existingUser.bookmarked.push(id);
  existingUser.save();

  res.status(200).json({ userBoomakr: existingUser.bookmarked });
};

// ===================== remove bookmarked =====================
const removeBookmarked = async (req, res) => {
  const { id, userId } = req.body;

  const existingUser = await User.findById(userId);

  if (!existingUser) {
    res.status(400).json({ error: "User not found" });
    return next();
  }

  if (existingUser.bookmarked.includes(id)) {
    const index = existingUser.bookmarked.indexOf(id);
    if (index > -1) {
      existingUser.bookmarked.splice(index, 1);
      existingUser.save();
      res.status(200).json({ userBoomarkr: existingUser.bookmarked });
    }
  } else {
    res.status(404).json({ message: "question not found" });
  }
};

// get bookmarked questions
const getBookmarkedQuestions = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the user by ID and populate the bookmarked questions
    const user = await User.findById(id).populate("bookmarked");

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // Extract the IDs of the bookmarked questions
    const questionIds = user.bookmarked.map((question) => question._id);

    // Send both the bookmarked questions and their IDs in the response
    res.status(200).json({
      data: user.bookmarked, // Populated question details
      questionIds: questionIds, // Array of question IDs
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching bookmarks" });
  }
};

exports.signUp = signUp;
exports.signIn = signIn;
exports.getUsers = getUsers;
exports.addBookmark = addBookmark;
exports.getBookmarkedQuestions = getBookmarkedQuestions;
exports.removeBookmarked = removeBookmarked;
