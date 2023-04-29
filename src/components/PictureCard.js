import React from 'react';
import { Card, CardMedia, useTheme } from '@mui/material';
import { useMediaQuery } from '@mui/material';

function PictureCard({ imageSrc }) {
    // Get current theme
    const theme = useTheme();

    // Check current screen size
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '10em',
                marginBottom: '5em'
            }}

        >
            <Card
                sx={{
                    width: isSmallScreen ? '100%' : '80%',
                    height: '100%',
                    borderRadius: '16px',
                    boxShadow: '0px 5px 15px rgba(0,0,0,0.3)',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                        transform: 'scale(1.05)'
                    },
                    margin: '0 auto' // center the card
                }}
            >
                <CardMedia
                    component="img"
                    image={imageSrc}
                    alt="image"
                    sx={{
                        borderRadius: '16px', // same border radius as the card
                        height: '100%',
                        width: '100%',
                        objectFit: 'cover'
                    }}
                />
            </Card>
        </div>
    );
}

export default PictureCard;