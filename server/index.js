const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const Story = require("./models/story");
const OpenAI = require("openai").default;  

const app = express();

const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,        
  baseURL: "https://api.groq.com/openai/v1" 
});

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://echoes-of-her.vercel.app" 
  ]
}));
app.use(express.json());

//Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected 💜"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("Echoes of Her API running");
});

// Endpoint de moderación
app.post("/stories/check", async (req, res) => {
  try {
    const { title, content } = req.body;

    const completion = await openai.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: [
        {
          role: "system",
          content: `You are a content moderator for a platform where women share stories about their experiences in tech.
          
Analyze the story and detect if it contains:
1. Full names of real people (e.g. "Juan Pérez", "John Smith")
2. Company or brand names (e.g. "Microsoft", "Google", "Amazon")
3. Offensive, violent, or harmful language

Respond ONLY with a valid JSON object, no extra text:
{
  "flagged": true or false,
  "reason": "explanation in English if flagged, null if not"
}`
        },
        {
          role: "user",
          content: `Title: ${title}\n\nContent: ${content}`
        }
      ],
      temperature: 0,
    });

    const raw = completion.choices[0].message.content.trim();
    const result = JSON.parse(raw);

    res.json(result);
  } catch (error) {
    console.error("IA Moderation error:", error);
    res.status(500).json({ error: "Error checking story content" });
  }
});

app.post("/stories", async (req, res) => {
  try {
    const { title, content, category, flagged, flagReason, aiResponse } =
      req.body;

    const newStory = new Story({
      title,
      content,
      category,
      flagged: flagged || false,
      flagReason: flagReason || null,
      aiResponse: aiResponse || null,
    });

    const savedStory = await newStory.save();

    res.status(201).json(savedStory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/stories", async (req, res) => {
  try {
    const stories = await Story.find().sort({ createdAt: -1 });
    res.json(stories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.patch("/stories/:id/like", async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);

    if (!story) {
      return res.status(404).json({ error: "Story not found" });
    }

    story.likes += 1;

    const updatedStory = await story.save();

    res.json(updatedStory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint AI Support Message
app.post("/stories/:id/ai-support", async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) return res.status(404).json({ error: "Story not found" });

    const completion = await openai.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `You are a warm and empathetic AI companion on a platform where women share their experiences in tech.
          
Your job is to read a story and write a short, heartfelt message of support and encouragement (2-3 sentences max).
- Be genuine, warm and empathetic
- Acknowledge their experience specifically
- End with an empowering message
- Write in the same language as the story (Spanish or English)
- Do NOT use generic phrases like "Thank you for sharing"
- Respond ONLY with the support message, no extra text`
        },
        {
          role: "user",
          content: `Title: ${story.title}\n\nStory: ${story.content}`
        }
      ],
      temperature: 0.7,
    });

    const aiResponse = completion.choices[0].message.content.trim();

    // Guardar en la historia
    story.aiResponse = aiResponse;
    await story.save();

    res.json({ aiResponse });
  } catch (error) {
    console.error("AI Support error:", error);
    res.status(500).json({ error: "Error generating support message" });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
