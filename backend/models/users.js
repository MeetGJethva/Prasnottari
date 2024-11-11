// models/users.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the user schema
const userSchema = new mongoose.Schema({
  // no:{
  //   type: integer,
  //   autoIncrement: true
  // },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  contact: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  dob: {
    type: Date,
    required: true
  },
  college: {
    type: String,
    required: true
  },
  sem: {
    type: Number,
    required: true
  },
  bookmarked: [{
    type: Schema.Types.ObjectId,
    ref: 'Question',
    required: false
  }]
}, { timestamps: true });

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
