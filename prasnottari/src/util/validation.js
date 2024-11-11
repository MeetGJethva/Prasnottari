// utils/validation.js
export const validateSignUpData = (data) => {
  const errors = {};

  // Name validation
  if (!data.name || typeof data.name !== "string") {
    errors.name = "Name is required and must be a string.";
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email)) {
    errors.email = "Email is required and must be in a valid format.";
  }

  // Password validation
  if (!data.password || data.password.length < 6) {
    errors.password = "Password must be at least 6 characters long.";
  }

  // Contact validation
  const contactRegex = /^\d{10}$/; // Exactly 10 digits
  if (!data.contact || !contactRegex.test(data.contact)) {
    errors.contact = "Contact must be a 10-digit number.";
  }

  // Date of Birth validation
  if (!data.dob) {
    errors.dob = "Date of Birth is required.";
  }

  return errors;
};

// 
export const validateGeneratePaperData = (data) => {
  const errors = {};

  // Title validation
  if (!data.title || typeof data.title !== "string") {
    errors.title = "Title is required and must be a string.";
  }

  // Subject validation
  if (!data.subject) {
    errors.subject = "Subject is required.";
  }

  // Standard validation
  if (!data.standard) {
    errors.standard = "Standard is required.";
  }

  // Number of Questions validation
  if (data.numberOfQuestions <= 0) {
    errors.numberOfQuestions =
      "Number of Questions is required and must be a positive integer.";
  }

  return errors;
};
