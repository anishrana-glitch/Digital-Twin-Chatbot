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
