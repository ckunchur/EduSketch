import axios from 'axios';
import { prompt, top_moods_topics_prompt, simplify_prompt} from './prompts';

const OPENAI_API_KEY = process.env.REACT_OPENAI_API_KEY;


const client = axios.create({
  baseURL: 'https://api.openai.com/v1',
  headers: {
    "Authorization": `Bearer ${OPENAI_API_KEY}`,
    "Content-Type": "application/json"
  }
});


const chatgptUrl = 'https://api.openai.com/v1/chat/completions';


// example prompt for semantic mood/topic analysis from a text input
export const simplifyTopicsWithChatGPT= async (text, num_captions) => {
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

        let answerString = res.data.choices[0].message.content.trim();
        const imageCaptions = JSON.parse(answerString);
        return Promise.resolve({success: true, data: imageCaptions});
    } catch (err) {
        console.log('error: ', err);
        return Promise.resolve({success: false, msg: err.message});
    }
}


// sample prompt for chat conversation
export const imageGenApiCall = async (captions, num_captions) => {
    // Initialize the body with the model and existing messages
    
    try {
        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt: "Please generate an image for each caption" + captions,
            n: num_captions,
            size: "1024x1024",
        });
        image_url = response.data[0].url;

        const res = await client.post(image_url, body);
        let answer = res.data.choices[0].message.content.trim();
        // return user prompt and system response
        // const newMessages = [{ role: 'user', content: prompt }, { role: 'system', content: answer }];
        
        console.log(answer);
        return { success: true, data: answer };

    } catch (err) {
        console.log('error: ', err);
        return { success: false, msg: err.message };
    }
}
