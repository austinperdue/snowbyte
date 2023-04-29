import React from 'react';
import { Box, Grid, Typography, Link, useMediaQuery, useTheme } from '@mui/material';
import AcUnitRoundedIcon from '@mui/icons-material/AcUnitRounded';
import { Instagram, Facebook, Twitter, YouTube, Transform } from '@mui/icons-material';

const links = ['Explore', 'Stay', 'FAQ', 'Employees'];

export default function Footer() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

    return (
        <Box sx={{ backgroundColor: '#1C1C1E', color: '#EBEBEB', padding: 4 }}>
            <Grid container direction="column" alignItems="center" spacing={4}>
                <Grid item>
                    <Box display="flex" alignItems="center" justifyContent="center" flexDirection={isMobile ? "column" : "row"}>
                        <AcUnitRoundedIcon
                            sx={{
                                color: 'darkorange',
                                fontSize: { xs: '2rem', md: '2rem', lg: '2rem' },
                                marginTop: { xs: 1, md: -1 }
                            }} />
                        <Typography variant="h5" align="center" gutterBottom
                            sx={{
                                fontFamily: 'Russo One, sans-serif',
                                fontSize: { xs: '1.5rem', md: '2rem', lg: '2rem' },
                                letterSpacing: { xs: '0.1rem', md: '0.2rem' },
                                marginLeft: { xs: 1, md: 2 },
                                marginTop: { xs: 2, md: 0 }
                            }}>
                            snowbyte
                        </Typography>
                    </Box>
                </Grid>

                <Grid item>
                    <Box display="flex" flexDirection={isMobile ? "column" : "row"} justifyContent="center" alignItems="center" gap={2}>
                        {links.map((link, index) => (
                            <Typography
                                key={index}
                                variant="body2"
                                align="center"
                                sx={{
                                    fontFamily: 'Bitter, serif',
                                    fontSize: { xs: '0.8rem', md: '0.8rem', lg: '0.8rem' },
                                    color: '#969696',
                                    marginTop: { xs: 0, md: -2 },
                                }}>
                                <Link href={link} underline="none" sx={{ color: '#969696' }}>
                                    {link}
                                </Link>
                            </Typography>
                        ))}
                    </Box>
                </Grid>

                <Grid item>
                    <Box display="flex" flexDirection={isMobile ? "column" : "row"} justifyContent="center" alignItems="center" gap={2}>
                        <Instagram
                            fontSize="large"
                            sx={{
                                '&:hover': {
                                    color: '#C13584',
                                },
                            }}
                        />
                        <Facebook
                            fontSize="large"
                            sx={{
                                '&:hover': {
                                    color: '#3B5998',
                                },
                            }}
                        />
                        <Twitter
                            fontSize="large"
                            sx={{
                                '&:hover': {
                                    color: '#1DA1F2',
                                },
                            }}
                        />
                        <YouTube fontSize="large"
                            sx={{
                                '&:hover': {
                                    color: '#FF0000',
                                },
                            }}
                        />
                    </Box>
                </Grid>

                <Grid item xs={12} sm={8} md={6}>
                    <Typography variant="subtitle2" align="center" gutterBottom
                        sx={{
                            fontFamily: 'Bitter, serif',
                            fontSize: { xs: '0.8rem', md: '0.8rem', lg: '0.8rem' },
                            color: '#969696',
                            width: '50%',
                            margin: 'auto',
                        }}>
                        snowbyte is a virtual ski resort. This website represents a full stack web
                        application that was built with MySQL, Express, React, and Node.js. This project
                        was created by Austin Perdue and Sean Talbot for CS 347 at James Madison University.
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
}
