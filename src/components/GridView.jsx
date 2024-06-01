import { React, useState } from 'react';
import { Grid, Card, CardContent, Link, CardMedia, Typography, Box, Stack, Button } from '@mui/material';
import AirplayIcon from '@mui/icons-material/Airplay'; import DownloadIcon from '@mui/icons-material/Download';
import RefreshIcon from '@mui/icons-material/Refresh';
import LightbulbCircleIcon from '@mui/icons-material/LightbulbCircle';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export default function GridView() {

    const location = useLocation();
    const { text, artDescription } = location.state || { text: '', artDescription: '' };
    const { generatedImageObjects, setImageObjects } = useState(null);

    // TO DO: pass in text and art description into gpt call and setImageObjects
    // returned gpt output should be in the format of imageArray below 


    // placeholder, delete and use generatedImages when gpt function working
    const imageArray = [
        { src: 'test-image.png', caption: 'Ancient people migrated from Asia, traveling across the Bering Strait.', longerCaption: 'Thousands of years ago, ancient people migrated from Asia into North America by crossing a land bridge that once spanned what is now the Bering Strait. This migration allowed them to spread throughout North and South America, carrying their cultures and adapting to new environments.' },
        { src: 'test-image.png', caption: 'Indigenous peoples across North America adapted to their environments.', longerCaption: 'Indigenous peoples, descended from early Asian migrants, adapted to various environments across North America. For example, tribes in the Great Plains relied on buffalo for sustenance, while those in the Arctic depended on ice, seals, and whales for survival.' },
        { src: 'test-image.png', caption: 'In the 1500s, Spanish explorers reintroduced horses to North America.', longerCaption: 'The reintroduction of horses by Spanish explorers in the 1500s transformed many Indigenous cultures in North America. Horses enhanced mobility, allowing tribes to travel long distances quickly, carry supplies, and hunt more effectively.' },
        { src: 'test-image.png', caption: 'Around 1,000 years ago, Vikings led by Leif Erickson arrived in North America.', longerCaption: 'Approximately 1,000 years ago, Viking explorers led by Leif Erickson reached North America, where they established a temporary settlement known as Vinland. This camp, located on Newfoundland, was notable for its grapevines, which inspired its name.' },
        { src: 'test-image.png', caption: 'During the Crusades, Europeans discovered and marveled at exotic goods.', longerCaption: 'The Crusades, fought between 1100 and 1300, exposed Europeans to exotic goods and cultures from the Middle East and Asia. This exposure ignited a desire for exploration and trade, eventually leading to the Age of Exploration.' },
        { src: 'test-image.png', caption: 'Early European explorers ventured into unknown waters.', longerCaption: 'Early European explorers navigated uncharted seas using the stars and basic tools such as the compass and cross-staff. These primitive navigation aids helped them determine direction and latitude, though they still faced many perils at sea.' },
        { src: 'test-image.png', caption: 'The Age of Exploration marked the expansion of European influence.', longerCaption: 'Throughout the Age of Exploration, cartographers used the information collected by explorers to create more accurate maps of the world, facilitating further exploration and expansion of European influence.' },
        { src: 'test-image.png', caption: 'Global trade routes established during this period connected continents.', longerCaption: 'In contemporary times, students utilize advanced technologies such as GPS to learn about the historical impact of global trade routes established during the Age of Exploration, which connected continents and facilitated cultural exchange.' },
    ];





    const [flipped, setFlipped] = useState(Array(imageArray.length).fill(false));

    const handleFlip = (index) => {
        const newFlipped = [...flipped];
        newFlipped[index] = !newFlipped[index];
        setFlipped(newFlipped);
    };

    let navigate = useNavigate();
    const navigateToHome = () => {
        navigate('/');
    };
  

    const navigateToSlideView = () => {
        navigate('/slide', { state: { imageArray: imageArray} });
      };

    return (
        <Stack spacing={2} sx={{ marginTop: 4, alignItems: 'center' }}>
            <Typography variant="h4" fontWeight="bold" mb={2}>
                Your Storyboard
            </Typography>
            <Box sx={{ display: 'flex' }}>
                {/* Left Column Buttons */}
                <Stack spacing={2} sx={{ marginLeft: 2, marginRight: 8 }}>

                    <Button
                        variant="contained"
                        onClick={navigateToSlideView}
                        sx={{ color: 'white', backgroundColor: 'black', borderRadius: '20px', textTransform: 'none', fontSize: '14px' }}>
                        <AirplayIcon sx={{ marginRight: '12px' }} /> Slideshow
                    </Button>

                    <Button variant="contained" sx={{ color: 'white', backgroundColor: 'black', borderRadius: '20px', textTransform: 'none', fontSize: '14px' }}>
                        <DownloadIcon sx={{ marginRight: '12px' }} /> Download
                    </Button>
                    <Button
                        onClick={navigateToHome}
                        variant="contained"
                        sx={{
                            color: 'white', backgroundColor: 'black', borderRadius: '20px', textTransform: 'none', fontSize: '14px', whiteSpace: 'nowrap', // Prevent text wrapping
                            width: '160px'
                        }}>
                        <RefreshIcon sx={{ marginRight: '12px' }} /> Create New
                    </Button>
                </Stack>

                {/* Image Grid */}
                <Box sx={{ flexGrow: 1, overflowY: 'scroll', maxHeight: '80vh', marginRight: '12px' }}>
                    <Grid container spacing={2}>
                        {imageArray.map((image, index) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                                <Card
                                    sx={{ position: 'relative', borderRadius: '16px', marginBottom: '8px', cursor: 'pointer' }}
                                    onClick={() => handleFlip(index)}
                                >
                                    <Box sx={{ position: 'absolute', top: 4, left: 4, backgroundColor: 'black', color: 'white', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Typography variant="caption">{index + 1}</Typography>
                                    </Box>
                                    {flipped[index] ? (
                                        <CardContent >
                                            <LightbulbCircleIcon></LightbulbCircleIcon>
                                            <Typography variant="body2" color="textSecondary" sx={{ padding: '4px' }}>
                                                {image.longerCaption}
                                            </Typography>
                                        </CardContent>
                                    ) : (
                                        <>
                                            <CardMedia
                                                component="img"
                                                height="140"
                                                image={image.src}
                                                alt={image.caption}
                                            />
                                            <CardContent>
                                                <Typography variant="body2" color="textSecondary" >
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
            </Box>
            <Box
                sx={{
                    position: 'absolute',
                    bottom: 16,
                    left: 0,
                    width: '20%', // Adjust the width to scale the image
                    height: 'auto' // Maintain aspect ratio
                }}
            >
                <img src={'mouse-speech-bubble.png'} alt="image of blue cartoon mouse in bottom left of screen" style={{ marginLeft: '8px', width: '100%' }} />
            </Box>


        </Stack>
    );
}