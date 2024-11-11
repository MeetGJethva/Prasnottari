import React, { useState } from 'react';
import { Tabs, Tab, Box, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

// Styled components
const CenteredContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: '#d6e6d4', // Light background color for contrast
}));

const AuthPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: '#3a5a40',
  width: '100%',
  maxWidth: 400, // Max width to prevent it from becoming too wide
  padding: theme.spacing(2),
  boxSizing: 'border-box', // Ensure padding doesn't affect width
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  backgroundColor: '#3a5a40',
  '& .MuiTabs-indicator': {
    backgroundColor: '#fff', // White indicator color
  },
  padding: theme.spacing(2),
  width: '100%',
  textAlign: 'center',
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  '&.Mui-selected': {
    backgroundColor: '#fff', // White background for selected tab
    color: '#3a5a40', // Green text for selected tab
  },
}));

const FormContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#fff', // White background for form container
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 2,
  marginTop: theme.spacing(2),
  boxSizing: 'border-box', // Ensure padding doesn't affect width
}));

const AuthForm = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <CenteredContainer>
      <AuthPaper elevation={3}>
        <StyledTabs value={activeTab} onChange={handleTabChange} variant="fullWidth">
          <StyledTab label="Login" />
          <StyledTab label="Sign Up" />
        </StyledTabs>

        <FormContainer>
          {activeTab === 0 && <LoginForm />}
          {activeTab === 1 && <SignUpForm />}
        </FormContainer>
      </AuthPaper>
    </CenteredContainer>
  );
};

export default AuthForm;
