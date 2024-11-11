import React from "react";
import { Grid, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const FilterComponent = ({
  selectedStandard,
  selectedSubject,
  handleStandardChange,
  handleSubjectChange,
  standards,
  subjects,
}) => (
  <Grid container spacing={3} marginBottom={4}>
    <Grid item xs={12} sm={4}>
      <TextField
        fullWidth
        label="Search Papers"
        variant="outlined"
        size="small"
        InputProps={{
          style: { borderRadius: 20 },
        }}
      />
    </Grid>
    <Grid item xs={12} sm={4}>
      <FormControl fullWidth variant="outlined" size="small">
        <InputLabel>Standard</InputLabel>
        <Select
          label="Standard"
          value={selectedStandard}
          style={{ borderRadius: 20 }}
          onChange={handleStandardChange}
        >
          {standards &&
            standards.map((standard) => (
              <MenuItem key={standard} value={standard}>
                Standard {standard}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={12} sm={4}>
      <FormControl fullWidth variant="outlined" size="small">
        <InputLabel>Subject</InputLabel>
        <Select
          label="Subject"
          value={selectedSubject}
          style={{ borderRadius: 20 }}
          onChange={handleSubjectChange}
        >
          {subjects &&
            subjects.map((subject) => (
              <MenuItem key={subject} value={subject}>
                {subject}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Grid>
  </Grid>
);

export default FilterComponent;
