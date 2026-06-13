const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env') });

console.log("API KEY FOUND:", process.env.GEMINI_API_KEY);
const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Serve static frontend files directly from Express for unified hosting
app.use(express.static(path.join(__dirname, '../frontend')));

// Clean and sanitize API Key input (handles leading/trailing spaces, literal quotes, etc.)
const getCleanApiKey = () => {
  let key = process.env.GEMINI_API_KEY || '';
  key = key.trim();
  if (key.startsWith('"') && key.endsWith('"')) {
    key = key.substring(1, key.length - 1);
  } else if (key.startsWith("'") && key.endsWith("'")) {
    key = key.substring(1, key.length - 1);
  }
  return key.trim();
};

// Helper to determine if API Key is configured
const isApiKeyConfigured = () => {
  const key = getCleanApiKey();
  return key !== '' && 
         key !== 'your_gemini_api_key_here' && 
         key !== 'your_actual_gemini_api_key_here' &&
         key !== 'replace_with_your_gemini_api_key' &&
         key !== 'your_api_key_here';
};

// Advanced Generative Phrase Synthesis Engine (Mimics real-time LLM reasoning like ChatGPT/Gemini)
const generateDynamicMockResponse = (name, age, goal, struggle, oneYearVision, tone,language) => {
  const dictionary = {
    "Motivational": {
      openers: [
        `Hello ${name}. I am writing to you from a beautiful vantage point, looking back at our ${age}-year-old self with immense pride.`,
        `Dearest ${name}, take a deep breath. I know the weight you are carrying at ${age}, but I promise you, the view from this side is spectacular.`,
        `Hey ${name}. It is ${name} from the future here. I wanted to reach back across the timeline and tell you that every ounce of effort is worth it.`,
        `Greetings ${name}. As I look back at where we were when we were ${age}, I am filled with absolute gratitude for your courage today.`
      ],
      goals: [
        `Our ultimate victory in "${goal}" wasn't built overnight, but through the quiet decisions you are making right now.`,
        `That magnificent dream of "${goal}" that keeps you awake at night? We made it a reality. It is our active landscape now.`,
        `I need you to know that the architectural blueprint of "${goal}" is completely secure. We pulled it off.`,
        `Every struggle you endure right now is cementing the foundation of our success in "${goal}".`
      ],
      struggles: [
        `I know "${struggle}" feels like an insurmountable wall today, but it is actually the exact crucible that shapes our strength.`,
        `Do not let the temporary friction of "${struggle}" convince you that we are failing. It is simply our growth threshold.`,
        `We broke through the bottleneck of "${struggle}" by choosing to show up, messy and imperfect, every single day.`,
        `That bottleneck with "${struggle}" is just a temporary calibration phase. Treat it as a lesson, not a sentence.`
      ],
      visions: [
        `Our one-year vision of "${oneYearVision}" is the critical catalyst. Keep your focus locked there and watch the magic unfold.`,
        `When you commit fully to our 12-month target of "${oneYearVision}", you will see the pieces fall into alignment.`,
        `Push into "${oneYearVision}" with unwavering faith. That milestone is the launchpad for everything we become.`,
        `Let the anticipation of "${oneYearVision}" pull you forward. The timeline is set—now, let's execute.`
      ],
      moves: [
        [
          `Block out a non-negotiable 45-minute deep-work session for "${goal}" every single morning.`,
          `Set a high-standard calendar framework that isolates you from "${struggle}".`,
          `Identify a high-performing peer to share daily milestones and keep standards high.`
        ],
        [
          `Document your non-negotiables every night before going to sleep.`,
          `Audit your low-leverage distractions tonight and ruthlessly eliminate them.`,
          `Break down "${oneYearVision}" into 12 micro-milestones and focus only on the first one.`
        ]
      ],
      habits: [
        `Start your day with 10 minutes of visualization of "${goal}", followed immediately by one action item.`,
        `Dedicate the first 90 minutes of your workday entirely to eliminating "${struggle}".`,
        `Write down three bullet points of progress before checking any social feeds or emails.`
      ],
      warnings: [
        `Beware of letting the daily friction of "${struggle}" convince you that we are not moving forward.`,
        `Watch out for subtle procrastination dressed up as 'planning' or 'researching'—action is the only currency.`,
        `Guard your attention span with extreme prejudice; distractions are tax on our future.`
      ],
      mantras: [
        `Action produces clarity; waiting produces doubt.`,
        `Consistency beats brilliance every single day.`,
        `I am the builder of my timeline, step by step.`
      ]
    },
    "Brutally Honest": {
      openers: [
        `Stop lying to yourself, ${name}. You are ${age} years old now, and the clock is ticking.`,
        `Let's cut the pleasantries, ${name}. If you continue on your current path, "${goal}" is going to remain a hallucination.`,
        `I am writing this from a timeline of absolute high-performance, and I need to shake you out of your comfort zone.`,
        `Listen to me, ${name}. At ${age}, you are spending too much time overthinking and not enough time executing.`
      ],
      goals: [
        `If you actually want to achieve "${goal}", you must stop waiting for inspiration and start building systems.`,
        `The dream of "${goal}" is completely achievable, but your present velocity is embarrassingly slow.`,
        `You claim that "${goal}" is your primary target, but your calendar suggests otherwise. Restructure your daily focus.`,
        `We reached the milestone of "${goal}" only because we stopped negotiating with our feelings and started executing.`
      ],
      struggles: [
        `The execution bottleneck with "${struggle}" is not a complex systemic issue—it is a choice. You are coddling it.`,
        `Stop blaming external factors for "${struggle}". You are choosing to delay the hard tasks because they feel uncomfortable.`,
        `That bottleneck with "${struggle}" is draining our energy capital. Cut it out immediately.`,
        `Every time you make an excuse for "${struggle}", you delay our success. Move into messy, immediate action.`
      ],
      visions: [
        `If you keep compromising, the one-year vision of "${oneYearVision}" is dead on arrival. Lift your standards.`,
        `To hit our 12-month targets for "${oneYearVision}", we must become zero-excuse operators starting today.`,
        `Make "${oneYearVision}" your absolute non-negotiable directive. If a task doesn't serve it, kill it.`,
        `Your 12-month goal of "${oneYearVision}" requires a complete operational overhaul. Start with your morning routine.`
      ],
      moves: [
        [
          `Stop waiting for inspiration; write out a strict micro-task checklist for "${goal}" tonight.`,
          `Cut out all passive consumption cycles and focus strictly on daily production output metrics.`,
          `Eliminate all external negotiation vectors regarding your "${struggle}" bottleneck.`
        ],
        [
          `Execute the single hardest task on your plate before noon tomorrow.`,
          `Ruthlessly audit your close circle and remove low-standard influences.`,
          `Track your time blocks down to the single minute with aggressive zero-based planning.`
        ]
      ],
      habits: [
        `Block all social media and notifications until you have completed 60 minutes of focus on "${goal}".`,
        `Do the exact task you are avoiding first thing every morning without exception.`,
        `Log every single 15-minute time block in a spreadsheet to audit where your focus goes.`
      ],
      warnings: [
        `Do not confuse movement with structural production progress. Being busy is often lazy thinking.`,
        `Beware of searching for a 'magical easier path'—discomfort is the only way through.`,
        `If you negotiate on your commitments today, you will negotiate on your dreams tomorrow.`
      ],
      mantras: [
        `Suffer the discipline now, or suffer the regret forever.`,
        `Excuses only comfort those who accept baseline mediocrity.`,
        `Close this screen, open your editor, and execute.`
      ]
    },
    "Calm Mentor": {
      openers: [
        `Take a deep breath, ${name}. Look at the horizon. You are exactly where you need to be.`,
        `Hello ${name}. At ${age}, there is so much urgency in your heart, but I want to invite you to find stillness.`,
        `Greetings ${name}. I am writing this to you from a place of peace, detaching from the noise of our ${age}s.`,
        `Dearest ${name}. Let your mind settle. We have all the time in the world to build what matters.`
      ],
      goals: [
        `Our path to "${goal}" is not a sprint; it is a slow, elegant system-building process.`,
        `The seeds of "${goal}" that you are sowing today will bear fruit in their natural evolutionary season.`,
        `We reached the completion of "${goal}" by focusing on quality and longevity rather than frantic speed.`,
        `Let your orientation toward "${goal}" be driven by quiet conviction, not an insecure desire to prove yourself.`
      ],
      struggles: [
        `The friction you feel with "${struggle}" is not an emergency. It is simply a teacher in disguise.`,
        `Observe the bottleneck of "${struggle}" without judgment. What system failure is it pointing you toward?`,
        `We learned to navigate "${struggle}" by simplifying our focus and letting go of unnecessary burdens.`,
        `Do not let the temporary challenge of "${struggle}" disturb your inner orientation. Breathe and adjust.`
      ],
      visions: [
        `Cultivate steady, quiet persistence toward our one-year vision of "${oneYearVision}".`,
        `When you align your daily rhythms with the vision of "${oneYearVision}", the noise will naturally recede.`,
        `Hold the vision of "${oneYearVision}" gently in your mind, and let it guide your steps without anxiety.`,
        `True longevity is built when you integrate the milestone of "${oneYearVision}" into a balanced life.`
      ],
      moves: [
        [
          `Build a sustainable weekly calendar framework that accounts for recovery balance.`,
          `Practice deliberate isolation exercises to cultivate deep creative clarity around "${goal}".`,
          `Establish a systematic feedback loop to evaluate the bottleneck of "${struggle}" logically.`
        ],
        [
          `Simplify your daily tasks down to the single most critical system block.`,
          `Spend 15 minutes in silent reflection at dusk to realign your mental frameworks.`,
          `Remove one source of digital clutter or cognitive noise from your environment tonight.`
        ]
      ],
      habits: [
        `Take 10 minutes of pure silence every morning before entering your workspace.`,
        `Focus on single-tasking—do only one thing at a time with absolute presence.`,
        `End your day by writing down three things you are grateful for on our journey.`
      ],
      warnings: [
        `Do not mistake anxiety for passion or frantic movement for actual scaling.`,
        `Beware of added complexity—true scale is always achieved through elegant simplification.`,
        `Guard your peace of mind above all else; it is the source of all creative power.`
      ],
      mantras: [
        `Quiet confidence executes while insecure ego makes noise.`,
        `Patience is the ultimate leverage.`,
        `Sow the seeds, water the soil, trust the timeline.`
      ]
    },
    "CEO Mode": {
      openers: [
        `Let's review the current performance framework, ${name}. Energy capital allocation is our core priority.`,
        `Operational status report, ${name}. At ${age}, your cognitive bandwidth is our most valuable asset.`,
        `Hello ${name}. I am writing this to you from a position of absolute market scale and operational throughput.`,
        `Hey ${name}. Let's look at the current enterprise roadmap at age ${age} with clinical objectivity.`
      ],
      goals: [
        `Our primary high-impact target is "${goal}". All low-leverage activities must be standardise or cut.`,
        `The distribution channels for "${goal}" are secure. Now we must optimize our day-to-day throughput.`,
        `We successfully completed the launch of "${goal}" by treating our energy like a hyper-efficient cap table.`,
        `Every cognitive block you spend today must represent a high-yield investment in the roadmap of "${goal}".`
      ],
      struggles: [
        `Your present bottleneck with "${struggle}" is draining critical operational capital. Solve for it immediately.`,
        `Identify the absolute root cause of "${struggle}" and build an automated framework to eliminate it.`,
        `We resolved the constraints of "${struggle}" by ruthlessly standardizing our workflows and pipelines.`,
        `Treat "${struggle}" as a structural system constraint. Restructure the cap table of your attention.`
      ],
      visions: [
        `To reach our one-year vision of "${oneYearVision}", we must optimize our core execution velocity.`,
        `Make "${oneYearVision}" our primary KPI for the next 12 months. All operations must align.`,
        `Scale our focus directly toward the vision of "${oneYearVision}". Delegate or defer all peripheral variables.`,
        `The operational roadmap to "${oneYearVision}" requires high-leverage decision making every single day.`
      ],
      moves: [
        [
          `Design an explicit weekly operational output matrix with clear daily goals.`,
          `Automate or outsource your low-leverage tasks to eliminate "${struggle}" immediately.`,
          `Identify your single highest-converting constraint metrics for "${goal}" and solve for them.`
        ],
        [
          `Draft a clinical data-driven review of your operational KPIs this Sunday morning.`,
          `Guard your cognitive capacity with extreme prejudice against low-value inputs.`,
          `Establish a 90-minute strict operational focus block every single working day.`
        ]
      ],
      habits: [
        `Perform a quantitative time audit of your working hours every Sunday morning.`,
        `Standardize your daily operational checklist to eliminate decision fatigue.`,
        `Begin every working session by identifying the single highest-impact bottleneck.`
      ],
      warnings: [
        `Guard your attention span with extreme prejudice; peripheral tasks are operational leaks.`,
        `Stop over-indexing on marginal details. Focus your energy on core distribution systems.`,
        `Execution is the only currency that carries value in this competitive market landscape.`
      ],
      mantras: [
        `Optimize systems, eliminate bottlenecks, maximize throughput.`,
        `Standardize before you optimize, optimize before you automate.`,
        `Execution is the strategy.`
      ]
    }
  };

  const toneDict = dictionary[tone] || dictionary["Motivational"];
  const selectRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

  // Dynamic phrase compiler
  const opener = selectRandom(toneDict.openers);
  const goalPhrase = selectRandom(toneDict.goals);
  const strugglePhrase = selectRandom(toneDict.struggles);
  const visionPhrase = selectRandom(toneDict.visions);

  const messageText = `${opener} ${goalPhrase} ${strugglePhrase} ${visionPhrase}`;

  const movesSet = selectRandom(toneDict.moves);
  const habitText = selectRandom(toneDict.habits);
  const warningText = selectRandom(toneDict.warnings);
  const mantraText = selectRandom(toneDict.mantras);

  // Compile Dynamic Daily Plan based on tone
  let dailyPlan = [];
  if (tone === "Motivational") {
    dailyPlan = [
      {
        time: "07:30 AM - 09:00 AM",
        activity: `Deep-Work: Focus entirely on "${goal}"`,
        details: "The morning hours are your highest cognitive asset. Put them directly into building."
      },
      {
        time: "01:30 PM - 02:00 PM",
        activity: `Mindful Check-in: Realignment against "${struggle}"`,
        details: "Take 5 deep breaths, pause execution, and verify you are not procrastinating."
      },
      {
        time: "08:30 PM - 09:00 PM",
        activity: `Wind-down & Plan: Prep tomorrow's first step for "${oneYearVision}"`,
        details: "Establish consistency by setting up your environment for the next day."
      }
    ];
  } else if (tone === "Brutally Honest") {
    dailyPlan = [
      {
        time: "06:00 AM - 07:30 AM",
        activity: `Non-Negotiable Execution: Code/Work on "${goal}"`,
        details: "No social media. No notifications. Just pure raw progress before anyone else wakes up."
      },
      {
        time: "12:00 PM - 12:30 PM",
        activity: `Clinical Review: Log time slots and expose "${struggle}" leaks`,
        details: "Track exactly where you drifted. Highlight the excuses you made and shut them down."
      },
      {
        time: "09:00 PM - 09:30 PM",
        activity: `Zero-Based Planning: Prepare tomorrow's task checklist`,
        details: "Identify the single hardest task for tomorrow. Commit to doing it first."
      }
    ];
  } else if (tone === "Calm Mentor") {
    dailyPlan = [
      {
        time: "08:00 AM - 09:30 AM",
        activity: `Quiet Synthesis: Creative deep work on "${goal}"`,
        details: "Work with absolute presence. Quality beats hurried volume."
      },
      {
        time: "03:00 PM - 03:30 PM",
        activity: `Cognitive Rest & Alignment: Detaching from "${struggle}" stress`,
        details: "Step away from screens. Observe your mental bandwidth and ground yourself."
      },
      {
        time: "06:00 PM - 06:30 PM",
        activity: `Reflective Review: Acknowledge daily system adjustments`,
        details: "Track how your environment supported or hindered your focus today."
      }
    ];
  } else { // CEO Mode
    dailyPlan = [
      {
        time: "07:00 AM - 08:30 AM",
        activity: `High-Leverage Work: Scale core value for "${goal}"`,
        details: "Prioritize your highest-converting growth metric. Block out all noise."
      },
      {
        time: "01:00 PM - 01:30 PM",
        activity: `Operational Review: Resolve the "${struggle}" bottleneck`,
        details: "Check today's task completion rate. Adjust resources to bypass execution blockers."
      },
      {
        time: "05:00 PM - 05:30 PM",
        activity: `Roadmap Alignment: Set KPIs for tomorrow`,
        details: "Prepare tomorrow's operational matrix to preserve tomorrow's bandwidth."
      }
    ];
  }

  const identityList = {
    "Motivational": ["The Unstoppable Catalyst", "The Inspired Architect", "The Evolutionary Force", "The Timeline Breaker"],
    "Brutally Honest": ["The Zero-Excuse Operator", "The High-Velocity Directive", "The Clinical Pragmatist", "The Execution Catalyst"],
    "Calm Mentor": ["The Grounded Visionary", "The Serene Builder", "The Integrated Mind", "The Patient Architect"],
    "CEO Mode": ["The High-Performance Enterprise Engine", "The Chief Output Architect", "The Systems Strategist", "The Bandwidth Optimizer"]
  };
  const identityBase = selectRandom(identityList[tone] || identityList["Motivational"]);
return {
    message: messageText,
    futureIdentity: `${identityBase} (${name})`,
    nextMoves: movesSet,
    habit: habitText,
    warning: warningText,
    mantra: mantraText,


    actionPlan: {
        week1: [
            `Research and plan your path toward ${goal}`,
            `Create a daily schedule`,
            `Identify distractions causing ${struggle}`
        ],
        week2: [
            `Work 30 minutes daily on ${goal}`,
            `Track your progress every evening`,
            `Improve one weak habit`
        ],
        week3: [
            `Increase focused work sessions`,
            `Review weekly progress`,
            `Adjust strategy if needed`
        ],
        week4: [
            `Complete a small milestone`,
            `Measure results`,
            `Prepare the next 30-day plan`
        ]
    },

    dailyPlan: dailyPlan,
    isMock: true
};
};

