import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import WarningIcon from '@mui/icons-material/Warning';

const AlertContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: theme.zIndex.appBar + 1,
  backgroundColor: 'darkorange',
  textAlign: 'center',
  // temporary fix for alert bar covering navbar
  height: '48px'
}));

const AlertText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Bitter, serif',
  color: 'white',
  marginLeft: theme.spacing(4),
  display: 'inline',
  fontSize: '0.875rem',
  // move text down a bit
  marginTop: theme.spacing(0.5)
}));

const Alert = () => {
  return (
    <AlertContainer>
      <Container>
        <Box display="flex" justifyContent="center" alignItems="center" py={1}>
          <WarningIcon htmlColor="white" />
          <AlertText>In development. Some features may not work as intended.</AlertText>
        </Box>
      </Container>
    </AlertContainer>
  );
};

export default Alert;