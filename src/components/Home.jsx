import React from 'react';
import { Button, Box, Card, CardActions, IconButton, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Home() {


    let navigate = useNavigate();
    const navigateToUploadFile = () => {
        navigate('/file');
    };


    return (
        <Stack spacing={2} sx={{ marginTop: 4, alignItems: 'center' }}>
            <Typography variant="h4">
                Turn learning into an adventure
            </Typography>
            <Typography variant="h6">
                Create custom storyboards from educational content.
            </Typography>
            <Box sx={{ width: '90%' }}>

            
            <img src={'home-screen-image.png'}  style={{ width: '100%', height: 'auto' }} alt="home screen image showing history text book, blue mouse, and storyboard" />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Button
            variant="contained"
            onClick={navigateToUploadFile}
            sx={{
              color: 'white',
              width: '200px',
              backgroundColor: 'black',
              borderRadius: '20px',
              textTransform: 'none',
              fontSize: '16px',

            }}
          >
                    Get Started
                </Button>
            </Box>
        </Stack>

    );
}