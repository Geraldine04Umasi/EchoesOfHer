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
  const [moderation, setModeration] = useState(null); // { flagged, reason }
  const [showWarning, setShowWarning] = useState(false);

  const pickerRef = useRef(null);

  // Manejo de emojis
  const handleEmojiClick = (emojiData) => {
    setContent((prev) => prev + emojiData.emoji);
  };

  // Función central para enviar la historia al backend
  const submitStory = async (storyData) => {
    try {
      const res = await fetch("http://localhost:5000/stories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(storyData),
      });

      const savedStory = await res.json();
      if (onStoryCreated) onStoryCreated(savedStory);

      // Limpiar formulario
      setTitle("");
      setContent("");
      setCategory("discrimination");
      setAcceptedGuidelines(false);
      setModeration(null);
      setShowWarning(false);
    } catch (error) {
      console.error("Error creating story:", error);
    }
  };

  // Manejo de submit principal
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!acceptedGuidelines) {
      alert("You must accept the guidelines before submitting your story.");
      return;
    }

    try {
      // 1️⃣ Enviar a IA para moderación
      const checkRes = await fetch("http://localhost:5000/stories/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
      const checkData = await checkRes.json();

      if (checkData.flagged) {
        setModeration(checkData);
        setShowWarning(true); // muestra la advertencia
        return; // no publica aún
      }

      // 2️⃣ Publicar si no hay problema
      await submitStory({
        title,
        content,
        category,
        flagged: false,
        flagReason: null,
        aiResponse: null,
        acceptedGuidelines: true,
      });
    } catch (error) {
      console.error("Moderation error:", error);
      alert("There was an error checking your story. Please try again.");
    }
  };

  // Publish anyway si usuario ignora advertencia
  const handlePublishAnyway = async () => {
    if (!moderation) return;

    await submitStory({
      title,
      content,
      category,
      flagged: true,
      flagReason: moderation.reason,
      aiResponse: null,
      acceptedGuidelines: true,
    });
  };

  // Editar historia después de advertencia
  const handleEditStory = () => {
    setShowWarning(false);
  };

  // Cerrar picker si clic afuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
          className="w-full p-3 pr-12 pb-12 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 transition resize-none"
        />

        {/* Emoji Button */}
        <button
          type="button"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="absolute bottom-3 right-3 text-gray-400 hover:text-purple-600 hover:scale-110 transition"
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

      {/* Moderation warning */}
      {showWarning && moderation && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg mt-4">
          <p className="font-semibold text-yellow-800 mb-2">
            ⚠️ Before publishing
          </p>
          <p className="text-yellow-700 mb-2">
            Our AI detected that your story might include sensitive content.
          </p>
          <p className="text-yellow-700 mb-4">Reason: {moderation.reason}</p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleEditStory}
              className="bg-gray-200 p-2 rounded-lg hover:bg-gray-300 transition"
            >
              Edit Story
            </button>
            <button
              type="button"
              onClick={handlePublishAnyway}
              className="bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 transition"
            >
              Publish Anyway
            </button>
          </div>
        </div>
      )}
    </form>
  );
}

export default StoryForm;
