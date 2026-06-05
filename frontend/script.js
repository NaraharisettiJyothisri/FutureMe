/* --- FUTUREME INTERACTIVE STATE ENGINE --- */
let userProfileState = null;
let chatHistoryState = [];

// Clean relative endpoint calls if running under file:// protocols
const getApiUrl = (endpoint) => {
    if (window.location.protocol === 'file:') {
        return `http://localhost:5000${endpoint}`;
    }
    return endpoint;
};

document.addEventListener('DOMContentLoaded', () => {
    initFormEngine();
    initChatEngine();
    initActionUtilities();
});

// Toast notification alerts
function showToast(message) {
    const toast = document.getElementById('toast-notification');
    if (!toast) return;
    
    toast.innerText = message;
    toast.style.opacity = '1';
    
    setTimeout(() => {
        toast.style.opacity = '0';
    }, 3500);
}

// Form Submission & API Pipeline
function initFormEngine() {
    const form = document.getElementById('reflectionForm');
    const submitBtn = document.getElementById('submit-btn');
    const formContainer = document.getElementById('form-container');
    const loadingExperience = document.getElementById('loading-experience');
    const progressFill = document.getElementById('progress-fill');
    const loaderStatusText = document.getElementById('loader-status-text');

    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Capture user reflection metrics
        userProfileState = {
            name: document.getElementById('form-name').value.trim(),
            age: document.getElementById('form-age').value.trim(),
            goal: document.getElementById('form-goal').value.trim(),
            struggle: document.getElementById('form-struggle').value.trim(),
            oneYearVision: document.getElementById('form-vision').value.trim(),
            tone: document.getElementById('form-tone').value
        };

        // Transition UI state to Loading Experience
        submitBtn.disabled = true;
        formContainer.classList.add('hidden');
        loadingExperience.style.display = 'flex';
        loaderStatusText.innerText = "Creating your future identity...";
        progressFill.style.width = '0%';

        // Dynamic visual loader interpolation
        let artificialProgress = 0;
        const progressInterval = setInterval(() => {
            if (artificialProgress < 90) {
                // Grow quickly at first, then slow down as it approaches 90%
                const increment = Math.max(1, Math.round((90 - artificialProgress) / 8));
                artificialProgress += increment;
                progressFill.style.width = `${artificialProgress}%`;

                if (artificialProgress > 35 && artificialProgress < 70) {
                    loaderStatusText.innerText = "Calibrating continuum timelines...";
                } else if (artificialProgress >= 70) {
                    loaderStatusText.innerText = "Decrypting identity profiles...";
                }
            }
        }, 1500 / 10); // Standard speed increments

        try {
            // Trigger POST Request to Gemini backend
            const response = await fetch(getApiUrl('/api/generate-futureme'), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userProfileState)
            });

            const result = await response.json();

            clearInterval(progressInterval);

            if (result.success && result.data) {
                // Fill progress to 100% and notify user
                progressFill.style.width = '100%';
                loaderStatusText.innerText = "Transmission Decrypted!";

                // Short aesthetic delay for completeness
                setTimeout(() => {
                    loadingExperience.style.display = 'none';
                    renderReflectionResult(result.data);
                }, 400);
            } else {
                throw new Error(result.error || "Server failed to compile data.");
            }

        } catch (error) {
            clearInterval(progressInterval);
            console.error("API Integration Error:", error);
            
            // Revert state
            loadingExperience.style.display = 'none';
            formContainer.classList.remove('hidden');
            submitBtn.disabled = false;
            
            showToast("FutureMe could not respond right now. Try again.");
        }
    });
}

