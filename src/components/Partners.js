import React from 'react';
import { Box, Container, Grid } from '@mui/material';
import coke from '../svg/coke.svg';
import gopro from '../svg/gopro.svg';
import guiness from '../svg/guiness.svg';
import { BorderTop } from '@mui/icons-material';

const logos = [
    coke,
    gopro,
    guiness,
];

const Partners = () => {
    return (
        <Container maxWidth={false} disableGutters>
            <Box 
            sx={{ 
              backgroundColor: '#E5E5E5', 
              padding: '2rem',
              }}>
                <Grid container justifyContent="center" spacing={{ xs: 6, sm: 8, md: 10 }}>
                    {logos.map((logo, index) => (
                        <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
                            <Box 
                                component="img" 
                                src={logo} 
                                alt={`Logo ${index + 1}`} 
                                sx={{ 
                                    width: { xs: '40%', sm: '30%', md: '80%' }, 
                                    height: 'auto',
                                    display: 'block',
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    // on hover
                                    '&:hover': {
                                        transform: 'scale(1.1)',
                                        transition: 'all 0.3s ease-in-out',
                                    },

                                }}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
};

export default Partners;