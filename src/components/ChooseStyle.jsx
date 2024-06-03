import React, { useState } from 'react';
import { Button, Box, Stack, Typography, TextField, Slider, Tooltip, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InfoIcon from '@mui/icons-material/Info';

export default function ChooseStyle() {
    const [selectedImage, setSelectedImage] = useState(null); // Correct variable name for state
    const [description, setDescription] = useState('');
    const [numCaptions, setNumCaptions] = useState(8);
    const [readingLevel, setReadingLevel] = useState(3);
    const location = useLocation();
    const { text } = location.state || { text: '' };

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

    const readingLevels = [
        { value: 1, label: '1st' },
        { value: 2, label: '2nd' },
        { value: 3, label: '3rd' },
        { value: 4, label: '4th' },
        { value: 5, label: '5th' },
        { value: 6, label: '6th' },
        { value: 7, label: '7th' },
        { value: 8, label: '8th' },
    ];


    let navigate = useNavigate();
    const navigateToGrid = () => {
        navigate('/board', { state: { text: text, artDescription: description, readingLevel: readingLevel, numCaptions: numCaptions } });
    };

    const handleBackClick = () => {
        navigate(-1); // Go back to the previous page
    };


    function valuetext(value) {
        return `${value}`;
    }

    const handleClick = (index, description) => {
        setSelectedImage(index); // Use correct state setter
        setDescription(description);
    };

    const handleReadingLevelChange = (event) => {
        setReadingLevel(event.target.value);
    };

    const handleNumCaptionsChange = (event) => {
        setNumCaptions(event.target.value);
    };
    return (
        <Stack spacing={2} sx={{ marginTop: 4, alignItems: 'center' }}>
            <Typography variant="h4" fontWeight="bold" mb={2}>
                Customize your storyboard!
            </Typography>
            <Typography variant="h6" mb={2}>
                Use the options below to tailor the story to fit your needs.
            </Typography>
            <img src='loading-bar-2.png' alt="loading bar on step 2" style={{ width: '60%' }} />
            <Typography variant="h6" mb={2}>
                What art style do you want the final story to be in?
            </Typography>
            <Stack direction="row" spacing={2} justifyContent="center" paddingBottom="16px">
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
            <Box width="60%">
                <Typography variant="h6" mb={2}>
                    What reading level should the story be at?
                </Typography>
                <Slider
                    onChange={handleReadingLevelChange}
                    value={readingLevel}
                    aria-label="Restricted values"
                    defaultValue={3}
                    getAriaValueText={valuetext}
                    step={null}
                    valueLabelDisplay="auto"
                    marks={readingLevels}
                    track={false}
                    min={1}
                    max={8}
                />
            </Box>
            <Box width="60%" textAlign="center" display="flex" flexDirection="column" alignItems="center">
                <Box display="flex" alignItems="center" mb={2} justifyContent="center">
                    <Typography variant="h6" mr={1}>
                        How many parts should the story be?
                    </Typography>
                    <Tooltip title="Recommended 8-10 for ~1 min generation times.">
                        <IconButton>
                            <InfoIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
                <TextField
                    type="number"
                    value={numCaptions}
                    onChange={handleNumCaptionsChange}
                    inputProps={{ min: 1, max: 8 }}
                    sx={{ width: '30%' }}
                />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '60%', mt: 8 }}>
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
                    <ArrowBackIcon sx={{ marginRight: '12px' }} /> Back
                </Button>
                <Button
                    disabled={selectedImage === null} // Use null check for disabled condition
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
