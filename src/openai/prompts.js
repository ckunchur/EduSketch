export const simplify_prompt = "Please create a list of captions that create a story that is a summary of the text given. The output should be a bulleted list of the captions. The number of captions you generate is: "
export const complex_prompt = "I'm giving you 8 text captions and the story the captions were generated from. For each caption, I need an in depth 2-3 longer version of the caption grounded from info from the reading based on the shorter caption's content."
export const captions_json_prompt = "Instructions: \
Using the passed in text, create a summary that consists of 8 caption pairs that do a good job of covering the main ideas of the information. The captions should be at a 5th grade reading level. The caption pairs should have one that is a short single sentence description and the second should be a more detailed 1-2 sentences expand on the first caption. \
\
Output: format the output as a JSON list of caption pair objects like this:\
\
[{shortCaption: “”, longCaption: “”}, shortCaption: “”, longCaption: “”},….]\
\
Example:\
[{shortCaption1: “In the 1500s, Spanish explorers reintroduced horses to North America, greatly impacting Indigenous cultures.”, longCaption1: “The reintroduction of horses by Spanish explorers in the 1500s transformed many Indigenous cultures in North America. Horses enhanced mobility, allowing tribes to travel long distances quickly, carry supplies, and hunt more effectively.”}]"