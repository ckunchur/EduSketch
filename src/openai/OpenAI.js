import axios from 'axios';
import { captions_json_prompt, storyboard_title } from './prompts.js';
import * as pdfjsLib from 'pdfjs-dist/build/pdf.min.mjs';
import 'pdfjs-dist/build/pdf.worker.min.mjs';


// const OPENAI_API_KEY = process.env.REACT_OPENAI_API_KEY;
const OPENAI_API_KEY = "sk-proj-q8taqJvSjo1yechfuIFOT3BlbkFJPKjowFC8Wv7hOpicv4gL"

const client = axios.create({
  baseURL: 'https://api.openai.com/v1',
  headers: {
    "Authorization": `Bearer ${OPENAI_API_KEY}`,
    "Content-Type": "application/json"
  }
});

const chatgptUrl = 'https://api.openai.com/v1/chat/completions';
const dalleUrl = 'https://api.openai.com/v1/images/generations';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export const getTextFromPDF = async (file) => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let textContent = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContentPage = await page.getTextContent();
      const pageText = textContentPage.items.map(item => item.str).join(' ');
      textContent += pageText + ' ';
    }

    return { success: true, text: textContent };
  } catch (error) {
    console.error('Error parsing PDF:', error);
    return { success: false, msg: error.message };
  }
};

const parseResponse = (response) => {
  return response.split('\n').map(line => line.replace(/^- /, '').trim()).filter(line => line.length > 0);
};

export const simplifyTopicsWithChatGPT = async (text, grade_level, num_captions) => {
  console.log("grade level", grade_level);
  console.log("num_captions", num_captions);
  let prompt = `Using the passed in text, create a summary that consists of ${num_captions} caption pairs that do a good job of covering the main ideas of the information. The captions should be at a ${grade_level} grade reading level.` + captions_json_prompt + "Context:" + text;
  try {
    const res = await client.post(chatgptUrl, {
      model: "gpt-4o",
      messages: [
        {
          role: 'system',
          content: prompt
        },
        {
          role: 'user',
          content: text
        }
      ]
    });

    let answerString = res.data.choices[0].message.content.trim();
    let imageCaptions;
    
    try {
      console.log(answerString)
      imageCaptions = JSON.parse(answerString);
    } catch (jsonError) {
      console.log('Invalid response:', jsonError);
      return { success: false, msg: 'Invalid response from OpenAI' };
    }

    return { success: true, data: imageCaptions };
  } catch (err) {
    console.log('error: ', err);
    return { success: false, msg: err.message };
  }
};

export const createTitle = async (text, ) => {
  let prompt = storyboard_title + text;
  try {
    const res = await client.post(chatgptUrl, {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: 'system',
          content: prompt
        },
        {
          role: 'user',
          content: text
        }
      ]
    });

    let answerString = res.data.choices[0].message.content.trim();
    let title;
    try {
      title = parseResponse(answerString)[0];
      console.log(title)

    } catch (jsonError) {
      console.log('Invalid response:', jsonError);
      return Promise.resolve({ success: false, msg: 'Invalid response from OpenAI' });
    }

    return Promise.resolve({ success: true, data: title });
  } catch (err) {
    console.log('error: ', err);
    return Promise.resolve({ success: false, msg: err.message });
  }
};


export const imageGenApiCall = async (captions, style) => {
  const imageUrls = [];
  
  for (const { shortCaption } of captions) {
    const requestData = {
      model: "dall-e-3",
      prompt: `Please generate an image in the style of ${style} for the caption: ${shortCaption}`,
      n: 1,
      size: "1024x1024"
    };

    try {
      const res = await client.post(dalleUrl, requestData);
      const imageUrl = res.data.data[0].url;
      imageUrls.push(imageUrl);
    } catch (err) {
      console.log('error: ', err.response ? err.response.data : err.message);
      return { success: false, msg: err.message };
    }
  }

  return { success: true, data: imageUrls };
};
