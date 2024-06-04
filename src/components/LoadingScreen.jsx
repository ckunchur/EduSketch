import React, { useState, useEffect } from 'react';
import { Box, Button, Card, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import '../index.css';
import { Commet } from 'react-loading-indicators';

export default function LoadingScreen() {


    return (
        <Stack spacing={2} sx={{ marginTop: 4, alignItems: 'center' }}>
            <Typography variant="h4" fontWeight="bold" mb={2}>
                Creating Your Storyboard...
            </Typography>
            <Typography variant="h6" mb={2}>
                Hang tight for a little bit! Generation can take 1-2 minutes.
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100vw', // Full width of the viewport
                    height: '100vh', // Full height of the viewport
                    position: 'fixed', // Ensure it stays in the center even if the content scrolls
                    top: 0,
                    left: 0
                }}
            >
                <Commet color="#46B1FF" size="large" text="" textColor="" />
            </Box>
        </Stack>


    );
};

