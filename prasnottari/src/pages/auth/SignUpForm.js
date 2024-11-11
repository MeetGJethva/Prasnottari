import React, { useState, useContext } from "react";
import { TextField, Button, Typography, Grid, Box } from "@mui/material";
import { AuthContext } from "../../context/AuthContext";
import CustomButton from "../../components/Button";
import { validateSignUpData } from "../../util/validation"; // Import the validation function

const SignUpForm = () => {
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
    dob: "",
    college: "",
    sem: "",
  });
  
  const [errors, setErrors] = useState({}); // State for error messages
  const { signup } = useContext(AuthContext);

  const handleSignUpSubmit = async () => {
    const validationErrors = validateSignUpData(signUpData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // Set error messages if validation fails
      return;
    }
    
    setErrors({}); // Clear previous errors
    try{
      await signup(signUpData);
    }
    catch(err){
      console.error("Sign-up failed from form:", err);
      setErrors({userexist:err.errors || "Sign UP Failed"});
    }
    
  };

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Sign Up
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          maxHeight: 300,
          overflowY: "auto",
          padding: 2,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              fullWidth
              margin="normal"
              value={signUpData.name}
              error={!!errors.name}
              helperText={errors.name}
              onChange={(e) =>
                setSignUpData({ ...signUpData, name: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              value={signUpData.email}
              error={!!errors.email}
              helperText={errors.email}
              onChange={(e) =>
                setSignUpData({ ...signUpData, email: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={signUpData.password}
              error={!!errors.password}
              helperText={errors.password}
              onChange={(e) =>
                setSignUpData({ ...signUpData, password: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Contact"
              fullWidth
              margin="normal"
              value={signUpData.contact}
              error={!!errors.contact}
              helperText={errors.contact}
              onChange={(e) =>
                setSignUpData({ ...signUpData, contact: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Date of Birth"
              type="date"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              value={signUpData.dob}
              error={!!errors.dob}
              helperText={errors.dob}
              onChange={(e) =>
                setSignUpData({ ...signUpData, dob: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="College"
              fullWidth
              margin="normal"
              value={signUpData.college}
              onChange={(e) =>
                setSignUpData({ ...signUpData, college: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Semester"
              fullWidth
              margin="normal"
              value={signUpData.sem}
              onChange={(e) =>
                setSignUpData({ ...signUpData, sem: e.target.value })
              }
            />
          </Grid>
        </Grid>
      </Box>
      {errors.userexist && <Typography color="error">{errors.userexist}</Typography> }
      <CustomButton
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleSignUpSubmit}
      >
        Sign Up
      </CustomButton>
    </>
  );
};

export default SignUpForm;
