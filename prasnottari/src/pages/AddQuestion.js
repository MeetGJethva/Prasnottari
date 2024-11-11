import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Box, Typography } from "@mui/material";
import { AuthContext } from '../context/AuthContext';
import CustomButton from "../components/Button";
import FormHeader from './AddQuestions/FormHeader';
import TabSelector from './AddQuestions/TabSelector';
import AddQuestionForm from './AddQuestions/AddQuestionForm';
import AddQuestionPaperForm from './AddQuestions/AddQuestionPaperForm';
import CustomModal from './AddQuestions/CustomModal';

export default function AddQuestion({ isOpen, setIsOpen }) {
  const navigate = useNavigate();
  const { isLoggedIn, userId } = useContext(AuthContext);
  
  const [selectedTab, setSelectedTab] = useState(0);
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    standard: "",
    subject: "",
    marks: "",
    Q_paper: "",
    year: "",
    file: "",
    uploadedBy: userId,
  });
  
  const [errors, setErrors] = useState({}); // State for validation errors

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    const newErrors = {};
    // Validation logic based on the selected tab
    if (selectedTab === 0) { // Add Question Tab
      // Validate fields specific to the Add Question form
      if (!formData.question) newErrors.question = "Question is required.";
      if (!formData.answer) newErrors.answer = "Answer is required.";
      if (!formData.standard) newErrors.standard = "Standard is required.";
      if (!formData.subject) newErrors.subject = "Subject is required.";
      if (!formData.marks) newErrors.marks = "Marks are required.";
    } else if (selectedTab === 1) { // Add Question Paper Tab
      // Validate fields specific to the Add Question Paper form
      if (!formData.Q_paper) newErrors.Q_paper = "Question Paper is required.";
      if (!formData.year) newErrors.year = "Year is required.";
      if (!formData.subject) newErrors.subject = "Subject is required.";
      if (!formData.file) newErrors.file = "File is required.";
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) return; // If there are errors, return early
    
    formData.uploadedBy = userId; //assigning userid to question 
    try {
      // Prepare request URL based on the selected tab
      let url = selectedTab === 0 
        ? "http://127.0.0.1:8000/api/questions/add" 
        : "http://127.0.0.1:8000/api/questionpaper/add";

      if (selectedTab === 0) {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error:", errorData.message);
          alert(errorData.message);
          return;
        }

        alert("Question submitted successfully!");
      } else {
        const formDataObj = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          formDataObj.append(key, value);
        });

        const response = await fetch(url, {
          method: "POST",
          body: formDataObj,
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error:", errorData);
          alert("Failed to submit. Please check your input.");
          return;
        }

        alert("Question paper submitted successfully!");
      }

      // Reset form data after submission
      setFormData({
        question: "",
        answer: "",
        standard: "",
        subject: "",
        marks: "",
        Q_paper: "",
        year: "",
        file: "",
        uploadedBy: userId,
      });
      setIsOpen(false);

    } catch (error) {
      console.error("Error:", error);
      alert("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <CustomModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      {isLoggedIn ? (
        <>
          <FormHeader selectedTab={selectedTab} />
          <TabSelector selectedTab={selectedTab} handleTabChange={handleTabChange} />
          {selectedTab === 0 ? (
            <AddQuestionForm formData={formData} handleInputChange={handleInputChange} handleSelectChange={handleSelectChange} errors={errors} />
          ) : (
            <AddQuestionPaperForm formData={formData} handleInputChange={handleInputChange} handleFileChange={handleFileChange} errors={errors} />
          )}
          <Stack direction="row" spacing={2} mt={2} justifyContent="flex-end">
            <CustomButton onClick={handleSubmit}>Submit</CustomButton>
          </Stack>
        </>
      ) : (
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h6" gutterBottom>
            For contribution, please login.
          </Typography>
          <CustomButton variant="contained" color="primary" onClick={() => navigate("/login")} sx={{ mt: 2 }} fill={true}>
            Login
          </CustomButton>
        </Box>
      )}
    </CustomModal>
  );
}
