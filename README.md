# EduSketch

## Quick Start
### Live Site
View the EduSketch site live [here](https://edusketch-bebb4.web.app/).

### How to run app locally
- Clone repo 
- create `.env` file in root directory with the following:
  - REACT_OPENAI_API_KEY="{your key here}"
- run `npm install` 
- run `npm start`

### How to deploy locally
- In `.env` file add the following from the Firebase project console:
  - REACT_APP_FIREBASE_API_KEY=""
  - REACT_APP_FIREBASE_AUTH_DOMAIN=""
  - REACT_APP_FIREBASE_PROJECT_ID=""
  - REACT_APP_FIREBASE_STORAGE_BUCKET=""
  - REACT_APP_FIREBASE_MESSAGING_SENDER_ID=""
  - REACT_APP_FIREBASE_APP_ID=""
- run `npm run build`