// Dynamically Inject Transmitted Profile Data
function renderReflectionResult(data) {
    const targetHorizonYear = new Date().getFullYear() + 1;

    // Show secure badge status (demo indication is helpful for Nitish's Sunday review)
    const badge = document.getElementById('result-badge');
    if (badge) {
        badge.innerText = data.isMock ? "Transmission (Demo Simulation)" : "Transmission Secure";
        if (data.isMock) {
            badge.style.borderColor = 'rgba(255, 159, 10, 0.4)';
            badge.style.color = '#ff9f0a';
            badge.style.background = 'rgba(255, 159, 10, 0.05)';
        } else {
            badge.style.borderColor = 'rgba(0, 122, 255, 0.3)';
            badge.style.color = '#0dbcff';
            badge.style.background = 'rgba(0, 122, 255, 0.05)';
        }
    }

    // Bind parameters to outcome cards
    document.getElementById('result-date').innerText = `October 14, ${targetHorizonYear}`;
    document.getElementById('res-identity').innerText = data.futureIdentity || `${userProfileState.tone} Version (${userProfileState.name})`;
    document.getElementById('res-message').innerHTML = `"${data.message || ''}"`;
    
    // Inject moves checklist
    const movesList = document.getElementById('res-moves');
    movesList.innerHTML = '';
    if (Array.isArray(data.nextMoves)) {
        data.nextMoves.forEach(move => {
            const li = document.createElement('li');
            li.innerText = move;
            movesList.appendChild(li);
        });
    }

    document.getElementById('res-habit').innerText = data.habit || "Formulate focus daily.";
    document.getElementById('res-warning').innerText = data.warning || "Maintain consistency above all.";
    document.getElementById('res-mantra').innerText = data.mantra || "Keep building.";

    const actionPlanContainer =
document.getElementById('action-plan');

if (actionPlanContainer && data.actionPlan) {

actionPlanContainer.innerHTML = `

<h5>Week 1</h5>
<ul>
${data.actionPlan.week1.map(task =>
`<li>${task}</li>`).join("")}
</ul>

<h5>Week 2</h5>
<ul>
${data.actionPlan.week2.map(task =>
`<li>${task}</li>`).join("")}
</ul>

<h5>Week 3</h5>
<ul>
${data.actionPlan.week3.map(task =>
`<li>${task}</li>`).join("")}
</ul>

<h5>Week 4</h5>
<ul>
${data.actionPlan.week4.map(task =>
`<li>${task}</li>`).join("")}
</ul>

`;
}

    // Configure initial chat context greeting
    document.getElementById('chat-initial-greeting').innerText = `Data bridge secure. Hello ${userProfileState.name}, I am your future self operating in a ${userProfileState.tone} framework. Ask me anything about scaling past our current bottleneck of "${userProfileState.struggle}"...`;

    // Clear previous chat lists
    const chatStream = document.getElementById('chat-stream');
    chatStream.innerHTML = '';
    
    const initialGreetingBubble = document.createElement('div');
    initialGreetingBubble.className = 'chat-bubble future-self';
    initialGreetingBubble.id = 'chat-initial-greeting';
    initialGreetingBubble.innerText = `Data bridge secure. Hello ${userProfileState.name}, I am your future self operating in a ${userProfileState.tone} framework. Ask me anything about scaling past our current bottleneck of "${userProfileState.struggle}"...`;
    chatStream.appendChild(initialGreetingBubble);

    chatHistoryState = []; // Reset active conversation memory

    // Show output layout
    const resultExperience = document.getElementById('result-experience');
    resultExperience.classList.remove('hidden');
    resultExperience.scrollIntoView({ behavior: 'smooth' });
}

