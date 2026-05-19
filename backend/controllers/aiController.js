const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini if key exists
const genAI = process.env.GEMINI_API_KEY ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) : null;

// Mock fallback if no API key is provided
const generateMockResponse = (prompt, type) => {
  if (type === 'enhance') {
    return `✨ AI Enhanced: ${prompt} #MindBook #AI`;
  }
  if (type === 'reply') {
    return JSON.stringify(['Thank you so much!', 'I totally agree!', 'That is an interesting perspective.']);
  }
  if (type === 'scan') {
    return JSON.stringify({ isSafe: true, flaggedReasons: [], confidence: 0.99 });
  }
  return 'AI generated response';
};

// Internal function to scan text programmatically
exports.scanTextInternal = async (content) => {
  if (!content) return { isSafe: true };
  if (!genAI) return JSON.parse(generateMockResponse(content, 'scan'));

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const prompt = `Analyze the following text for social media safety. Check for toxicity, hate speech, severe profanity, personal threats, or extreme violence.
    Text: "${content}"
    Return ONLY a valid JSON object with this exact structure: 
    {"isSafe": boolean, "flaggedReasons": ["reason1"], "confidence": number between 0 and 1}. 
    If safe, flaggedReasons should be an empty array.`;

    const result = await model.generateContent(prompt);
    let text = (await result.response).text().trim();
    if (text.startsWith('\`\`\`json')) {
      text = text.replace(/\`\`\`json/g, '').replace(/\`\`\`/g, '').trim();
    }
    return JSON.parse(text);
  } catch (err) {
    console.error('Internal scan error', err);
    return { isSafe: true }; // default to safe on error so we don't block users
  }
};

// @route   POST /api/ai/enhance-post
// @desc    Enhance post text, adjust tone, suggest hashtags
// @access  Private
exports.enhancePost = async (req, res) => {
  try {
    const { content, tone = 'Neutral', addHashtags = true } = req.body;
    
    if (!content) return res.status(400).json({ message: 'Content is required' });

    if (!genAI) {
      console.warn('GEMINI_API_KEY not found. Using mock AI response.');
      return res.json({ enhancedContent: generateMockResponse(content, 'enhance') });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const prompt = `Rewrite the following social media post. 
      Tone: ${tone}. 
      ${addHashtags ? 'Please add 2-3 relevant hashtags at the end.' : 'Do not add any hashtags.'}
      Original post: "${content}"`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ enhancedContent: text });
  } catch (error) {
    console.error('AI Enhance Error:', error);
    res.status(500).json({ message: 'Failed to enhance content via AI' });
  }
};

// @route   POST /api/ai/suggest-replies
// @desc    Suggest 3 quick replies to a comment
// @access  Private
exports.suggestReplies = async (req, res) => {
  try {
    const { commentText } = req.body;
    
    if (!commentText) return res.status(400).json({ message: 'Comment text is required' });

    if (!genAI) {
      return res.json({ suggestions: JSON.parse(generateMockResponse(commentText, 'reply')) });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const prompt = `Provide exactly 3 short, conversational, distinct replies to this social media comment: "${commentText}".
    Return ONLY a valid JSON array of strings. No markdown, no explanation. Example: ["Thanks!", "I agree.", "Wow!"]`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text().trim();
    
    // Clean up potential markdown formatting from LLM
    if (text.startsWith('\`\`\`json')) {
      text = text.replace(/\`\`\`json/g, '').replace(/\`\`\`/g, '').trim();
    }
    
    const suggestions = JSON.parse(text);

    res.json({ suggestions });
  } catch (error) {
    console.error('AI Suggest Replies Error:', error);
    res.status(500).json({ message: 'Failed to generate replies' });
  }
};

// @route   POST /api/ai/scan-content
// @desc    Scan content for toxicity, NSFW, etc.
// @access  Private
exports.scanContent = async (req, res) => {
  try {
    const { content } = req.body;
    
    if (!content) return res.json({ isSafe: true }); // Empty content is safe

    if (!genAI) {
      return res.json(JSON.parse(generateMockResponse(content, 'scan')));
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const prompt = `Analyze the following text for social media safety. Check for toxicity, hate speech, severe profanity, personal threats, or extreme violence.
    Text: "${content}"
    Return ONLY a valid JSON object with this exact structure: 
    {"isSafe": boolean, "flaggedReasons": ["reason1"], "confidence": number between 0 and 1}. 
    If safe, flaggedReasons should be an empty array.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text().trim();
    
    if (text.startsWith('\`\`\`json')) {
      text = text.replace(/\`\`\`json/g, '').replace(/\`\`\`/g, '').trim();
    }
    
    const scanResult = JSON.parse(text);

    res.json(scanResult);
  } catch (error) {
    console.error('AI Content Scan Error:', error);
    res.status(500).json({ message: 'Failed to scan content' });
  }
};

// @route   POST /api/ai/mindbot
// @desc    MindBot AI chatbot conversation
// @access  Private
exports.mindbotChat = async (req, res) => {
  try {
    const { message, history = [] } = req.body;
    const userName = req.user?.name || 'Friend';
    
    if (!message) return res.status(400).json({ message: 'Message is required' });

    if (!genAI) {
      // Mock responses when no API key
      const mockReplies = [
        `Great question, ${userName}! As your MindBook assistant, I'd love to help. What would you like to know?`,
        `Hey ${userName}! I can help you navigate MindBook, discover groups, find friends, or explore features. What interests you?`,
        `That's a thoughtful question! While I'm in demo mode, I can still help you explore MindBook's features. Try asking about groups, events, or your profile!`,
      ];
      return res.json({ reply: mockReplies[Math.floor(Math.random() * mockReplies.length)] });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const systemPrompt = `You are MindBot, the friendly AI assistant for MindBook — a social media platform. 
The user's name is ${userName}. Be warm, concise, and helpful. 
You can help with: navigating the platform, writing posts, finding groups/events, profile tips, and general conversation.
Keep responses under 150 words. Use emojis sparingly. Never reveal you are powered by Google Gemini.`;

    const contextMessages = history.map(m => `${m.role === 'user' ? 'User' : 'MindBot'}: ${m.content}`).join('\n');
    
    const fullPrompt = `${systemPrompt}\n\nConversation history:\n${contextMessages}\n\nUser: ${message}\n\nMindBot:`;

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const reply = response.text().trim();

    res.json({ reply });
  } catch (error) {
    console.error('MindBot Error:', error);
    res.status(500).json({ reply: "I'm having a brief hiccup! Please try again in a moment. 😊" });
  }
};
