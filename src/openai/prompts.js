export const captions_json_prompt = "Instructions: \
The caption pairs should have one that is a short single sentence description and the second should be a more detailed 1-2 sentences expand on the first caption. \
\
Output: format the output as ***solely JSON list*** of caption pair objects like this:\
\
[{shortCaption: “”, longCaption: “”}, shortCaption: “”, longCaption: “”},….]\
\
Example:\
[{shortCaption1: “In the 1500s, Spanish explorers reintroduced horses to North America, greatly impacting Indigenous cultures.”, longCaption1: “The reintroduction of horses by Spanish explorers in the 1500s transformed many Indigenous cultures in North America. Horses enhanced mobility, allowing tribes to travel long distances quickly, carry supplies, and hunt more effectively.”}] \
"