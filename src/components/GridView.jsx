import { React, useState, useEffect } from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Box, Stack, Button } from '@mui/material';
import LightbulbCircleIcon from '@mui/icons-material/LightbulbCircle';


export default function GridView({ imageObjects }) {
    const [flipped, setFlipped] = useState(Array(imageObjects.length).fill(false));

    const handleFlip = (index) => {
        const newFlipped = [...flipped];
        newFlipped[index] = !newFlipped[index];
        setFlipped(newFlipped);
    };


    return (
        <div>



            {/* Image Grid */}
            <Box sx={{ flexGrow: 1, overflowY: 'scroll', maxHeight: '80vh', marginRight: '12px' }}>
                <Grid container spacing={2}>
                    {imageObjects.map((image, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
                            <Card
                                sx={{
                                    position: 'relative',
                                    borderRadius: '16px',
                                    marginBottom: '8px',
                                    cursor: 'pointer',
                                    height: '300px', // Set a fixed height for the card
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                }}
                                onClick={() => handleFlip(index)}
                            >
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        bottom: 4,
                                        left: 4,
                                        backgroundColor: 'black',
                                        color: 'white',
                                        borderRadius: '50%',
                                        borderColor: 'white',
                                        width: '28px',
                                        height: '28px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Typography variant="h6">{index + 1}</Typography>
                                </Box>
                                {flipped[index] ? (
                                    <CardContent
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flex: '1 0 auto', // Ensure it takes up available space
                                            textAlign: 'center',
                                        }}
                                    >
                                        <LightbulbCircleIcon />
                                        <Typography variant="body2" color="textSecondary" sx={{ padding: '4px' }}>
                                            {image.longerCaption}
                                        </Typography>
                                    </CardContent>
                                ) : (
                                    <>
                                        <CardMedia
                                            component="img"
                                            height="220"
                                            image={image.src}
                                            alt={image.caption}
                                            sx={{
                                                flexShrink: 0, // Prevent the image from shrinking
                                            }}
                                        />
                                        <CardContent
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                flex: '1 0 auto', // Ensure it takes up available space
                                                textAlign: 'center',
                                            }}
                                        >
                                            <Typography variant="body2" color="textSecondary">
                                                {image.caption}
                                            </Typography>
                                        </CardContent>
                                    </>
                                )}
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                


            </Box>
        

        </div>
    );
}
