import React, { useState } from 'react';
import { Box, Button, Card, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import LightbulbCircleIcon from '@mui/icons-material/LightbulbCircle';



export default function SlideView({ imageObjects }) {

  const [currentSlide, setCurrentSlide] = useState(0);
  const [flipped, setFlipped] = useState(Array(imageObjects.length).fill(false));

  const handleFlip = () => {
    const newFlipped = [...flipped];
    newFlipped[currentSlide] = !newFlipped[currentSlide];
    setFlipped(newFlipped);
  };



  const handlePrev = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : imageObjects.length - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev < imageObjects.length - 1 ? prev + 1 : 0));
  };

  return (
    <div>
      
      <Box sx={{ position: 'absolute', top: 200, right: 56, padding: '8px' }}>
        <Typography variant="h5">
          Part {currentSlide + 1} of {imageObjects.length}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', marginTop: '50px' }}>
        <Button onClick={handlePrev} sx={{ color: 'black', fontSize: '48px' }} disabled={currentSlide === 0}>
          <KeyboardArrowLeftIcon fontSize="inherit" />
        </Button>
        <Card sx={{ cursor: 'pointer', height: '600px', width: '800px' }} onClick={handleFlip}>
          {flipped[currentSlide] ? (
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', width: '95%' }}>
              <LightbulbCircleIcon sx={{ marginBottom: '8px', fontSize: '48px' }} />
              <Typography variant="h6" color="textSecondary" align="center">
                {imageObjects[currentSlide].longerCaption}
              </Typography>
            </CardContent>
          ) : (
            <CardMedia
              component="img"
              sx={{ height: '100%', width: '100%' }}
              image={imageObjects[currentSlide].src}
              alt={imageObjects[currentSlide].caption}
            />
          )}
        </Card>
        <Button
          onClick={handleNext}
          disabled={currentSlide === imageObjects.length - 1}
          sx={{ color: 'black', fontSize: '48px' }}
        >
          <KeyboardArrowRightIcon fontSize="inherit" />
        </Button>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
        <Typography variant="h6" color="textSecondary" align="center" sx={{ width: '80%' }}>
          {imageObjects[currentSlide].caption}
        </Typography>
      </Box>
      
 
    </div>


  );
};

