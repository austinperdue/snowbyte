// src/pages/FAQ.js
import React from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import zIndex from '@mui/material/styles/zIndex';
import faqHeaderImage from './images/clouds.jpg';
import landscapeImage from './images/landscape.jpg';
import sbLogo from './images/sblogo.png';
import PictureTextOverlay from './components/PictureTextOverlay';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';


export default function Explore() {
    return (
        <div
            style={{
                display: 'flex',
                minHeight: '75vh',
                flexDirection: 'column',
                paddingTop: '6em',
                paddingBottom: '2em',
                
            }}>

            <PictureTextOverlay image={landscapeImage} text="EXPLORE OVER 3500 ACRES" subText="" />

            {/* Responsive container for the image and text */}
            <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                    minHeight: '30vh',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '-4em',
                    height: '25vh',
                }}
            >
                <Box
                    sx={{
                        flexShrink: 0,
                        width: {
                            xs: '50%',
                            sm: '25%',
                            md: '25%',
                            lg: '20%',
                            xl: '15%',
                        },
                        height: '50vh',
                        backgroundImage: `url(${sbLogo})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',

                    }}
                />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '40%',
                        height: '30vh',
                        // move to right more so it's centered
                        marginRight: '-10%',
                    }}
                >
                    <Typography
                        variant="h1"
                        sx={{
                            color: 'darkorange',
                            fontFamily: 'Russo One, sans-serif',
                            fontSize: {
                                xs: '2em',
                                sm: '4em',
                                md: '5em',
                                lg: '6em',
                                xl: '7em',
                            },
                            textAlign: 'left',
                            width: '100%',
                            paddingLeft: '5%',
                            // black text shadow
                            textShadow: '4px 4px 0px black, 5px 5px 0px black',
                        }}
                    >
                        7 peaks.
                    </Typography>

                    <Typography
                        variant="h3"
                        sx={{
                            color: 'black',
                            fontFamily: 'Russo One, sans-serif',
                            fontSize: {
                                xs: '1.5em',
                                sm: '3em',
                                md: '3em',
                                lg: '4em',
                            },
                            textAlign: 'left',
                            width: '100%',
                            paddingLeft: '5%',
                        }}
                    >
                        One mountain.
                    </Typography>
                </Box>
            </Box>


        </div>

    );
}