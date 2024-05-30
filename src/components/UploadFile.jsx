import React from 'react';
import { Button, Box, Card, CardActions, IconButton, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FileUpload from './FileUpload';
export default function UploadFile() {


    let navigate = useNavigate();
    const navigateToStyle = () => {
        navigate('/style');
    };


    return (
        <Stack spacing={2} sx={{ marginTop: 4, alignItems: 'center' }}>
            <Typography variant="h4" fontWeight="bold" mb={2}>
                Choose your content!
            </Typography>
            <Typography variant="h6" mb={2}>
              Upload a file or input text to create a storyboard from.
            </Typography>
         
            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>

           <FileUpload ></FileUpload>

           </Box>
           
                
            <Box
                sx={{
                    position: 'absolute',
                    bottom: 16,
                    left: 16,
                    width: '20%', // Adjust the width to scale the image
                    height: 'auto' // Maintain aspect ratio
                }}
            >
                <img src={'eddy.png'} alt="image of blue cartoon mouse in bottom left of screen" style={{ width: '100%' }} />
            </Box>
           

        </Stack>

    );
}