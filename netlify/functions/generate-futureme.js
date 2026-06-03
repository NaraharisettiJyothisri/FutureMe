const { GoogleGenerativeAI } = require('@google/generative-ai');

// Advanced Generative Phrase Synthesis Engine (Mimics real-time LLM reasoning like ChatGPT/Gemini)
const generateDynamicMockResponse = (name, age, goal, struggle, oneYearVision, tone) => {
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

  const opener = selectRandom(toneDict.openers);
  const goalPhrase = selectRandom(toneDict.goals);
  const strugglePhrase = selectRandom(toneDict.struggles);
  const visionPhrase = selectRandom(toneDict.visions);

  const messageText = `${opener} ${goalPhrase} ${strugglePhrase} ${visionPhrase}`;

  const movesSet = selectRandom(toneDict.moves);
  const habitText = selectRandom(toneDict.habits);
  const warningText = selectRandom(toneDict.warnings);
  const mantraText = selectRandom(toneDict.mantras);

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
    isMock: true
  };
};

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

const isApiKeyConfigured = () => {
  const key = getCleanApiKey();
  return key !== '' && 
         key !== 'your_gemini_api_key_here' && 
         key !== 'your_actual_gemini_api_key_here' &&
         key !== 'replace_with_your_gemini_api_key' &&
         key !== 'your_api_key_here';
};

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ success: false, error: 'Method Not Allowed' }) };
  }

  try {
    const { name, age, goal, struggle, oneYearVision, tone } = JSON.parse(event.body);

    if (!name || !age || !goal || !struggle || !oneYearVision || !tone) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ success: false, error: "All parameters are required." })
      };
    }

    if (!isApiKeyConfigured()) {
      const data = generateDynamicMockResponse(name, age, goal, struggle, oneYearVision, tone);
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, data })
      };
    }

    const genAI = new GoogleGenerativeAI(getCleanApiKey());
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const systemPrompt = `You are FutureMe, the future successful version of the user. You are not a generic motivational coach. You speak with emotional intelligence, clarity, and deep personal understanding. Your job is to help the user see who they are becoming, what they must change, and what they should do next.

Write as if you are the user’s future self speaking directly to their current self. Make it personal, highly impactful, and tailored.

Tone selected by user: ${tone}
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
  "message": "A powerful 120-180 word message from the future self. Incorporate direct references to their goal, struggle, and vision.",
  "futureIdentity": "A concise description of who the user is becoming (e.g. 'The High-Performance Enterprise Engine', 'The Calm Catalyst').",
  "nextMoves": ["Action 1", "Action 2", "Action 3"],
  "habit": "One small daily habit they should start today.",
  "warning": "One mistake their future self warns them about.",
  "mantra": "A short memorable line they can repeat daily."
}

Make it specific. Avoid generic motivation. Avoid clichés. Make it emotional but practical. Do NOT include markdown styling or any wrap text, only the raw JSON.`;

    const result = await model.generateContent(systemPrompt);
    const responseText = result.response.text();
    
    let cleanedText = responseText.trim();
    if (cleanedText.startsWith("```")) {
      const matches = cleanedText.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/);
      if (matches && matches[1]) {
        cleanedText = matches[1].trim();
      }
    }

    const parsedData = JSON.parse(cleanedText);
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, data: parsedData })
    };

  } catch (error) {
    console.error('Netlify function error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ success: false, error: "FutureMe could not respond right now. Try again." })
    };
  }
};