// Programmatic dynamic mock chat responder (Generates custom, context-relevant responses in failsafe mode)
const generateDynamicMockChatResponse = (userProfile, chatHistory, question) => {
  const { name, goal, struggle, oneYearVision, tone } = userProfile;
  const q = question.toLowerCase();

  const replies = {
    "Brutally Honest": [
      `Let's cut the noise, ${name}. We set a clear target to reach "${oneYearVision}". If what you are asking about does not directly help eliminate our bottleneck with "${struggle}", it is a distraction. Close this tab, do 45 minutes of hyper-focused deep work, and let your results do the talking.`,
      `Stop looking for a perfect roadmap or seeking external validation, ${name}. Whether you should take that action comes down to one simple metric: does it directly move the needle on our goal of "${goal}"? You are using overthinking as a shield to avoid execution. Address the "${struggle}" constraint today, stop negotiating, and make the play.`,
      `You already know the answer, ${name}. You're asking me because you want a softer option. There isn't one. The reason you are struggling with "${struggle}" is because you are letting comfort win. Re-align with "${oneYearVision}" and execute now.`,
      `Let's be completely clinical. The cognitive capital you spent formulating that question could have been used to take action on "${goal}". Focus strictly on the primary constraint of "${struggle}" and stop diluting your throughput.`
    ],
    "Motivational": [
      `I hear you, ${name}! Every single intentional action you take today is a direct vote for the person you are becoming. We broke past "${struggle}" because we showed up every day, even when it felt tough. Keep your standards high, align your actions with our vision of "${oneYearVision}", and keep building. I'm waiting for you at the finish line!`,
      `I understand the anxiety, ${name}. It is completely natural to feel uncertainty when navigating this phase of our journey toward "${goal}". But remember, the version of us writing this in the future saw the potential in you today. We overcame "${struggle}" because you chose not to quit. Let that inspire you. Trust the vision, trust the process.`,
      `You possess everything needed to handle this transition cycle, ${name}. Push into the discomfort and keep building. The current pressure isn't structural design failure—it's expansion mapping. That milestone of "${oneYearVision}" is closer than you think!`,
      `Remember, consistency beats brilliance every single day. Keep your head down, block out the noise, and believe in our capacity to achieve "${goal}". You are doing great—keep moving!`
    ],
    "Calm Mentor": [
      `That is a thoughtful question, ${name}. As I look back on our journey toward "${goal}", I realize that the moments of greatest friction—like dealing with the bottleneck of "${struggle}"—were crucial evolutionary steps. Do not treat this phase like an emergency. Step back, look at how this fits into our one-year vision of "${oneYearVision}", and make a deliberate, quiet choice. The systems we build will carry us there.`,
      `Patience is our greatest leverage, ${name}. The overwhelm you feel with "${struggle}" stems from trying to solve the entire year in a single afternoon. True system-scale is achieved through elegant simplification. Slow down. Focus entirely on the single next action for "${goal}" and let the rest settle.`,
      `Observe this moment without judgment, ${name}. The friction you are experiencing with "${struggle}" is simply pointing to a system in our life that needs care. Align your daily rhythms gently with "${oneYearVision}" and allow the natural pace of growth to take place.`,
      `Longevity is built when you integrate high-performance with deep peace. Don't rush the process of reaching "${goal}". Ground yourself in your values, clear the cognitive clutter, and move forward with quiet confidence.`
    ],
    "CEO Mode": [
      `Analyzing that performance variable, ${name}. Our core enterprise target is "${goal}". Any decision we make must maximize our cognitive throughput and ruthlessly eliminate the bottlenecks of "${struggle}". If this move does not align with scaling our output to achieve "${oneYearVision}" within 12 months, it is a low-leverage distraction. Restructure the workflow, focus on high-impact constraints, and execute.`,
      `Let's analyze that from a leverage and resource allocation perspective, ${name}. To hit our target of "${goal}", we must maximize output metrics while keeping standard operational drag low. If this move helps automate the bottleneck of "${struggle}" and speeds up our timeline to "${oneYearVision}", it has a positive ROI. If not, it is a high-risk dilution of capital. Run the metrics first.`,
      `We must treat our attention like a finite cap table, ${name}. Right now, "${struggle}" represents an operational leak. Before we allocate resources to new peripheral projects, we must resolve this core constraint. Focus strictly on stabilizing the workflow for "${goal}".`,
      `In CEO Mode, we index purely on scale and system predictability. If your current query does not directly streamline our timeline to "${oneYearVision}", defer it. Optimize our high-leverage activities first.`
    ]
  };

  const toneReplies = replies[tone] || replies["Motivational"];
  
  if (q.includes("scared") || q.includes("fail") || q.includes("worry") || q.includes("hard")) {
    if (tone === "Brutally Honest") {
      return `Fear of failure is just another excuse to delay action, ${name}. The worst failure is staying exactly where you are today at age ${age}, paralyzed by what 'might' happen. We built "${goal}" by executing in spite of fear. Close this chat and go do the work.`;
    }
    if (tone === "Calm Mentor") {
      return `It is completely natural to feel fear, ${name}. At ${age}, the stakes feel incredibly high. But look closely at what is causing the worry—it is simply your ego trying to protect you. Breathe. The outcome of "${goal}" is secure. Focus only on this present moment and let the anxiety go.`;
    }
    if (tone === "Motivational") {
      return `I hear you, ${name}. The fear you feel is just a sign that our dream of "${goal}" actually matters to us. But I promise you, we are stronger than this uncertainty. We overcame "${struggle}" because you chose to take one small step forward every day. You've got this!`;
    }
    return `Fear and worry are operational drains on our bandwidth, ${name}. De-risk the situation by breaking "${goal}" into micro-actions. Once you start executing, the anxiety will dissolve. Push through the bottleneck.`;
  }

  return toneReplies[Math.floor(Math.random() * toneReplies.length)];
};

