import React from 'react';
import { Link, Button, Box, Card, CardActions, IconButton, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FileUpload from './FileUploadHelper';
export default function UploadFile() {


    let navigate = useNavigate();
    const navigateToStyle = () => {
        navigate('/style');
    };


    return (
        <Stack spacing={2} sx={{ marginTop: 4, alignItems: 'center' }}>
            <Typography variant="h4" fontWeight="bold" mb={2}>
                Let's get started!
            </Typography>
            <Typography variant="h6" mb={2}>
                Upload a file or input some text to begin creating your storyboard.
            </Typography>
            <img src='loading-bar-1.png' alt="loading bar on step 1" style={{ width: '60%' }} />


            <Box sx={{ display: 'flex', justifyContent: 'center', width: '80%' }}>

                <FileUpload ></FileUpload>

            </Box>
           


            

        </Stack>

    );
}