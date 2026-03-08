const mongoose = require("mongoose");

const storySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: [
        "discrimination",
        "career_growth",
        "first_job",
        "impostor_syndrome",
        "advice",
      ],
      required: true,
    },

    likes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Story", storySchema);