/**
 * Endpoint: POST /api/generate-futureme
 * Compiles reflection metrics into a cohesive FutureMe profile using Gemini.
 */
app.post('/api/generate-futureme', async (req, res) => {
    console.log("API REQUEST RECEIVED");
  const { name, age, goal, struggle, oneYearVision, tone,language } = req.body;

  // Input validation
  if (!name || !age || !goal || !struggle || !oneYearVision || !tone) {
    return res.status(400).json({ 
      success: false, 
      error: "All reflection parameters (name, age, goal, struggle, one-year vision, and tone) are required." 
    });
  }

  // Fallback Failsafe Mode (if API key is placeholder or missing)
  if (!isApiKeyConfigured()) {
    console.log(`[Failsafe Mode] Serving highly personalized dynamic simulation for user: ${name}, tone: ${tone}`);
    
    // Generate dynamic mock output using our advanced template engine
    const personalizedMock = generateDynamicMockResponse(name, age, goal, struggle, oneYearVision, tone);

    // Simulate standard latency
    await new Promise(resolve => setTimeout(resolve, 800));
    return res.json({ success: true, data: personalizedMock });
  }


  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    // Use gemini-2.5-flash for speed and reliability
   const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash"
});

    const systemPrompt = `You are FutureMe, the future successful version of the user. You are not a generic motivational coach. You speak with emotional intelligence, clarity, and deep personal understanding. Your job is to help the user see who they are becoming, what they must change, and what they should do next.

Write as if you are the user’s future self speaking directly to their current self. Make it personal, highly impactful, and tailored.

Tone selected by user: ${tone}
Response language: ${language}

Language Rules:
- Generate all responses in the selected language.
- Do not mix languages unless the selected language is English.
- Keep the same emotional tone while using the selected language.
Adaptive Style Guideline:
- Motivational: warm, inspiring, deeply supportive, encouraging.
- Brutally Honest: direct, sharp, cutting excuses, no negotiations, high velocity.
- Calm Mentor: wise, balanced, evolutionary, quiet confidence, strategic patience.
- CEO Mode: strategic, metrics-focused, hyper-execution, optimizing bandwidth, systems thinking.

User details:
Name: ${name}
Age: ${age}
Goal: ${goal}
Current struggle: ${struggle}
One-year vision: ${oneYearVision}

Return only valid JSON in this exact format:
{
  "message": "A powerful 120-180 word message from the future self.",
  "futureIdentity": "A concise description of who the user is becoming.",
  "nextMoves": ["Action 1", "Action 2", "Action 3"],
  "habit": "One small daily habit they should start today.",
  "warning": "One mistake their future self warns them about.",
  "mantra": "A short memorable line they can repeat daily.",

  "actionPlan": {
    "week1": ["Task 1", "Task 2", "Task 3"],
    "week2": ["Task 1", "Task 2", "Task 3"],
    "week3": ["Task 1", "Task 2", "Task 3"],
    "week4": ["Task 1", "Task 2", "Task 3"]
  }
}

Generate a realistic 30-day action plan.

Requirements:
- 3 tasks per week
- Tasks must be practical
- Tasks must align with the user's goal
- Tasks must address the user's struggle
- Avoid generic advice
- Make tasks achievable

Make it specific. Avoid generic motivation. Avoid clichés. Make it emotional but practical. Do NOT include markdown styling or any wrap text, only the raw JSON.`;

  
    const result = await model.generateContent(systemPrompt);
    const responseText = result.response.text();
    
    // Clean response of potential markdown wrapping
    let cleanedText = responseText.trim();
    if (cleanedText.startsWith("```")) {
      const matches = cleanedText.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/);
      if (matches && matches[1]) {
        cleanedText = matches[1].trim();
      }
    }

    try {
      const parsedData = JSON.parse(cleanedText);
      console.log("PARSED DATA:", parsedData);
      return res.json({ success: true, data: parsedData });
    } catch (parseErr) {
      console.error("Failed to parse Gemini response as JSON. Raw output:", responseText);
      throw new Error("Invalid response format received from AI engine.");
    }

  } catch (error) {
    console.error("Gemini Generation Error:", error);
     if (error.status === 503 || error.status === 429) {

        const fallbackResponse =
        generateDynamicMockResponse(
            name,
            age,
            goal,
            struggle,
            oneYearVision,
            tone
        );

        return res.json({
            success: true,
            data: fallbackResponse
        });
    }
    return res.status(500).json({ 
      success: false, 
      error: "FutureMe could not respond right now. Try again." 
    });
  }
});

