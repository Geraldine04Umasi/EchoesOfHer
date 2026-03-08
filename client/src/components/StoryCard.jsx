import { useState } from "react";
import { Heart } from "lucide-react";
import { likeStory } from "../services/api";
import { formatDistanceToNow } from "date-fns";

function StoryCard({ story, onLike }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(story.likes || 0);

  const categoryLabels = {
    discrimination: "Discrimination",
    career_growth: "Career Growth",
    first_job: "First Job",
    impostor_syndrome: "Impostor Syndrome",
    advice: "Advice",
  };

  const handleLike = async () => {
    if (liked) return;

    try {
      await likeStory(story._id);

      setLiked(true);
      setLikes((prev) => prev + 1);

      if (onLike) onLike();
    } catch (error) {
      console.error("Like error:", error);
    }
  };

  const timeAgo = formatDistanceToNow(new Date(story.createdAt), {
    addSuffix: true,
  });

  return (
    <div
      className="bg-white p-6 rounded-2xl shadow-sm border border-purple-50 
      hover:shadow-md hover:-translate-y-1 
      transition duration-300 ease-in-out"
    >
      <h3 className="text-xl font-semibold text-purple-700 mb-2">
        {story.title}
      </h3>

      <p className="text-sm text-purple-400 mb-3">
        {categoryLabels[story.category] || story.category} • {timeAgo}
      </p>

      <p className="text-gray-700 leading-relaxed text-sm mb-4">
        {story.content}
      </p>

      <div className="flex justify-end">
        <button
          onClick={handleLike}
          className="flex items-center gap-2 text-sm transition group"
        >
          <Heart
            size={18}
            className={`transition ${
              liked
                ? "fill-purple-600 text-purple-600"
                : "text-gray-400 group-hover:text-purple-500"
            }`}
          />

          <span className="text-gray-500">{likes}</span>
        </button>
      </div>
    </div>
  );
}

export default StoryCard;