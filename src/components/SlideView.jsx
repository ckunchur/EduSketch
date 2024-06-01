import React, { useState } from 'react';
import { Box, Button, Card, CardContent, CardMedia, Stack, Typography } from '@mui/material';

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import GridViewIcon from '@mui/icons-material/GridView';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import { useNavigate, useLocation } from 'react-router-dom';



export default function SlideView() {
  const location = useLocation();
  const { imageArray } = location.state;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [flipped, setFlipped] = useState(Array(imageArray.length).fill(false));

  const handleFlip = () => {
    const newFlipped = [...flipped];
    newFlipped[currentSlide] = !newFlipped[currentSlide];
    setFlipped(newFlipped);
  };

  const navigate = useNavigate();
  const navigateToGridView = () => {
    navigate('/grid', { state: { imageArray: imageArray } });
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : imageArray.length - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev < imageArray.length - 1 ? prev + 1 : 0));
  };

  return (
    <Stack spacing={2} sx={{ marginTop: 4, alignItems: 'center' }}>
      <Typography variant="h6">
        Part {currentSlide + 1} of {imageArray.length}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <Button onClick={handlePrev} sx={{ position: 'absolute', left: 0, color: 'black', fontSize: '48px' }} disabled={currentSlide === 0}
        >
          <KeyboardArrowLeftIcon fontSize="inherit" />
        </Button>

        <Card sx={{ width: '60%', cursor: 'pointer', minHeight: '400px' }} onClick={handleFlip}>
          {flipped[currentSlide] ? (
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <LightbulbIcon sx={{ marginBottom: '8px' }} />
              <Typography variant="body2" color="textSecondary" align="center">
                {imageArray[currentSlide].longerCaption}
              </Typography>
            </CardContent>
          ) : (
            <CardMedia
              component="img"
              sx={{ height: '400px' }}
              image={imageArray[currentSlide].src}
              alt={imageArray[currentSlide].caption}
            />
          )}
        </Card>

        <Button
          onClick={handleNext}
          disabled={currentSlide === imageArray.length - 1}
          sx={{ position: 'absolute', right: 0, color: 'black', fontSize: '48px' }}>
          <KeyboardArrowRightIcon fontSize="inherit" />
        </Button>
      </Box>
      {!flipped[currentSlide] && (
        <Typography variant="body2" color="textSecondary" align="center" sx={{ width: '80%', marginTop: 2 }}>
          {imageArray[currentSlide].caption}
        </Typography>
      )}
      <Button variant="contained" onClick={navigateToGridView} sx={{ color: 'white', backgroundColor: 'black', borderRadius: '20px', textTransform: 'none', fontSize: '14px' }}>
        <GridViewIcon /> Switch to Grid View
      </Button>

      <Box
        sx={{
          position: 'absolute',
          bottom: 16,
          left: 0,
          width: '20%', // Adjust the width to scale the image
          height: 'auto' // Maintain aspect ratio
        }}
      >
        <img src={'mouse-speech-bubble.png'} alt="image of blue cartoon mouse in bottom left of screen" style={{ marginLeft: '8px', width: '100%' }} />
      </Box>
    </Stack>


  );
};

