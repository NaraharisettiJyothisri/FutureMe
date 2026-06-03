<<<<<<< HEAD
# FutureMe — Nitish's Founder Labs

FutureMe is a premium, AI-powered personal reflection platform where founders translate their present trajectory, execution struggles, and future ambitions into a highly intelligent, actionable strategy written directly by their future successful self. 

Built using a premium Apple-style dark ambient design system, the application creates a direct continuum bridge that makes users feel as if they are speaking directly with their future successful identity rather than interacting with a generic AI chatbot.

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
Open `C:\Users\jhothi sri\.gemini\antigravity\scratch\futureme` in your editor or terminal.

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
  "name": "Nitish",
  "age": "23",
  "goal": "Build a successful AI startup",
  "struggle": "Lack of consistency",
  "oneYearVision": "Running a profitable AI company",
  "tone": "Brutally Honest"
}
```
* **Output Response**:
```json
{
  "success": true,
  "data": {
    "message": "Stop lying to yourself. The execution bottleneck you are coddling right now isn't some complex systemic issue...",
    "futureIdentity": "The Zero-Excuse Operator (Nitish)",
    "nextMoves": [
      "Stop waiting for inspiration; write out an explicit micro-task pipeline.",
      "Cut out all passive consumption cycles and focus strictly on production output metrics.",
      "Eliminate all external negotiation vectors from your lifestyle design."
    ],
    "habit": "Track your time blocks down to the single minute with aggressive zero-based planning.",
    "warning": "Do not confuse movement with structural production progress.",
    "mantra": "Suffer the discipline now, or suffer the regret forever."
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
    "name": "Nitish",
    "age": "23",
    "goal": "AI Startup",
    "struggle": "Lack of consistency",
    "oneYearVision": "Profitable company",
    "tone": "Brutally Honest"
  },
  "chatHistory": [
    { "role": "user", "message": "Will I actually make it?" }
  ],
  "question": "What is the single highest leverage move today?"
}
```
* **Output Response**:
```json
{
  "success": true,
  "reply": "Stop looking for an easier path. Do the exact task you are avoiding right now. Close this screen and execute."
}
```
=======
# FutureMe
>>>>>>> 424dc6d4a92a22a27f2a2516619f460f590e3abf
