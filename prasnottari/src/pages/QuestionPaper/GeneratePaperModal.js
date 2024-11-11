import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  FormControl,
  TextField,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import CustomButton from "../../components/Button";
import { validateGeneratePaperData } from "../../util/validation"; // Import the validation function
import axios from "axios";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const GeneratePaperModal = ({ open, handleClose, standards, subjects }) => {
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    standard: "",
    numberOfQuestions: 0,
  });

  const [errors, setErrors] = useState({}); // State for error messages

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const generatePDF = (questions, title, subject, standard) => {
    const doc = new jsPDF();
    const marginLeft = 10;
    const marginRight = 10;
    const pageWidth = doc.internal.pageSize.getWidth();
    const textWidth = pageWidth - marginLeft - marginRight;

    doc.setFontSize(20);
    doc.text(title, pageWidth / 2, 20, { align: "center" });

    doc.setFontSize(16);
    doc.text(`Subject: ${subject} | Standard: ${standard}`, pageWidth / 2, 30, {
      align: "center",
    });

    let yPosition = 40;
    doc.setFontSize(14);
    questions.forEach((q, index) => {
      const questionText = `${index + 1}. ${q.question} (${q.marks} marks)`;
      const wrappedText = doc.splitTextToSize(questionText, textWidth);
      wrappedText.forEach((line) => {
        doc.text(line, marginLeft, yPosition);
        yPosition += 10;
      });
      yPosition += 10;
    });

    doc.save("QuestionPaper.pdf");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateGeneratePaperData(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({}); // Clear previous errors
    try {
      const { subject, standard, numberOfQuestions, title } = formData;

      const response = await axios.post(
        "http://127.0.0.1:8000/api/questions/random",
        {
          subject,
          standard,
          numberOfQuestions,
        }
      );

      const questions = response.data.data;
      generatePDF(questions, title, subject, standard);
      handleClose();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Error generating question paper.";
      console.error("Error generating question paper:", error);
      setErrors({ api: errorMessage }); // Set API error message
    } finally {
      // Close the modal after generation
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Generate Question Paper
        </Typography>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Title"
            variant="outlined"
            size="small"
            fullWidth
            value={formData.title}
            error={!!errors.title}
            helperText={errors.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Subject</InputLabel>
          <Select
            value={formData.subject}
            onChange={handleChange}
            label="Subject"
            name="subject"
          >
            {subjects &&
              subjects.map((subject) => (
                <MenuItem key={subject} value={subject}>
                  {subject}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        {errors.subject && (
          <Typography color="error">{errors.subject}</Typography>
        )}{" "}
        <FormControl fullWidth margin="normal">
          <InputLabel>Standard</InputLabel>
          <Select
            value={formData.standard}
            onChange={handleChange}
            label="Standard"
            name="standard"
          >
            {standards &&
              standards.map((standard) => (
                <MenuItem key={standard} value={standard}>
                  Standard {standard}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        {errors.standard && (
          <Typography color="error">{errors.standard}</Typography>
        )}{" "}
        <TextField
          fullWidth
          margin="normal"
          label="Number of Questions"
          type="number"
          name="numberOfQuestions"
          value={formData.numberOfQuestions}
          error={!!errors.numberOfQuestions}
          helperText={errors.numberOfQuestions}
          onChange={handleChange}
        />
        {errors.api && <Typography color="error">{errors.api}</Typography>}{" "}
        <CustomButton
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ marginTop: 2 }}
        >
          Generate
        </CustomButton>
      </Box>
    </Modal>
  );
};

export default GeneratePaperModal;