// Chat engine contextual thread pipeline
function initChatEngine() {
    const btnStartChat = document.getElementById('btn-start-chat');
    const chatModule = document.getElementById('chat-module');
    const btnSendChat = document.getElementById('btn-send-chat');
    const chatInputField = document.getElementById('chat-input-field');
    const chatStream = document.getElementById('chat-stream');
    const chatTyping = document.getElementById('chat-typing');

    if (!btnStartChat) return;

    btnStartChat.addEventListener('click', () => {
        chatModule.classList.remove('hidden');
        chatModule.scrollIntoView({ behavior: 'smooth' });
        btnStartChat.classList.add('hidden');
        chatInputField.focus();
    });

    async function handleUserChatMessage() {
        const query = chatInputField.value.trim();
        if (!query) return;

        // Render user message bubble
        const userBubble = document.createElement('div');
        userBubble.className = 'chat-bubble user';
        userBubble.innerText = query;
        chatStream.appendChild(userBubble);
        
        chatInputField.value = '';
        chatStream.scrollTop = chatStream.scrollHeight;

        // Freeze controls while AI synthesizes reply
        chatInputField.disabled = true;
        btnSendChat.disabled = true;
        chatTyping.classList.remove('hidden');

        try {
            // Call POST /api/chat-futureme
            const response = await fetch(getApiUrl('/api/chat-futureme'), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userProfile: userProfileState,
                    chatHistory: chatHistoryState,
                    question: query
                })
            });

            const result = await response.json();

            chatTyping.classList.add('hidden');

            if (result.success && result.reply) {
                // Render future-self reply bubble
                const responseBubble = document.createElement('div');
                responseBubble.className = 'chat-bubble future-self';
                responseBubble.innerText = result.reply;
                chatStream.appendChild(responseBubble);

                // Commit message pair to history state for conversational memory
                chatHistoryState.push({ role: 'user', message: query });
                chatHistoryState.push({ role: 'futureme', message: result.reply });
            } else {
                throw new Error(result.error || "Failed to formulate guidance.");
            }

        } catch (error) {
            console.error("Chat API Error:", error);
            chatTyping.classList.add('hidden');

            const errorBubble = document.createElement('div');
            errorBubble.className = 'chat-bubble future-self';
            errorBubble.style.borderColor = 'rgba(255, 59, 48, 0.2)';
            errorBubble.style.background = 'rgba(255, 59, 48, 0.05)';
            errorBubble.innerText = "Timeline link experiencing interference. FutureMe could not respond right now. Try asking again.";
            chatStream.appendChild(errorBubble);
        } finally {
            // Reactivate interface controls
            chatInputField.disabled = false;
            btnSendChat.disabled = false;
            chatInputField.focus();
            chatStream.scrollTop = chatStream.scrollHeight;
        }
    }

    btnSendChat.addEventListener('click', handleUserChatMessage);
    chatInputField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleUserChatMessage();
    });
}

// Actions Utility (Clipboard copies and dynamic reset engines)
function initActionUtilities() {
    const btnCopy = document.getElementById('btn-copy');
    const btnRegenerate = document.getElementById('btn-regenerate');

    if (btnCopy) {
        btnCopy.addEventListener('click', () => {
            const message = document.getElementById('res-message').innerText;
            const mantra = document.getElementById('res-mantra').innerText;
            const identity = document.getElementById('res-identity').innerText;
            
            const fullCopiedText = `FutureMe Strategy Matrix for ${userProfileState.name}:\n` +
                                   `Identity: ${identity}\n\n` +
                                   `Advisory:\n${message}\n\n` +
                                   `Alignment Mantra: "${mantra}"\n\n` +
                                   `Generated via Nitish's Founder Labs.`;
            
            navigator.clipboard.writeText(fullCopiedText)
                .then(() => showToast('Strategy matrix successfully copied to clipboard.'))
                .catch(() => showToast('Clipboard injection blocked. Check local authorization details.'));
        });
    }

    if (btnRegenerate) {
        btnRegenerate.addEventListener('click', () => {
            // Hide result experience blocks
            document.getElementById('result-experience').classList.add('hidden');
            document.getElementById('chat-module').classList.add('hidden');
            document.getElementById('btn-start-chat').classList.remove('hidden');
            
            const formContainer = document.getElementById('form-container');
            const submitBtn = document.getElementById('submit-btn');
            
            // Clear inputs
            document.getElementById('reflectionForm').reset();
            formContainer.classList.remove('hidden');
            submitBtn.disabled = false;
            
            // Restore scroll heights
            document.getElementById('reflection-core').scrollIntoView({ behavior: 'smooth' });
        });
    }
}
