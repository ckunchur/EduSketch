import axios from 'axios';
import { prompt, top_moods_topics_prompt, simplify_prompt} from './prompts.js';

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
  
  // sample prompt for chat conversation
  export const imageGenApiCall = async (captions, num_captions) => {
    try {
      const response = await client.post('https://api.openai.com/v1/images/generations', {
        model: "dall-e-3",
        prompt: `Please generate an image for each caption: ${captions.join(', ')}`,
        n: num_captions,
        size: "1024x1024"
      });
  
      const image_url = response.data.data[0].url;
      console.log(image_url);
      return { success: true, data: image_url };
    } catch (err) {
      console.log('error: ', err);
      return { success: false, msg: err.message };
    }
  };