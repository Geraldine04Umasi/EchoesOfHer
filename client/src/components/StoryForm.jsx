import { useState, useRef, useEffect } from "react";
import EmojiPicker from "emoji-picker-react";
import { Link } from "react-router-dom";
import { Smile } from "lucide-react";
import "./StoryForm.css";

function StoryForm({ onStoryCreated }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("discrimination");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [acceptedGuidelines, setAcceptedGuidelines] = useState(false);
  const [moderation, setModeration] = useState(null);
  const [showWarning, setShowWarning] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const pickerRef = useRef(null);

  const handleEmojiClick = (emojiData) => {
    setContent((prev) => prev + emojiData.emoji);
  };

  const submitStory = async (storyData) => {
    try {
      const res =  await fetch(import.meta.env.VITE_API_URL + "/stories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(storyData),
      });
      const savedStory = await res.json();
      if (onStoryCreated) onStoryCreated(savedStory);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!acceptedGuidelines) return;
    setIsChecking(true);
    try {
      const checkRes = await fetch(import.meta.env.VITE_API_URL + "/stories/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
      const checkData = await checkRes.json();
      if (checkData.flagged) {
        setModeration(checkData);
        setShowWarning(true);
        return;
      }
      await submitStory({ title, content, category, flagged: false, flagReason: null, aiResponse: null });
    } catch (error) {
      console.error("Moderation error:", error);
    } finally {
      setIsChecking(false);
    }
  };

  const handlePublishAnyway = async () => {
    if (!moderation) return;
    await submitStory({ title, content, category, flagged: true, flagReason: moderation.reason, aiResponse: null });
  };

  const handleEditStory = () => setShowWarning(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="story-form space-y-5">

      {/* Title */}
      <div>
        <label className="form-label">Title</label>
        <input
          type="text"
          placeholder="Give your story a title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="form-input"
        />
      </div>

      {/* Category */}
      <div>
        <label className="form-label">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="form-select"
        >
          <option value="discrimination">Discrimination</option>
          <option value="career_growth">Career Growth</option>
          <option value="first_job">First Job</option>
          <option value="impostor_syndrome">Impostor Syndrome</option>
          <option value="advice">Advice</option>
        </select>
      </div>

      {/* Textarea */}
      <div style={{ position: "relative" }}>
        <label className="form-label">Your Story</label>
        <textarea
          placeholder="Share your experience in tech..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows="5"
          className="form-textarea"
        />
        <button
          type="button"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="emoji-btn"
        >
          <Smile size={20} />
        </button>
        {showEmojiPicker && (
          <div ref={pickerRef} style={{ position: "absolute", bottom: "56px", right: 0, zIndex: 10 }}>
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}
      </div>

      {/* Checkbox */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
        <input
          type="checkbox"
          checked={acceptedGuidelines}
          onChange={(e) => setAcceptedGuidelines(e.target.checked)}
          style={{ marginTop: 3, accentColor: "#A855F7", cursor: "pointer", width: 15, height: 15, flexShrink: 0 }}
        />
        <p className="checkbox-label">
          I confirm that my story follows the{" "}
          <Link to="/guidelines">community guidelines</Link>{" "}
          and does not contain offensive or harmful content.
        </p>
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={!acceptedGuidelines || isChecking}
        className={`submit-btn ${acceptedGuidelines && !isChecking ? "enabled" : "disabled"}`}
      >
        {isChecking ? "Checking your story..." : "Submit Story"}
      </button>

      {/* Moderation warning */}
      {showWarning && moderation && (
        <div className="warning-box">
          <p className="warning-title">✦ Before publishing</p>
          <p className="warning-text">
            Our AI detected that your story might include sensitive content.
          </p>
          <p className="warning-reason">"{moderation.reason}"</p>
          <div className="warning-actions">
            <button type="button" onClick={handleEditStory} className="btn-edit">
              ✎ Edit Story
            </button>
            <button type="button" onClick={handlePublishAnyway} className="btn-publish-anyway">
              Publish Anyway →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default StoryForm;