import axios from 'axios';
import { prompt, top_moods_topics_prompt, simplify_prompt, complex_prompt} from './prompts.js';

const OPENAI_API_KEY = process.env.REACT_OPENAI_API_KEY;

console.log('OpenAI API Key:', OPENAI_API_KEY);



const client = axios.create({
  baseURL: 'https://api.openai.com/v1',
  headers: {
    "Authorization": `Bearer ${OPENAI_API_KEY}`,
    "Content-Type": "application/json"
  }
});


const chatgptUrl = 'https://api.openai.com/v1/chat/completions';
const dalleUrl = 'https://api.openai.com/v1/images/generations';

const parseResponse = (response) => {
    return response.split('\n').map(line => line.replace(/^- /, '').trim()).filter(line => line.length > 0);
  };

// example prompt for semantic mood/topic analysis from a text input
export const simplifyTopicsWithChatGPT = async (text, num_captions) => {
    let prompt = simplify_prompt + String(num_captions) + "Context: " + text;
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
  
      console.log('Response from OpenAI:', res.data);  // Debug line to inspect the response
  
      let answerString = res.data.choices[0].message.content.trim();
      // Check if the answerString is valid JSON
      let imageCaptions;
      try {
        // imageCaptions = answerString;
        imageCaptions = parseResponse(answerString);
        // print(imageCaptions)
      } catch (jsonError) {
        console.log('Invalid response:', jsonError);
        return Promise.resolve({ success: false, msg: 'Invalid response from OpenAI' });
      }
  
      return Promise.resolve({ success: true, data: imageCaptions });
    } catch (err) {
      console.log('error: ', err);
      return Promise.resolve({ success: false, msg: err.message });
    }
  };

  // example prompt for semantic mood/topic analysis from a text input
export const getComplexInfoFromTopic = async (text, captions) => {
    let prompt = complex_prompt + "Captions:" + String(captions) + "Reading Context: " + text
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
  
      console.log('Response from OpenAI:', res.data);  // Debug line to inspect the response
  
      let answerString = res.data.choices[0].message.content.trim();
      let imageCaptions;
      try {
        imageCaptions = parseResponse(answerString);
      } catch (jsonError) {
        console.log('Invalid response:', jsonError);
        return Promise.resolve({ success: false, msg: 'Invalid response from OpenAI' });
      }
  
      return Promise.resolve({ success: true, data: imageCaptions });
    } catch (err) {
      console.log('error: ', err);
      return Promise.resolve({ success: false, msg: err.message });
    }
  };
  
// sample prompt for chat conversation
export const imageGenApiCall = async (captions, style) => {
    const imageUrls = [];
    
    for (const caption of captions) {
      const requestData = {
        model: "dall-e-3",
        prompt: `Please generate an image in the style of ${style} for the caption: ${caption}`,
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