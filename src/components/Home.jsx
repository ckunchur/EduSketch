import React from 'react';
import { Button, Box, Card, CardActions, IconButton, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Home() {


    let navigate = useNavigate();
    const navigateToUploadFile = () => {
        navigate('/file');
    };


    return (
        <Stack  sx={{ marginTop: 4, }}>
            <Typography variant="h3">
                Turn learning into an adventure
            </Typography>
            <Typography variant="h6">
                Create custom storyboards from educational content.
            </Typography>
            <img src={'home-screen-image.png'} alt="home screen image showing history text book, blue mouse, and storyboard" />
            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={navigateToUploadFile}
                    style={{
                        color: 'white',
                        backgroundColor: 'black',
                        fontSize: '25px',
                        textTransform: 'none',
                        fontWeight: "bold",
                        borderRadius: '50px' // or any desired value
                    }}
                >
                    Get Started
                </Button>
            </Box>
        </Stack>

    );
}