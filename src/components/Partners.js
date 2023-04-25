import React from 'react';
import { Box, Typography } from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';
import jmuLogo from '../images/jmu_logo.png';

export default function Partners() {
  return (
    <>
      <Box sx={{ backgroundColor: '#450084', padding: 4, textAlign: 'center' }}>
        <br></br>
        <Typography
          variant="h4"
          sx={{ 
            fontFamily: 'Russo One, sans-serif', 
            color: '#ffffff', 
            marginBottom: 0,
            fontSize: { xs: '1.5rem', md: '1.5rem' },
            letterSpacing: '.3rem',
        }}
        >
          PROUD PARTNERS

        </Typography>
        
        <br></br>

        <VerifiedIcon
            sx={{
                color: '#ffffff',
                fontSize: { xs: '2rem', md: '2rem' },
            }}
        >
        </VerifiedIcon>
            
      </Box>
      <Box
        sx={{
          backgroundColor: '#ffffff',
          width: { xs: '100%', md: '50%' },
          margin: '0 auto',
          padding: 4,
        }}
      >
        <Box component="img" src={ jmuLogo } alt="Partner Logo" sx={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
      </Box>
    </>
  );
}