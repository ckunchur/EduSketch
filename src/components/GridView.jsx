import { React, useState, useEffect } from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Box, Stack, Button } from '@mui/material';
import AirplayIcon from '@mui/icons-material/Airplay';
import DownloadIcon from '@mui/icons-material/Download';
import RefreshIcon from '@mui/icons-material/Refresh';
import LightbulbCircleIcon from '@mui/icons-material/LightbulbCircle';
import { useNavigate, useLocation } from 'react-router-dom';
import { simplifyTopicsWithChatGPT, getComplexInfoFromTopic, imageGenApiCall } from '../openai/OpenAI';
import LoadingScreen from './LoadingScreen';


export default function GridView() {
    const location = useLocation();
    const { text, artDescription, readingLevel, numCaptions } = location.state || { text: '', artDescription: '', readingLevel: 3, numCaptions: 8};
    const [imageObjects, setImageObjects] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [dataFetched, setDataFetched] = useState(false);

    useEffect(() => {
        if (!dataFetched || imageObjects.length === 0) {
            const fetchData = async () => {
                try {
                    console.log("Text:", text);
                    console.log("Art Style Description:", artDescription);
                    console.log("Reading level:", readingLevel);
                    console.log("Num captions:", numCaptions);

                    console.log("dataFetched", dataFetched);

                    const captionsResponse = await simplifyTopicsWithChatGPT(text);
                    if (!captionsResponse.success) throw new Error(captionsResponse.msg);

                    const initialCaptions = captionsResponse.data;
                    
                    const imageResponse = await imageGenApiCall(initialCaptions, artDescription);
                    if (!imageResponse.success) throw new Error(imageResponse.msg);

                    const images = imageResponse.data.map((src, index) => ({
                        src,
                        caption: initialCaptions[index].shortCaption,
                        longerCaption: initialCaptions[index].longCaption
                    }));

                    setImageObjects(images);
                    setFlipped(Array(images.length).fill(false));
                    setDataFetched(true);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };

            fetchData();
        }
    }, [text, artDescription, dataFetched]);

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
        navigate('/slide', { state: { imageArray: imageObjects } });
    };

    return (
        <div>
          {!dataFetched ? (
            <LoadingScreen />
          ) : (
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
                    sx={{
                      color: 'white',
                      backgroundColor: 'black',
                      borderRadius: '20px',
                      textTransform: 'none',
                      fontSize: '14px'
                    }}
                  >
                    <AirplayIcon sx={{ marginRight: '12px' }} /> Slideshow
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
            top: 4,
            left: 4,
            backgroundColor: 'black',
            color: 'white',
            borderRadius: '50%',
            width: '24px',
            height: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Typography variant="caption">{index + 1}</Typography>
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
              height="180"
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
                <img
                  src={'mouse-speech-bubble.png'}
                  alt="image of blue cartoon mouse in bottom left of screen"
                  style={{ marginLeft: '8px', width: '100%' }}
                />
              </Box>
            </Stack>
          )}
        </div>
      );
      }
