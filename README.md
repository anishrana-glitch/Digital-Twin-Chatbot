# Digital Twin Chatbot

### AI-Powered Personality-Based Digital Twin Chatbot

> Create an AI version of yourself that understands your personality, communication style, tone, and interests — and chat with it using Gemini AI.

---

## 📌 Overview

**My Digital Twin** is an AI-powered web application that allows users to create a personalized Digital Twin chatbot.

The user first answers a series of questions about their personality, communication style, interests, preferences, and behavior. These answers are transformed into a structured personality profile.

The profile is then provided to Google's **Gemini API**, which uses it as context to generate responses that reflect the user's personality and communication style.

Users can also share their Digital Twin conversation with friends through a shareable session link.

---

## 💡 Problem Statement

Traditional AI chatbots provide generic responses that are not personalized to the individual user.

The goal of this project is to create a **Digital Twin Chatbot** that behaves more like a digital representation of the user.

Instead of asking:

> "What can an AI assistant do for me?"

the idea is:

> **"What if an AI could communicate like me?"**

---

## 🎯 Objectives

The main objectives of this project are:

- Collect personality information from the user.
- Build a structured personality profile.
- Create a chatbot based on the user's answers.
- Use Gemini AI to generate personalized responses.
- Provide a working conversational interface.
- Maintain conversation context.
- Allow users to share their Digital Twin chat with friends.

---

# ✨ Features

## 🧠 1. Create Your Digital Twin

Users answer a series of personality and communication questions.

The application collects information such as:

- Personality
- Communication style
- Tone
- Interests
- Decision-making style
- Social behavior
- Humor preference
- Self-description

The questionnaire contains **at least 5 questions** as required by the challenge.

---

## 📝 2. Personality Profile Generation

After completing the questionnaire, the application creates a structured personality profile.

Example:

```json
{
  "personality": "Energetic and friendly",
  "communicationStyle": "Casual and direct",
  "tone": "Humorous",
  "interests": [
    "Technology",
    "Gaming",
    "Startups"
  ],
  "decisionStyle": "Logic-based",
  "socialStyle": "Friendly",
  "humorStyle": "Playful",
  "selfDescription": "I enjoy building things and trying new ideas."
}
```

🤖 3. Gemini-Powered Digital Twin

The application integrates Google's Gemini API to generate the Digital Twin's responses.

The user's personality profile is provided as context to Gemini.

Flow
User Answers
     ↓
Personality Profile
     ↓
Digital Twin Context
     ↓
User Message
     ↓
Gemini API
     ↓
Personality-Based Response

The Digital Twin is instructed to:

Reflect the user's personality.
Match their communication style.
Adapt to their preferred tone.
Consider their interests.
Maintain conversation context.
Respond naturally.
Avoid inventing personal information that was not provided.

💬 4. Working Chat Interface

The application provides a complete chat experience.

Users can:

Send messages.
Receive AI responses.
Continue conversations.
View previous messages.
Use suggested prompts.
See a typing/loading state.
Press Enter to send messages.
Handle API errors.
Clear conversations.

The chatbot uses the user's personality profile when generating responses.

🔗 5. Shareable Digital Twin Chat

Users can share their Digital Twin conversation with friends.

When the user clicks Share Chat, the application generates a unique session link.

Example:

/share/8F4K92

The shared session can contain:

Digital Twin profile
Twin name
Conversation history
Personality context

A friend can open the shared link and interact with the Digital Twin.

Sharing Flow
Create Digital Twin
        ↓
Start Conversation
        ↓
Click "Share Chat"
        ↓
Generate Session ID
        ↓
Create Shareable Link
        ↓
Copy Link
        ↓
Friend Opens Link
        ↓
View Shared Digital Twin
        ↓
Continue Conversation
🎨 6. Modern User Interface

The application uses a modern AI/SaaS-inspired interface.

Design characteristics include:

Dark theme
Modern typography
Responsive layout
Clean navigation
Digital Twin avatar
Chat bubbles
Personality cards
Interactive buttons
Progress indicators
Loading states
Error and success feedback
Responsive design for different screen sizes

The UI was designed with Stitch and implemented using React.

💾 7. Conversation Persistence

The application maintains relevant Digital Twin information and conversation state.

Depending on the project environment, data can be persisted using:

Browser local storage
Backend session storage
Shared session data

This allows the application to maintain the Digital Twin experience across interactions.

🏗️ Application Architecture
                    ┌─────────────────────┐
                    │       USER          │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   React Frontend    │
                    │                     │
                    │  Questionnaire     │
                    │  Dashboard          │
                    │  Chat Interface     │
                    │  Share Interface    │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │    Backend API      │
                    │   Node + Express    │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │     Gemini API      │
                    │                     │
                    │ Personality Context│
                    │ + Conversation      │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Digital Twin Reply │
                    └─────────────────────┘
🛠️ Tech Stack
Frontend
React
JavaScript
Vite
CSS
Lucide React
Backend
Node.js
Express.js
AI
Google Gemini API
@google/genai
Storage
Local Storage
Backend session storage
Design
Stitch
Responsive UI design
Development
VS Code
AI-assisted development with Antigravity

📁 Project Structure
digital-twin/
│
├── frontend/
│   │
│   ├── public/
│   │
│   ├── src/
│   │   ├── components/
│   │   │
│   │   ├── pages/
│   │   │
│   │   ├── services/
│   │   │
│   │   ├── data/
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── ...
│
├── backend/
│   │
│   ├── routes/
│   │
│   ├── services/
│   │   ├── gemini.js
│   │
│   ├── server.js
│   ├── package.json
│   ├── .env
│   └── ...
│
├── .gitignore
├── README.md
└── ...
⚙️ Getting Started

Follow the steps below to run the project locally.

1. Clone the Repository
git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git

Navigate into the project:

cd YOUR-REPOSITORY
📦 2. Install Frontend Dependencies

Navigate to the frontend:

cd frontend

Install dependencies:

npm install
📦 3. Install Backend Dependencies

Open another terminal and navigate to:

cd backend

Install dependencies:

npm install
🔑 4. Configure Gemini API

The Digital Twin uses Google's Gemini API for AI responses.

Create a Gemini API key through Google AI Studio.

Create a .env file inside the backend directory:

GEMINI_API_KEY=your_gemini_api_key_here

Replace:

your_gemini_api_key_here

with your actual Gemini API key.

⚠️ API Key Security

Never expose your Gemini API key in frontend code.

Do not place the key inside:

frontend/src/

Do not use:

VITE_GEMINI_API_KEY=

for the backend Gemini secret.

The API key should remain on the server side.

Also make sure .env is included in .gitignore:

.env
node_modules/

Never commit your actual API key to GitHub.

▶️ 5. Start the Backend

From the backend directory:

npm start

If your project uses server.js directly:

node server.js

The backend will start on the configured local port.

Example:

http://localhost:5000
▶️ 6. Start the Frontend

Open another terminal:

cd frontend

Run:

npm run dev

Vite will provide a local development URL.

Example:

http://localhost:5173

Open the URL in your browser.

🧪 Example User Flow
Step 1 — Create Your Twin

The user starts the Digital Twin creation process.

Create Your Twin
       ↓
Answer Questions
Step 2 — Answer Questions

Example:

How would you describe your personality?

○ Calm
○ Energetic
○ Introverted
○ Extroverted
○ Balanced

The user continues until all required questions are answered.

Step 3 — Generate Profile

The application processes the answers.

Answers
   ↓
Personality Analysis
   ↓
Digital Twin Profile

Step 4 — Start Chatting

