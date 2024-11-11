import React from 'react';
import { Typography } from "@mui/material";

const FormHeader = ({ selectedTab }) => {
  return (
    <Typography
      sx={{
        fontWeight: "bold",
        fontSize: "25px",
        mb: 2,
        textAlign: "center",
      }}
    >
      {selectedTab === 0 ? "Add Question" : "Add Question Paper"}
    </Typography>
  );
};

export default FormHeader;
