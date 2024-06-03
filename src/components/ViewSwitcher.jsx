import { React, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { simplifyTopicsWithChatGPT, imageGenApiCall, createTitle } from '../openai/OpenAI';
import { Button, Stack, Typography, Box } from '@mui/material';
import GridViewIcon from '@mui/icons-material/GridView';
import AirplayIcon from '@mui/icons-material/Airplay';
import DownloadIcon from '@mui/icons-material/Download';
import RefreshIcon from '@mui/icons-material/Refresh';

import LoadingScreen from './LoadingScreen';
import GridView from './GridView';
import SlideView from './SlideView';

export default function ViewSwitcher() {
    const location = useLocation();
    const { text, artDescription, readingLevel, numCaptions } = location.state || { text: '', artDescription: '', readingLevel: 3, numCaptions: 8 };
    const [imageObjects, setImageObjects] = useState([]);
    const [dataFetched, setDataFetched] = useState(false);
    const [gridView, setGridView] = useState(true);
    const [title, setTitle] = useState("Welcome to Your Storyboard!");
    useEffect(() => {
        if (!dataFetched || imageObjects.length === 0) {
            const fetchData = async () => {
                try {

                    const captionsResponse = await simplifyTopicsWithChatGPT(text, readingLevel, numCaptions);
                    if (!captionsResponse.success) throw new Error(captionsResponse.msg);

                    const initialCaptions = captionsResponse.data;

                    const titleResponse = await createTitle(text);
                    if (!titleResponse.success) throw new Error(titleResponse.msg);
                    const generatedTitle = titleResponse.data; 

                    const imageResponse = await imageGenApiCall(initialCaptions, artDescription);
                    if (!imageResponse.success) throw new Error(imageResponse.msg);

                    const images = imageResponse.data.map((src, index) => ({
                        src,
                        caption: initialCaptions[index].shortCaption,
                        longerCaption: initialCaptions[index].longCaption
                    }));

                    setImageObjects(images);
                    setTitle(generatedTitle);
                    // setFlipped(Array(images.length).fill(false));
                    setDataFetched(true);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };

            fetchData();
        }
    }, []);


    let navigate = useNavigate();
    const navigateToHome = () => {
        navigate('/');
    };



    if (!dataFetched) {
        return <LoadingScreen />;
    }

    return (
        <>
            {/* Left Column Buttons */}
            <Stack spacing={2} sx={{ marginTop: 4, alignItems: 'center' }}>
                <Typography variant="h4" fontWeight="bold" mb={2}>
                   {title}
                </Typography>
                {/* <Typography variant="h6">
                   View your story below. Click on a picture to learn more! 
                </Typography> */}
                <Box sx={{ display: 'flex' }}>
                <Stack spacing={2} sx={{ marginLeft: 2, marginRight: 8 }}>
                        <Button
                            variant="contained"
                            onClick={() => setGridView(!gridView)}
                            sx={{
                                color: 'white',
                                backgroundColor: 'black',
                                borderRadius: '20px',
                                textTransform: 'none',
                                fontSize: '14px'
                            }}
                        >
                            {gridView ? <AirplayIcon sx={{ marginRight: '12px' }} /> : <GridViewIcon sx={{ marginRight: '12px' }} />}
                            {gridView ? 'Slide View' : 'Grid View'}
                        </Button>
                        <Button
                            variant="contained"
                            sx={{
                                color: 'white',
                                backgroundColor: 'black',
                                borderRadius: '20px',
                                textTransform: 'none',
                                fontSize: '14px'
                            }}
                        >
                            <DownloadIcon sx={{ marginRight: '12px' }} /> Download
                        </Button>
                        <Button
                            onClick={navigateToHome}
                            variant="contained"
                            sx={{
                                color: 'white',
                                backgroundColor: 'black',
                                borderRadius: '20px',
                                textTransform: 'none',
                                fontSize: '14px',
                                whiteSpace: 'nowrap', // Prevent text wrapping
                                width: '160px'
                            }}
                        >
                            <RefreshIcon sx={{ marginRight: '12px' }} /> Create New
                        </Button>
                    </Stack>

                    {/* Main Content */}
                    {gridView ? (
                        <GridView imageObjects={imageObjects} />
                    ) : (
                        <SlideView imageObjects={imageObjects} />
                    )}
                </Box>
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 16,
                        left: 0,
                        width: '250px', // Adjust the width to scale the image
                        height: 'auto' // Maintain aspect ratio
                    }}
                >
                    <img
                        src={'mouse-speech-bubble.png'}
                        alt="image of blue cartoon mouse in bottom left of screen"
                        style={{ marginLeft: '8px', width: '100%' }}
                    />
                </Box>
            </Stack>
        </>
    );
}