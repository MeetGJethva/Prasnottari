// CustomButton.js
import React from 'react';
import Link from '@mui/material/Button';
import { styled } from '@mui/material/styles';

// Custom styles for the button
const StyledButton = styled(Link)(({ theme, fill }) => ({
  borderRadius: '1rem',
  fontFamily: 'Inter, sans-serif',
  fontSize: '1rem',
  fontWeight: 500,
  lineHeight: 1.5,
  padding: '0.5rem 1rem',
  textTransform: 'none',
  boxShadow: fill ? 'rgba(255, 255, 255, 0.15) 0 1px 0 inset, rgba(46, 54, 80, 0.075) 0 1px 1px' : 'none',
  ...(fill
    ? {
        backgroundColor: '#588157',
        border: '1px solid #588157',
        color: '#FFFFFF',
        '&:hover': {
          backgroundColor: '#344e41',
          borderColor: '#344e41',
        },
        '&:focus': {
          backgroundColor: '#344e41',
          borderColor: '#344e41',
          boxShadow: 'rgba(255, 255, 255, 0.15) 0 1px 0 inset, rgba(46, 54, 80, 0.075) 0 1px 1px, rgba(104, 101, 235, 0.5) 0 0 0 0.2rem',
        },
        '&:active': {
          backgroundColor: '#344e41',
          borderColor: '#344e41',
          boxShadow: 'rgba(46, 54, 80, 0.125) 0 3px 5px inset',
        },
        '&:disabled': {
          backgroundImage: 'none',
          boxShadow: 'none',
          opacity: 0.65,
          pointerEvents: 'none',
        },
      }
    : {
        backgroundColor: '#FFFFFF',
        border: '1px solid #3a5a40',
        color: '#3a5a40',
        '&:hover': {
          backgroundColor: '#F7F7F7',
          borderColor: '#000000',
        },
        '&:focus-visible': {
          boxShadow: '#3a5a40 0 0 0 2px, rgba(255, 255, 255, 0.8) 0 0 0 4px',
        },
        '&:active': {
          backgroundColor: '#F7F7F7',
          borderColor: '#000000',
          transform: 'scale(0.96)',
        },
        '&:disabled': {
          borderColor: '#DDDDDD',
          color: '#DDDDDD',
          cursor: 'not-allowed',
          opacity: 1,
        },
      }),
}));

function CustomButton({ children, fill, ...props }) {
  return (
    <StyledButton fill={fill} {...props}>
      {children}
    </StyledButton>
  );
}

export default CustomButton;
