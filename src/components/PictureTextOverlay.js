// this is a react MUI component that returns a full width, tall heightwise image
// that you can pass through text to change the overlay

import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import KeyboardDoubleArrowDownOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowDownOutlined';

const ImageContainer = styled(Box)(({ theme }) => ({
    position: 'relative',
    width: '100%',
    minHeight: '65vh',
    overflow: 'hidden',
    paddingBottom: '2em',
    marginBottom: '4em',
    border: '1px solid black',
}));

const Image = styled('img')(({ theme }) => ({
    color: 'white',
    width: '100%',
    height: '130%',
    objectFit: 'cover',
    objectPosition: 'center', // default object position
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 0,
    '@media (min-width: 600px)': {
        // larger desktop screens, allows to scale image
        objectPosition: '60% 60%',
    },
    pointerEvents: 'none',
}));

const TextOverlay = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
}));

const PictureTextOverlay = ({ image, text, subText }) => {
    return (
        <ImageContainer>
            <Image src={image} alt="image" />
            <TextOverlay>
                <Typography
                    variant="h4"
                    sx={{
                        fontSize: {
                            sm: '2.5em',
                            md: '2.5em',
                            lg: '3.2em',
                        },
                        fontFamily: 'Russo One, sans-serif',

                        mb: { xs: 2, md: 0 },
                        letterSpacing: '0.1em',
                        // transparent text
                        WebkitTextStroke: '2px black',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
                    {text}
                </Typography>
                <Typography
                    variant="h6"
                    sx={{
                        fontSize: {
                            sm: '1.5em',
                            md: '1.5em',
                            lg: '1.8em',
                        },
                        fontFamily: 'Russo One, sans-serif',
                        mb: { xs: 2, md: 0 },
                        letterSpacing: '0.1em',
                        // transparent text
                        WebkitTextStroke: '2px black',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
                    {subText}
                    <KeyboardDoubleArrowDownOutlinedIcon
                        sx={{
                            fontSize: '2em',
                            // make transparent
                            color: '#FFD0AC',
                            margin: '0 0.5em',
                            // move box down
                            transform: 'translateY(5em)',

                        




                        }}
                    />
                </Typography>
            </TextOverlay>
        </ImageContainer>
    );
};

export default PictureTextOverlay;
