import React from 'react';
import { Button, Box, Card, CardActions, IconButton, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function ChooseStyle() {


    let navigate = useNavigate();
    const navigateToGrid = () => {
        navigate('/');
    };


    return (
        <Stack spacing={2} sx={{ marginTop: 4 }}>
            <Typography>
                Choose style page

            </Typography>
           
        </Stack>

    );
}