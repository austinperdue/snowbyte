import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Box, Typography, Button, Grid } from '@mui/material';
import VideoSection from './components/VideoSection';
import Amenities from './components/Amenities';
import Partners from './components/Partners';
import homeImage from './images/home_image.jpg';






export default function Home() {
    return (
        <div style={{ paddingTop: '4em' }}>
            <Box maxwidth="100%">
                <Box
                    sx={{
                        width: '100%',
                        height: '75vh',
                        position: 'relative',
                        overflow: 'hidden',
                        top: 0,
                        left: 0,
                        //zIndex: -1,
                    }}
                >
                    <Box
                        component="img"
                        src={homeImage}
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
                                    color: 'black'
                                }
                            }}
                        >
                            Book Now
                        </Button>
                    </Box>
                </Box>
            </Box>


            <br></br>
            <br></br>
            <br></br>
            <Box
                sx={{
                    flexGrow: 1,
                    width: '100%',
                }}
            >
                <Grid container spacing={7} sx={{ width: '100%', margin: 0}}>
                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'flex-start',
                                height: '100%',
                                paddingLeft: { xs: 2, md: 8 },
                            }}
                        >
                            <Typography
                                variant='h3'
                                fontWeight="bold"


                                sx={{
                                    fontFamily: 'Russo One, sans-serif',
                                    fontSize: { xs: '2rem', md: '4rem' },
                                }}
                            >
                                Planning a trip?
                            </Typography>
                            <br></br>
                            <br></br>
                            <Typography
                                variant="h5"
                                sx={{
                                    fontFamily: 'Bitter, serif'
                                }}
                            >
                                Let us help you.
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '100%',
                                paddingRight: { xs: 2, md: 4 },

                            }}
                        >
                            <Typography
                                variant="body1"
                                sx={{
                                    textAlign: 'justify',
                                    fontFamily: 'Bitter, serif'
                                }}
                            >
                                Whether you're looking for a relaxing getaway 
                                or an action-packed adventure, our team of experienced 
                                professionals can help you plan the perfect trip. We offer a 
                                range of services, including accommodation bookings, 
                                transportation arrangements, and activity recommendations. 
                                Contact us today to learn more about how we can make your 
                                dream vacation a reality.
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            <br></br>
            <br></br>            
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <VideoSection />
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <Amenities />
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <Partners />

        </div>
    );
}
