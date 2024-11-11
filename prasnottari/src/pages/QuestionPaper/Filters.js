import React from "react";
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import CustomButton from "../../components/Button";

const Filters = ({
  years,
  subjects,
  selectedYear,
  setSelectedYear,
  selectedSubject,
  setSelectedSubject,
  handleOpen,
}) => {
  return (
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
          <InputLabel>Year</InputLabel>
          <Select
            label="Year"
            value={selectedYear}
            style={{ borderRadius: 20 }}
            onChange={(event) => setSelectedYear(event.target.value)}
          >
            {years &&
              years.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
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
            onChange={(event) => setSelectedSubject(event.target.value)}
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
      <Grid item xs={12}>
        <CustomButton fill={true} onClick={handleOpen}>
          Generate Question Paper Randomly
        </CustomButton>
      </Grid>
    </Grid>
  );
};

export default Filters;
