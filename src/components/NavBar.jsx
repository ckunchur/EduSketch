
import React from 'react';
import { IconButton, Button, Typography, Toolbar, AppBar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function NavBar() {
    let navigate = useNavigate();
    const navigateToHome = () => {
        navigate('/');
    };


    return (
        <AppBar position="static" style={{ color: 'white', backgroundColor: 'black' }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'center' }}>
                <img src={'edusketch-logo.png'}
                    alt="edusketch logo"
                    onClick={navigateToHome}
                    style={{ cursor: 'pointer' }}
                />

            </Toolbar>
        </AppBar>
    );
}