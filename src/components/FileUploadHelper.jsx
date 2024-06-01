// FileUpload.jsx
import React, { useState } from 'react';
import { Link, Box, Button, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { useNavigate } from 'react-router-dom';
import { getTextFromPDF } from '../openai/OpenAI.js'; // Import the function
// import PDFViewer from 'pdf-viewer-reactjs';


const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [fileUploaded, setFileUploaded] = useState(false);

  const [fileInfo, setFileInfo] = useState(null);
  const [pdfText, setPdfText] = useState('');

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFileInfo(selectedFile);
      setFile(URL.createObjectURL(selectedFile));
      setFileUploaded(true);
      const response = await getTextFromPDF(selectedFile);
      if (response.success) {
        setPdfText(response.text);
      } else {
        console.error('Error extracting text from PDF:', response.msg);
      }
    }
  };

  let navigate = useNavigate();
  const navigateToStyle = () => {
    navigate('/style', { state: { text: pdfText } });
  };

  return (
    <Box sx={{ width: '100%',mx: 'auto', textAlign: 'center', mt: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
        {!fileInfo ? (

          <Box
            sx={{
              border: '1px dashed grey',
              borderRadius: 2,
              p: 4,
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '80%',
              marginBottom: 2,
              position: 'relative'
            }}
            onClick={() => document.getElementById('fileInput').click()}
          >
            <FileUploadIcon sx={{ fontSize: 48, mb: 2 }} />
            <Typography variant="body1">Choose a file or drag it here</Typography>
            <input
              id="fileInput"
              type="file"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          </Box>
        ) : (
          <>
            {/* <PDFViewer
              document={{
                url: file,
              }}
              canvasCss="pdf-viewer-canvas"
              navbarOnTop
              hideRotation
            /> */}
            <Box
              sx={{
                border: '2px solid grey',
                borderRadius: 2,
                p: 4,
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '80%',
                marginBottom: 2,
                position: 'relative'
              }}>
              <Typography variant="h6" sx={{ paddingBottom: '4%' }}>Your file has been uploaded successfully!</Typography>
              <Typography variant="body1" sx={{ paddingBottom: '4%' }}><strong>File:</strong> {fileInfo.name}</Typography>

              <Link
                href="/file"
                underline="always"
                sx={{
                  fontSize: '16px',
                  cursor: 'pointer',


                }}
              >
                Choose a different file
              </Link>
              <CheckCircleIcon
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  fontSize: 48,
                  color: 'skyblue',
                }}
              />
            </Box>
          </>
        )
        }

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <Link
            href="/text"
            underline="always"
            sx={{
              fontSize: '16px',
              cursor: 'pointer',
            }}
          >
            or input some text instead
          </Link>

          <Button
            disabled={!pdfText}
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

        {pdfText && (
          <Accordion sx={{ width: '100%', mt: 4 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="body1"><strong>View Extracted Text</strong></Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                {pdfText}
              </Typography>
            </AccordionDetails>
          </Accordion>
        )}
      </Box>
    </Box>
  );
};

export default FileUpload;
