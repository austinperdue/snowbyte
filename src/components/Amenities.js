// src/components/Amenities.js
import React from 'react';
import { Box, Grid, Typography, Button, Chip } from '@mui/material';
import iceRinkImage from '../images/ice_rink.jpg';
import tavernImage from '../images/bar_lounge.jpg';
import poolImage from '../images/hot_springs.jpg';
import amenitiesHeader from '../images/amenities_header.png';
import shadows from '@mui/material/styles/shadows';




const amenities = [
  {
    title: 'Ice Rink',
    description:
      'Enjoy our state-of-the-art ice rink, perfect for a day of family fun or a romantic date night. We provide skate rentals and offer skating lessons for all ages and skill levels.',
    image: iceRinkImage
  },
  {
    title: 'Talbot\'s Tavern',
    description:
      'Unwind at our cozy bar and lounge area after a day of adventure. Sample our carefully curated selection of local and international beverages, or enjoy a delicious meal prepared by our talented chefs.',
    image: tavernImage
  },
  {
    title: 'Hot Springs Pool',
    description:
      'Experience the largest hot springs pool in America! Immerse yourself in the soothing warm waters, surrounded by stunning mountain views. Perfect for relaxation and rejuvenation.',
    image: poolImage
  },
];


export default function Amenities() {
  return (
    <Box sx={{ flexGrow: 1, padding: 0, backgroundColor: 'white', marginBottom: '5em'}}>
      {/* Responsive container for the image and text */}
      <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                    minHeight: '25vh',
                    overflow: 'hidden',
                    paddingBottom: '2em',
                    marginBottom: '4em',
                    marginTop: '10em',
                }}>
                {/* Background image */}
                <Box
                    //component="img"
                    //src={amenitiesHeader}
                    alt="FAQ header image"
                    sx={{
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

                        // background color, gradient darkorange to orange
                        background: 'linear-gradient(45deg, #FF8E53 50%, #FE6B8B 100%)',

                    }}
                />
                {/* Text overlay */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        textAlign: 'center',
                    }}>
                    <Typography
                        variant="h4"
                        sx={{
                          fontSize: {
                            sm: '2.5em',
                            md: '2.5em',
                            lg: '3.2em',
                          },
                          fontFamily: 'Russo One, sans-serif',
                          color: 'black',
                          letterSpacing: '0.1em',
                          textAlign: 'center',
                          color: 'white',
                          textShadow: '0px 4px 0px #000000, 0px 4px 0px black',
                        }}>
                        SEASONAL AMENITIES
                    </Typography>
                </Box>
            </Box>
      <Grid container spacing={8} justifyContent="center">
        {amenities.map((amenity, index) => (
          <Grid
            item
            xs={12}
            md={10}
            lg={8}
            key={amenity.title}
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: index % 2 === 0 ? 'row' : 'row-reverse' },
            }}
          >
            <Box
              component="img"
              src={amenity.image}
              alt={amenity.title}
              sx={{
                width: '100%',
                height: 'auto',
                objectFit: 'cover',
                maxWidth: { md: '40%' },
                marginBottom: { xs: 2, md: 0 },
                marginRight: { xs: 0, md: index % 2 === 0 ? 4 : 0 },
                marginLeft: { xs: 0, md: index % 2 === 0 ? 0 : 4 },
                padding: 0,
                borderRadius: 4,

              }}
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                
                width: { md: '60%' },
                paddingLeft: { xs: 0, md: index % 2 === 0 ? 4 : 0 },
                paddingRight: { xs: 0, md: index % 2 === 0 ? 0 : 4 },

                // justify text to the right
                textAlign: { xs: 'center', md: 'left' },
                borderTop: { md: '2px solid darkorange' },
                
              }}
            >
              <Typography
                variant="h5"
                gutterBottom
                sx={{ fontWeight: 'bold', fontFamily: 'Bitter, serif' }}
              >
                {amenity.title}
                <span>
                  <Chip 
                  label="OPEN"
                  variant="outlined"
                  color="success"
                  sx={{ 
                    marginLeft: 2,
                    fontFamily: 'Russo One, sans-serif',
                    letterSpacing: 2,
                    border: '2px solid forestgreen',
                    marginBottom: 1,
                    }} 
                    />
                </span>
              </Typography>
              <Typography sx={{ fontFamily: 'Bitter, serif' }}>
                {amenity.description}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}