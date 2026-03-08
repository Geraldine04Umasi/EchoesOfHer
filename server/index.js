const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const Story = require("./models/story");
const app = express();

app.use(cors());
app.use(express.json());

//Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected 💜"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("Echoes of Her API running");
});

app.post("/stories", async (req, res) => {
  try {
    const { title, content, category } = req.body;

    const newStory = new Story({
      title,
      content,
      category
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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});