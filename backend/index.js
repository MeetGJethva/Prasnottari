const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const path = require('path');

// Import routers
const userrouter = require("./routes/userrouter");
const questionsrouter = require("./routes/questionsrouter");
const questionpaerrouter = require("./routes/questionpaperrouter");

const PORT = 8000;

app.use(
  cors({
    origin: "http://localhost:3000", // Replace with the URL of your React app if different
  })
);

// Convert any request to JSON
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//user request routes
app.use("/api/users", userrouter);

//Questions routes
app.use("/api/questions", questionsrouter);

//Qestion Papre routes
app.use("/api/questionpaper", questionpaerrouter);

//connection
mongoose
  .connect("mongodb://localhost:27017/Prasnottari")
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
