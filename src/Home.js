import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Box, Typography, Button, Grid } from '@mui/material';





export default function Home() {
    return (
        <div>
            <Box maxWidth="false">
                <Box
                    sx={{
                        width: '100%',
                        height: '75vh',
                        position: 'relative',
                        overflow: 'hidden',
                        top: 0,
                        left: 0,
                        zIndex: -1,

                        /* debuggy stuff */
                        border: 0,
                        borderColor: 'red',
                        borderWidth: 1,
                    }}
                >
                    <Box
                        component="img"
                        src="./images/home_image.jpg"
                        alt="home_image"
                        sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            position: 'absolute',
                        }}
                    />
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            zIndex: 1,
                            textAlign: 'center',
                            ml: { xs: 2, md: 0 },
                        }}
                    >

                        <Typography
                            variant="h1"
                            color="white"
                            fontWeight="bold"
                            sx={{
                                fontSize: { xs: '2.5rem', md: '3.5rem' },
                                letterSpacing: '.3rem',
                                textShadow: '6px 2px 1px #000000',
                                fontFamily: 'Russo One, sans-serif'

                            }}
                        >
                            Relax. Explore. Discover.
                        </Typography>
                        <br></br>
                        <Typography
                            variant="h4"
                            color="white"
                            sx={{
                                fontSize: { xs: '1.2rem', md: '1.5rem' },
                                letterSpacing: '.1rem',
                                textShadow: '4px 2px 1px #000000',
                                fontFamily: 'Russo One, sans-serif'
                            }}
                        >
                            23-24 season passes now available
                        </Typography>
                        <br></br>
                        <Button
                            variant="outlined"
                            sx={{
                                borderColor: 'white',
                                color: 'white',
                                fontFamily: 'Russo One, sans-serif',
                                '&:hover': {
                                    backgroundColor: 'white',
                                    borderColor: 'white',
                                    color: 'black',
                                    borderColor: 'white',
                                }
                            }}
                        >
                            Book Now
                        </Button>
                    </Box>
                </Box>
            </Box>
            <Box 
                sx={{ 
                    flexGrow: 1,
                    border: 0,
                        borderColor: 'red',
                        borderWidth: 1,
                    }}>
                <Grid container spacing={2}>
                    <Grid item xs={6} md={8}>
                        <Typography>test</Typography>
                        <Box>
                            <Typography>test</Typography>
                            <Typography>test</Typography>
                        </Box>
                        <Typography>test</Typography>
                    </Grid>
                </Grid>
            </Box>

        </div>
    );
}
