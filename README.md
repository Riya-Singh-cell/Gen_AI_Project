🚀 Insight Finder

Insight Finder is an AI-powered platform that helps users extract keywords & meaningful insights from unstructured text using Natural Language Processing (NLP) and Machine Learning.
It provides a clean UI for entering text and returns refined keywords that help analyze opinions, research content, articles, or user-generated inputs.

🧠 How It Works
🔹 NLP + ML Used
Component	Description
spaCy	Used for tokenization, part-of-speech tagging, and keyword extraction logic.
Python-based ML logic	Custom keyword extraction using rule-based + statistical NLP techniques.
Backend (Flask)	API endpoint /extract_keywords handles NLP model processing.
Frontend (React + Vite)	Sends user input using Axios to backend and displays extracted keywords.
📂 Project Structure
insight-finder/
│
├── backend/
│   ├── app.py                # Flask backend API
│   ├── keyword_extractor.py  # NLP logic using spaCy
│   ├── requirements.txt      # Backend dependencies
│
├── src/
│   ├── components/
│   │   └── KeywordExtractor.tsx  # React component for keyword extraction
│   ├── App.tsx                  # Main routing and UI
│   └── index.css               # Styling
│
├── package.json               # Frontend dependencies
└── README.md                  # Project documentation

🛠️ Tech Stack
🔹 Frontend

React + TypeScript + Vite

Tailwind CSS

Framer Motion (animations)

Axios (API requests)

ShadCN UI components

🔹 Backend

Python + Flask

spaCy (NLP library)

Custom ML logic (keyword extraction)

📥 Installation & Setup
1️⃣ Backend Setup
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app.py


Backend runs on: http://127.0.0.1:5000

2️⃣ Frontend Setup
npm install
npm run dev


Frontend runs on: http://localhost:8080

🔗 API Endpoint
POST /extract_keywords

Request Body:

{
  "text": "Artificial Intelligence improves decision-making globally"
}


Response:

{
  "keywords": ["Artificial Intelligence", "decision-making", "globally"]
}

🎯 Features

✔️ Extracts keywords from large text input
✔️ Animation-based UI feedback
✔️ Handles error if user submits empty input
✔️ Clean UI with responsive design
✔️ Fully decoupled frontend & backend architecture

🧩 Future Enhancements

Sentiment Analysis

Topic Categorization

Integration of Deep Learning model (BERT)

Support for multiple languages

📝 Notes

❗ Don’t push venv/, node_modules/, or large ML files to Git. Use .gitignore and keep only requirements.txt and package.json.
