import { useState, useRef, useEffect } from "react";
import EmojiPicker from "emoji-picker-react";
import { Link } from "react-router-dom";
import { Smile } from "lucide-react";

function StoryForm({ onStoryCreated }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("discrimination");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [acceptedGuidelines, setAcceptedGuidelines] = useState(false);

  const pickerRef = useRef(null);

  const handleEmojiClick = (emojiData) => {
    setContent((prev) => prev + emojiData.emoji);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!acceptedGuidelines) return;

    const newStory = { title, content, category };
    onStoryCreated(newStory);

    setTitle("");
    setContent("");
    setCategory("discrimination");
    setAcceptedGuidelines(false);
  };

  // Close emoji picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Title
        </label>
        <input
          type="text"
          placeholder="Give your story a title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
        />
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Category
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
        >
          <option value="discrimination">Discrimination</option>
          <option value="career_growth">Career Growth</option>
          <option value="first_job">First Job</option>
          <option value="impostor_syndrome">Impostor Syndrome</option>
          <option value="advice">Advice</option>
        </select>
      </div>

      {/* Story textarea */}
      <div className="relative">
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Your Story
        </label>

        <textarea
          placeholder="Share your experience in tech..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows="4"
          className="w-full p-3 pr-12 pb-12 rounded-xl border border-gray-200 
          focus:outline-none focus:ring-2 focus:ring-purple-400 
          transition resize-none"
        />

        {/* Emoji Button */}
        <button
          type="button"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="absolute bottom-3 right-3 text-gray-400 hover:text-purple-600 
  hover:scale-110 transition"
        >
          <Smile size={20} />
        </button>

        {/* Emoji Picker */}
        {showEmojiPicker && (
          <div ref={pickerRef} className="absolute bottom-12 right-0 z-10">
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}
      </div>

      {/* Guidelines checkbox */}
      <div className="flex items-start gap-2 text-sm text-gray-600">
        <input
          type="checkbox"
          checked={acceptedGuidelines}
          onChange={(e) => setAcceptedGuidelines(e.target.checked)}
          className="mt-1 accent-purple-600 cursor-pointer"
        />

        <p>
          I confirm that my story follows the{" "}
          <Link
            to="/guidelines"
            className="text-purple-600 font-medium hover:underline"
          >
            community guidelines
          </Link>{" "}
          and does not contain offensive or harmful content.
        </p>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={!acceptedGuidelines}
        className={`w-full py-3 rounded-xl shadow-md transition duration-300
        ${
          acceptedGuidelines
            ? "bg-purple-600 text-white hover:bg-purple-700 hover:shadow-lg"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        Submit Story
      </button>
    </form>
  );
}

export default StoryForm;
