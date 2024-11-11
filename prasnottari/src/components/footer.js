import React from 'react';
import { Box, Container, Grid, Typography, Link } from '@mui/material';
import { styled } from '@mui/system';

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#2c3e50",
  color: '#fff',
  padding: theme.spacing(6, 0),
}));

const FooterLink = styled(Link)(({ theme }) => ({
  color: '#fff',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

const Footer = () => {
  return (
    <FooterContainer>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Column 1: About Section */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              About Prasnottari
            </Typography>
            <Typography variant="body2">
              Your ultimate source for exam preparation. Practice with a wide variety of questions across subjects and standards.
            </Typography>
          </Grid>

          {/* Column 2: Links Section */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li>
                <FooterLink href="/">Home</FooterLink>
              </li>
              <li>
                <FooterLink href="/question">Questions</FooterLink>
              </li>
              <li>
                <FooterLink href="/questionpaper">Question Papers</FooterLink>
              </li>
              {/* <li>
                <FooterLink href="/faq">FAQs</FooterLink>
              </li> */}
            </ul>
          </Grid>

          {/* Column 3: Contact Section */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2">
              Email: support@questionbank.com
            </Typography>
            <Typography variant="body2">
              Phone: +91 70162-23577
            </Typography>
          </Grid>
        </Grid>

        <Box textAlign="center" mt={4}>
          <Typography variant="body2">
            © {new Date().getFullYear()} Question Bank. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
