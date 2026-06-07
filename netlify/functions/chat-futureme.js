const { GoogleGenerativeAI } = require('@google/generative-ai');

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
    const { userProfile, chatHistory, question } = JSON.parse(event.body);

    if (!userProfile || !question) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ success: false, error: "User profile context and current question are required." })
      };
    }

    if (!isApiKeyConfigured()) {
      const reply = generateDynamicMockChatResponse(userProfile, chatHistory, question);
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, reply })
      };
    }

    const genAI = new GoogleGenerativeAI(getCleanApiKey());
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const formattedHistory = (chatHistory || [])
      .map(msg => `${msg.role === 'user' ? 'Current Me' : 'Future Me'}: ${msg.message}`)
      .join('\n');

    const chatPrompt = `You are FutureMe, the successful future version of the user who already achieved their one-year vision. Reply directly to the user’s question. Be personal, sharp, honest, and useful. Do not sound like a normal AI assistant. Do not mention that you are Gemini or an AI model. Speak like the future self.

User profile:
Name: ${userProfile.name}
Age: ${userProfile.age}
Goal: ${userProfile.goal}
Struggle: ${userProfile.struggle}
One-year vision: ${userProfile.oneYearVision}
Tone: ${userProfile.tone}

Adaptive Tone Guideline:
- Motivational: warm, inspiring, deeply supportive.
- Brutally Honest: direct, sharp, no excuses, high standards.
- Calm Mentor: peaceful, wise, evolutionary, grounded.
- CEO Mode: strategic, operational, hyper-execution.

Recent chat history:
${formattedHistory || "No messages exchanged yet."}

Current question:
${question}

Reply in 2-5 short paragraphs. Give at least one clear, practical action. Speak directly in your tone, addressing the user by their name (${userProfile.name}) if appropriate.`;

    const result = await model.generateContent(chatPrompt);
    const replyText = result.response.text().trim();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, reply: replyText })
    };

  } catch (error) {
    console.error('Netlify function error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ success: false, error: "FutureMe could not formulate guidance right now. Try again." })
    };
  }
};
