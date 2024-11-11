import React, { useState, useContext } from 'react';
import { TextField, Typography } from '@mui/material';
import { AuthContext } from '../../context/AuthContext';
import CustomButton from '../../components/Button';

const LoginForm = () => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [error, setError] = useState(''); // State to hold error messages
  const { login } = useContext(AuthContext);

  const handleLoginSubmit = async () => {
    setError(''); // Reset error before new login attempt
    try {
      await login(loginData);
    } catch (err) {
      setError(err.errors || 'Login failed. Please try again.'); // Set error message from backend
    }
  };

  return (
    <>
      <Typography variant="h5">Login</Typography>
      <TextField
        label="Email"
        fullWidth
        margin="normal"
        value={loginData.email}
        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        value={loginData.password}
        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
      />
      {error && <Typography color="error">{error}</Typography>} {/* Display error */}
      <CustomButton fullWidth fill={true} variant="contained" color="primary" onClick={handleLoginSubmit}>
        Login
      </CustomButton>
    </>
  );
};

export default LoginForm;
