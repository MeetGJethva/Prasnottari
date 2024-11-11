import React from "react";
import { Grid, TextField } from "@mui/material";

const AddQuestionPaperForm = ({ formData, handleInputChange, handleFileChange, errors }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          id="Q_paper"
          label="Question Paper"
          variant="standard"
          fullWidth
          value={formData.Q_paper}
          onChange={handleInputChange}
          required
          error={!!errors.Q_paper}
          helperText={errors.Q_paper}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="year"
          label="Year"
          variant="standard"
          fullWidth
          value={formData.year}
          onChange={handleInputChange}
          required
          error={!!errors.year}
          helperText={errors.year}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="subject"
          label="Subject"
          variant="standard"
          fullWidth
          value={formData.subject}
          onChange={handleInputChange}
          required
          error={!!errors.subject}
          helperText={errors.subject}
        />
      </Grid>
      <Grid item xs={6}>
        <input
          type="file"
          onChange={handleFileChange}
          accept="application/pdf"
          required
        />
      </Grid>
    </Grid>
  );
};

export default AddQuestionPaperForm;
