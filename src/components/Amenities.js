// src/components/Amenities.js
import React from 'react';
import { Box, Grid, Typography, Button } from '@mui/material';

const amenities = [
  {
    title: 'Ice Rink',
    description:
      'Enjoy our state-of-the-art ice rink, perfect for a day of family fun or a romantic date night. We provide skate rentals and offer skating lessons for all ages and skill levels.',
    image: './images/ice_rink.jpg',
  },
  {
    title: 'Talbot\'s Tavern',
    description:
      'Unwind at our cozy bar and lounge area after a day of adventure. Sample our carefully curated selection of local and international beverages, or enjoy a delicious meal prepared by our talented chefs.',
    image: './images/bar_lounge.jpg',
  },
  {
    title: 'Hot Springs Pool',
    description:
      'Experience the largest hot springs pool in America! Immerse yourself in the soothing warm waters, surrounded by stunning mountain views. Perfect for relaxation and rejuvenation.',
    image: './images/hot_springs.jpg',
  },
];


export default function Amenities() {
  return (
    <Box sx={{ flexGrow: 1, padding: 4, backgroundColor: 'white' }}>
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        sx={{ marginBottom: 4, fontFamily: 'Russo One, sans-serif' }}
      >
        SOMETHING FOR EVERYONE
      </Typography>
      <br></br>
      <br></br>
      <br></br>
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
                


                
              }}
            >
              <Typography
                variant="h5"
                gutterBottom
                sx={{ fontWeight: 'bold', fontFamily: 'Bitter, serif' }}
              >
                {amenity.title}
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