export const captions_json_prompt = "Instructions: \
The caption pairs should have one shorter version that is a detailed 2 sentence description and the second should be a more detailed 3-4 sentences expansion on the first caption from the reading. \
\
Output: format the output as ***solely JSON list*** of caption pair objects like this:\
\
[{shortCaption: “”, longCaption: “”}, shortCaption: “”, longCaption: “”},….]\
\
Example:\
[{shortCaption1: “In the 1500s, Spanish explorers reintroduced horses to North America, greatly impacting Indigenous cultures.”, longCaption1: “The reintroduction of horses by Spanish explorers in the 1500s transformed many Indigenous cultures in North America. Horses enhanced mobility, allowing tribes to travel long distances quickly, carry supplies, and hunt more effectively.”}] \
"

export const storyboard_title = "Please return as a string a short title for the storyboard generated from the following context: "