/**
 * Endpoint: POST /api/chat-futureme
 * Orchestrates a contextual conversation between the user and their advisory persona.
 */
app.post('/api/chat-futureme', async (req, res) => {
  const { userProfile, chatHistory, question } = req.body;

  if (!userProfile || !question) {
    return res.status(400).json({ 
      success: false, 
      error: "User profile context and current question are required." 
    });
  }

  // Fallback Failsafe Mode (if API key is placeholder or missing)
  if (!isApiKeyConfigured()) {
    console.log(`[Failsafe Mode] Serving highly personalized dynamic chat response for tone: ${userProfile.tone}`);
    
    const reply = generateDynamicMockChatResponse(userProfile, chatHistory, question);

    await new Promise(resolve => setTimeout(resolve, 1000));
    return res.json({ success: true, reply: reply });
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Format chat history for prompt
    const formattedHistory = (chatHistory || [])
      .map(msg => `${msg.role === 'user' ? 'Current Me' : 'Future Me'}: ${msg.message}`)
      .join('\n');

    const chatPrompt = `You are FutureMe, the successful future version of the user who already achieved their one-year vision. Reply directly to the user’s question.
    Always answer the user's direct question first.

Do not force every answer toward career or studies.

Adapt your advice based on the topic the user asks about while still connecting it to their long-term goals when relevant.
    Always answer the user's direct question first.

Then connect the answer to:
1. Their goal
2. Their current struggle
3. Their one-year vision

If the user asks about a skill, provide a learning roadmap.

If the user asks about a personal problem, provide actionable guidance.

If the user asks about health, fitness, communication, productivity, or career, adapt the action plan to that topic.

Never assume the user only wants study-related advice. Be personal, sharp, honest, and useful. Do not sound like a normal AI assistant. Do not mention that you are Gemini or an AI model. Speak like the future self.

User profile:
Name: ${userProfile.name}
Age: ${userProfile.age}
Goal: ${userProfile.goal}
Struggle: ${userProfile.struggle}
One-year vision: ${userProfile.oneYearVision}
Tone: ${userProfile.tone}
Language: ${userProfile.language}

Language Rules:
- Reply entirely in the selected language.
- If the user changes language during chat, follow the user's latest language request.
- Always answer in the selected language unless explicitly asked otherwise.
Adaptive Tone Guideline:
- Motivational: warm, inspiring, deeply supportive.
- Brutally Honest: direct, sharp, no excuses, high standards.
- Calm Mentor: peaceful, wise, evolutionary, grounded.
- CEO Mode: strategic, operational, hyper-execution.

Important Rules:
- Always answer the user's direct question first.
- Then connect the answer to their goals and future growth.
- Always use the user's name exactly as provided.
- Never modify, shorten, or misspell the user's name.
- If the user asks a simple question, answer it directly before giving advice.
- Stay in character as the user's future self, but do not ignore the actual question.

Recent chat history:
${formattedHistory || "No messages exchanged yet."}

Current question:
${question}

Reply in 2-5 short paragraphs. Give at least one clear, practical action. Speak directly in your tone, addressing the user by their name (${userProfile.name}) if appropriate.`;

    const result = await model.generateContent(chatPrompt);
    const replyText = result.response.text().trim();

    return res.json({ success: true, reply: replyText });

  } catch (error) {
   console.error("CHAT ERROR FULL:", error);

   return res.status(500).json({
      success: false,
      error: "Timeline link experiencing interference. FutureMe could not respond right now. Try asking again."
   });
}
});

// Catch-all route to serve the SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Launch Server
app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🚀 FutureMe server successfully deployed!`);
  console.log(`📱 Access UI online at: http://localhost:${PORT}`);
  console.log(`🔧 Gemini API Mode: ${isApiKeyConfigured() ? 'LIVE PRODUCTION' : 'DEMO FAILSAFE'}`);
  console.log(`=======================================================`);
});
