import {React, useState} from 'react';
import { Button, Box, Card, CardActions, IconButton, Stack, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function ChooseStyle() {
    const [selectedImage, setSelectedStyle] = useState(null);
    const [description, setDescription] = useState('');

    const location = useLocation();
    const { text } = location.state || { text: '' }; 

    let navigate = useNavigate();
    const navigateToGrid = () => {
        navigate('/grid', { state: { text: text, artDescription: description } });
      };
      const handleBackClick = () => {
        navigate(-1); // Go back to the previous page
      };

    const images = [
        {
            src: 'bear-cartoon.png',
            alt: 'Cartoon drawing of bears finding Goldilocks',
            description: 'vibrant and cartoon-like, suitable for a children storybook. The color palette is bright and warm, with rich, saturated colors that draw the viewers attention, detailed yet maintains a simple and clean look, making it visually appealing and easy to understand for children. The rounded corners and soft edges contribute to the friendly and approachable feel of the artwork.'
        },
        {
            src: 'warm-digital-animation.png',
            alt: 'Yellow tinted image of Goldilocks eating porridge.',
            description: 'A digital animated style that is whimsical and charming, often found in childrens storybooks. The overall color palette is warm and inviting, with soft, rounded edges and a high level of detail that adds to the enchanting and fairy-tale-like atmosphere.'
        },
        {
            src: 'warm-yellow-sketch.png',
            alt: 'Warm yellow sketch of girl with long golden flowing hair.',
            description: 'beautifully detailed and delicate illustration that evokes a sense of classic storybook charm. The lines are finely drawn.'
        }
    ];

    const handleClick = (index, description) => {
        setSelectedStyle(index);
        setDescription(description);
    };

    return (
        <Stack spacing={2} sx={{ marginTop: 4, alignItems: 'center' }}>
            <Typography variant="h4" fontWeight="bold" mb={2}>
                Choose an art style!
            </Typography>
            <Typography variant="h6" mb={2}>
            What art style do you want your final story to be in?
         </Typography>
         <img src='loading-bar-2.png' alt="loading bar on step 2" style={{ width: '60%' }} />

         <Stack direction="row" spacing={2} justifyContent="center">
         {images.map((image, index) => (
                    <Box
                        key={index}
                        onClick={() => handleClick(index, image.description)}
                        sx={{
                            position: 'relative',
                            cursor: 'pointer',
                            width: '20%',
                            borderRadius: '32px',
                            boxShadow: selectedImage === index ? '0 0 20px #46B1FF' : 'none',
                            overflow: 'hidden'
                        }}
                    >
                        <img src={image.src} alt={image.alt} style={{ width: '100%' }} />
                        {selectedImage === index && (
                            <CheckCircleIcon
                                sx={{
                                    position: 'absolute',
                                    top: 8,
                                    right: 8,
                                    color: '#46B1FF',
                                    backgroundColor: 'white',
                                    borderRadius: '50%'
                                }}
                            />
                        )}
                    </Box>
                ))}
        </Stack>
        {/* {description && <p>{description}</p>} */}


        <Box sx={{ display: 'flex', justifyContent: 'space-between',  alignItems: 'center', width: '60%', mt: 8 }}>
         
         
        <Button
            variant="contained"
            onClick={handleBackClick}
            sx={{
              color: 'white',
              width: '200px',
              backgroundColor: 'black',
              borderRadius: '20px',
              textTransform: 'none',
              fontSize: '16px',

            }}
          >
            <ArrowBackIcon sx={{marginRight: '12px'}}/> Back
          </Button>
          <Button
          disabled={!selectedImage}
            variant="contained"
            onClick={navigateToGrid}
            sx={{
              color: 'white',
              width: '200px',
              backgroundColor: 'black',
              borderRadius: '20px',
              textTransform: 'none',
              fontSize: '16px',

            }}
          >
            Next
          </Button>
        </Box>
           
        </Stack>

    );
}