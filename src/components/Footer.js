// src/components/Footer.js
import React from 'react';
import { Box, Grid, Typography, Link } from '@mui/material';
import AcUnitRoundedIcon from '@mui/icons-material/AcUnitRounded';
import SnowboardingIcon from '@mui/icons-material/Snowboarding';

const links = [
    {
        title: 'EXPLORE',
        items: ['Skiing', 'Pricing', 'Integrations'],
    },
    {
        title: 'STAY',
        items: ['Lodging', 'Help Center', 'Guides', 'Events', 'Dining'],
    },
    {
        title: 'HELP',
        items: ['FAQ', 'Careers', 'Contact', 'Press'],
    },
];

export default function Footer() {
    return (
        <Box sx={{ backgroundColor: '#1C1C1E', color: '#EBEBEB', padding: 4 }}>
            <Grid container justifyContent="center" spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                    <Box display="flex" justifyContent="center">
                        <SnowboardingIcon sx={{
                            marginBottom: 5,
                            // move to the left
                            marginRight: 20,
                            fontSize: { xs: '4rem', md: '4rem', lg: '6rem' },
                        }}
                        />
                    </Box>
                    <Typography 
                    variant="h5" 
                    align="left" 
                    gutterBottom
                    sx={{
                        fontFamily: 'Russo One, sans-serif',
                        fontSize: { xs: '1.5rem', md: '2rem', lg: '2.5rem' },
                        letterSpacing: { xs: '0.1rem', md: '0.2rem' },
                        
                    }}
                    >
                        snowbyte
                    </Typography>
                    <Typography 
                    variant="subtitle2" 
                    align="left" 
                    gutterBottom
                    sx={{
                        fontFamily: 'Bitter, serif',
                        fontSize: { xs: '0.8rem', md: '0.8rem', lg: '0.8rem' },
                        color: '#969696',
                        
                    }}>
                        snowbyte is a virtual ski resort. This website represents 
                        a full stack web application that was built with React, Node.js, MUI, and MySQL.
                        This project was created by Austin Perdue and Sean Talbot for CS 347 at
                        James Madison University.
                    </Typography>
                </Grid>
                {links.map((linkGroup, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Typography 
                        variant="h6" 
                        gutterBottom
                        // if xs screen, center
                        align="center"


                        sx={{
                            fontFamily: 'Russo One, sans-serif',
                            fontSize: { xs: '1rem'},
                            letterSpacing: { xs: '0.1rem', md: '0.2rem' },

                        }}
                        >
                            {linkGroup.title}
                            <br></br>
                            <br></br>
                            <br></br>
                            
                        </Typography>
                        {linkGroup.items.map((item, index) => (
                            <Typography 
                            key={index} 
                            variant="body2" 
                            gutterBottom
                            align='center'
                            sx={{
                                fontFamily: 'Bitter, serif',
                                fontSize: { xs: '0.8rem', md: '0.8rem', lg: '0.8rem' },
                                color: '#969696',

                            }}
                            >
                                <Link color="inherit" underline="none">
                                    
                                    {item}
                                </Link>
                            </Typography>
                        ))}
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}