# FutureMe

FutureMe is an AI-powered personal reflection platform that helps users receive guidance and insights from their future self.

## Features
- Personalized future-self insights
- AI-powered conversations
- Interactive chat interface
- Modern responsive UI
- Netlify deployment

## Tech Stack
- HTML
- CSS
- JavaScript
- Node.js
- Gemini AI
- Netlify

---

## 🎨 Key Experiences & Aesthetics

1. **Horizon Metrics Form**: A elegant glassmorphism collection container mapping name, age, dreams, specific struggles, and advisory tones.
2. **Atmospheric Quantum Orb**: A smooth pulsing loading animation that dynamically states progression steps (e.g. *Calibrating continuum timelines...* -> *Decrypting identity profiles...*) during server compilation.
3. **Transmission Secure Board**: Outlines the customized Strategy advisory block, the personalized Identity profile, Immediate Critical Moves list, Daily Habits, Trajectory Warnings, and Alignment Mantras.
4. **Direct Continuum Link Chat**: An interactive chat terminal maintaining active history context and personality profiles for organic follow-up discussions with the Future self.
5. **Intelligent Failsafe Mode**: If no Gemini API key is configured in the `.env` file, the server automatically boots into **Demo Failsafe Mode**. It uses an adaptive local reflection model to personalize data inputs in real-time, ensuring a beautiful, robust live demo experience that never crashes!

---

## 📂 Project Directory Structure

```
futureme/
├── frontend/
│   ├── index.html   # High-fidelity Apple-style HTML layouts
│   ├── style.css    # Ambient styles, typography, loaders, responsive grids
│   └── script.js    # State machine, fetch API, toast alerts, chat threads
├── backend/
│   ├── server.js    # Express backend, Gemini orchestration, Failsafe fallback
│   ├── package.json # Project manifests & dependencies
│   ├── .env         # Active credentials (git-ignored)
│   └── .env.example # Environment variable template
└── README.md        # Operations & Setup Guide
```

---

## 🚀 Installation & Quick Start

Follow these simple steps to run the application locally in under 60 seconds:

### Step 1: Open the Workspace
Open `Open the project folder in your editor or terminal.` in your editor or terminal.

### Step 2: Install Backend Dependencies
Navigate to the `backend` folder and install dependencies:
```bash
cd backend
npm install
```

### Step 3: Configure Environment Variables
Open the `.env` file inside `backend/` and configure your API key:
```env
PORT=5000
GEMINI_API_KEY=your_actual_gemini_api_key_here
```
> **Note**: If you leave the API key as the placeholder, the server will output a startup notification indicating that it is operating in **DEMO FAILSAFE MODE** with realistic mocks.

### Step 4: Run the Server
Launch the backend. Node will automatically serve both the API endpoints and host the static frontend:
```bash
npm start
```
Or for development:
```bash
npm run dev
```

### Step 5: Open in Browser
Open your browser and navigate to:
👉 **[http://localhost:5000](http://localhost:5000)**

---

## 📡 API Architecture

### 1. Reflection Compilation Engine
* **Route**: `POST /api/generate-futureme`
* **Purpose**: Compiles initial parameters into a structured, parsed advisory card.
* **Payload**:
```json
{
  "name": "User",
  "age": "20",
  "goal": "Become a Software Developer",
  "struggle": "Lack of consistency",
  "oneYearVision": "Get a good job and improve skills",
  "tone": "Motivational"
}
```
* **Output Response**:
```json
{
  "success": true,
  "data": {
    "message": "Consistency and focused action are the keys to achieving your goals. Small daily improvements can create significant long-term results.",
    "futureIdentity": "Future Self Mentor",
    "nextMoves": [
      "Break your goal into smaller actionable tasks.",
      "Create a daily schedule and follow it consistently.",
      "Track your progress and adjust your plan regularly."
    ],
    "habit": "Spend at least 30 minutes every day working on your most important goal.",
    "warning": "Avoid procrastination and distractions that delay progress.",
    "mantra": "Small steps every day lead to extraordinary results."
  }
}
```

### 2. Continuum Conversation Link
* **Route**: `POST /api/chat-futureme`
* **Purpose**: Performs continuous, contextually aware chat loops with the chosen advisory persona.
* **Payload**:
```json
{
  "userProfile": {
    "name": "User",
    "age": "20",
    "goal": "Become a Software Developer",
    "struggle": "Maintaining consistency",
    "oneYearVision": "Secure a software development role",
    "tone": "Motivational"
  },
  "chatHistory": [
    {
      "role": "user",
      "message": "How can I stay consistent with my goals?"
    }
  ],
  "question": "What is the most important step I should take today?"
}
```
* **Output Response**:
```json
{
  "success": true,
  "reply": "Your future success depends on what you do today. Identify your highest-priority task, complete it without distractions, and build momentum through consistent action."
}
```

