import React, { useState } from 'react';
import { Button, Box, Card, CardActions, IconButton, Link, Stack, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';


export default function TextEntry() {
    const [entryText, setEntryText] = useState(null);

    const handleTextChange = (event) => {
        setEntryText(event.target.value);
    };
    let navigate = useNavigate();
    const navigateToStyle = () => {
        navigate('/style', { state: { text: entryText } });
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


            {/* <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}> */}
                <TextField
                    placeholder="Your text here..."
                    multiline
                    rows={15}
                    variant="outlined"
                    value={entryText}
                    onChange={handleTextChange}
                    sx={{
                        width: '60%',
                      
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '16px', // Adjust border radius to match the rounded corners
                        },
                    }}
                />
                   
       
            {/* </Box> */}
            {/* <Link
                    href="/file"
                    underline="always"
                    sx={{
                        fontSize: '16px',
                        cursor: 'pointer',
                    }}
                >
                    or upload a file instead
                </Link> */}


            <Box
                sx={{
                    position: 'absolute',
                    bottom: 16,
                    left: 0,
                    width: '20%', // Adjust the width to scale the image
                    height: 'auto' // Maintain aspect ratio
                }}
            >
                {/* <img src={'eddy.png'} alt="image of blue cartoon mouse in bottom left of screen" style={{ width: '80%' }} /> */}
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '60%' }}>
          <Link
            href="/file"
            underline="always"
            sx={{
              fontSize: '16px',
              cursor: 'pointer',
            }}
          >
            or upload a file instead.
          </Link>

          <Button
            disabled={!entryText}
            variant="contained"
            onClick={navigateToStyle}
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