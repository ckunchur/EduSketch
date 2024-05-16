import axios from 'axios';
import { prompt, top_moods_topics_prompt} from './prompts';

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
export const topMoodsAndTopicsWithChatGPT= async (text) => {
    let prompt = top_moods_topics_prompt;
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
        const topMoodsAndTopics = JSON.parse(answerString);
        return Promise.resolve({success: true, data: topMoodsAndTopics});
    } catch (err) {
        console.log('error: ', err);
        return Promise.resolve({success: false, msg: err.message});
    }
}


// sample prompt for chat conversation
const chatgptApiCall = async (prompt, messages) => {
    // Initialize the body with the model and existing messages
    const body = {
        model: "gpt-3.5-turbo",
        messages: [...messages]
    };

    // If there's a user prompt, add it to the message list
    if (prompt) {
        body.messages.push({
            role: 'user',
            content: prompt
        });
    }
    
    try {
        const res = await client.post(chatgptUrl, body);
        let answer = res.data.choices[0].message.content.trim();
        // return user prompt and system response
        const newMessages = [{ role: 'user', content: prompt }, { role: 'system', content: answer }];
        
        console.log(newMessages);
        return { success: true, data: newMessages };

    } catch (err) {
        console.log('error: ', err);
        return { success: false, msg: err.message };
    }
}