import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useNavigate } from 'react-router-dom';

const FileUpload = () => {
    const [fileInfo, setFileInfo] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileInfo(file);
        }
    };
    let navigate = useNavigate();
    const navigateToStyle = () => {
        navigate('/style');
    };

    return (
        <Box sx={{ width: '100%', maxWidth: 800, mx: 'auto', textAlign: 'center', mt: 8 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
            <Box
                sx={{
                    border: '2px dashed grey',
                    borderRadius: 2,
                    p: 4,
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                    marginBottom: 2, // Added margin bottom to separate the box and the button
                    position: 'relative' // Added position relative to the box
                }}
                onClick={() => document.getElementById('fileInput').click()}
            >
                <CloudUploadIcon sx={{ fontSize: 48, mb: 2 }} />
                <Typography variant="body1">Choose a file or drag it here</Typography>
                <input
                    id="fileInput"
                    type="file"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
            </Box>
            {fileInfo && (
                <Box sx={{ textAlign: 'left', mb: 2 }}>
                    <Typography variant="body1"><strong>File Name:</strong> {fileInfo.name}</Typography>
                    <Typography variant="body1"><strong>File Size:</strong> {fileInfo.size} bytes</Typography>
                    <Typography variant="body1"><strong>File Type:</strong> {fileInfo.type}</Typography>
                </Box>
            )}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                <Button
                    variant="contained"
                    onClick={navigateToStyle}
                    sx={{
                        maxWidth: '200px',
                        color: 'white',
                        backgroundColor: 'black',
                        borderRadius: '20px',
                        textTransform: 'none',
                        fontSize: '16px'
                    }}
                >
                    Next
                </Button>
            </Box>
        </Box>
    </Box>
    
    
    );
};

export default FileUpload;
