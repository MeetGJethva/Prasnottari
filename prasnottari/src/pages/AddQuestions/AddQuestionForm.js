import React from "react";
import { Grid, TextField, FormControl, Select, InputLabel, MenuItem } from "@mui/material";

const standards = Array.from({ length: 12 }, (_, i) => i + 1); // [1, 2, ..., 12]
const marks = Array.from({ length: 8 }, (_, i) => i + 1); // [1, 2, ..., 8]

const AddQuestionForm = ({ formData, handleInputChange, handleSelectChange, errors }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          id="question"
          label="Question"
          variant="standard"
          fullWidth
          value={formData.question}
          onChange={handleInputChange}
          required
          error={!!errors.question}
          helperText={errors.question}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="answer"
          label="Answer"
          variant="standard"
          fullWidth
          value={formData.answer}
          onChange={handleInputChange}
          required
          error={!!errors.answer}
          helperText={errors.answer}
        />
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth variant="standard" required error={!!errors.standard}>
          <InputLabel>Standard</InputLabel>
          <Select
            name="standard"
            value={formData.standard}
            onChange={handleSelectChange}
          >
            {standards.map((std) => (
              <MenuItem key={std} value={std}>
                {std}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth variant="standard" required error={!!errors.marks}>
          <InputLabel>Marks</InputLabel>
          <Select
            name="marks"
            value={formData.marks}
            onChange={handleSelectChange}
          >
            {marks.map((mark) => (
              <MenuItem key={mark} value={mark}>
                {mark}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
    </Grid>
  );
};

export default AddQuestionForm;
