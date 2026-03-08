import { useEffect, useState } from "react";
import StoryForm from "../components/StoryForm";
import StoryList from "../components/StoryList";
import { getStories } from "../services/api";

function Stories() {
  const [stories, setStories] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");

  const fetchStories = async () => {
    try {
      const data = await getStories();
      setStories(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => { fetchStories(); }, []);

  const handleNewStory = () => fetchStories();

  const filteredStories = filter === "all"
    ? stories
    : stories.filter((s) => s.category === filter);

  const sortedStories = [...filteredStories].sort((a, b) => {
    if (sortBy === "likes") return b.likes - a.likes;
    if (sortBy === "recent") return new Date(b.createdAt) - new Date(a.createdAt);
    return 0;
  });

  const categories = [
    { value: "all", label: "All Stories" },
    { value: "discrimination", label: "Discrimination" },
    { value: "career_growth", label: "Career Growth" },
    { value: "first_job", label: "First Job" },
    { value: "impostor_syndrome", label: "Impostor Syndrome" },
    { value: "advice", label: "Advice" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300&display=swap');
        .stories-page * { font-family: 'Plus Jakarta Sans', sans-serif; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .stories-page { animation: fadeUp 0.6s ease both; }

        .form-card {
          background: rgba(255,255,255,0.75);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(168,85,247,0.12);
          box-shadow: 0 8px 40px rgba(168,85,247,0.08), 0 2px 8px rgba(0,0,0,0.04);
          transition: box-shadow 0.3s;
        }
        .form-card:hover {
          box-shadow: 0 16px 48px rgba(168,85,247,0.13), 0 2px 8px rgba(0,0,0,0.05);
        }

        .filter-pill {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.8rem;
          font-weight: 600;
          padding: 7px 16px;
          border-radius: 99px;
          border: 1.5px solid rgba(168,85,247,0.2);
          background: rgba(255,255,255,0.7);
          color: #9CA3AF;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.34,1.56,0.64,1);
          white-space: nowrap;
        }
        .filter-pill:hover {
          border-color: rgba(168,85,247,0.5);
          color: #A855F7;
          transform: translateY(-1px);
        }
        .filter-pill.active {
          background: linear-gradient(135deg, #A855F7, #EC4899);
          border-color: transparent;
          color: white;
          box-shadow: 0 4px 14px rgba(168,85,247,0.3);
          transform: translateY(-1px);
        }

        .sort-select {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.82rem;
          font-weight: 600;
          padding: 7px 32px 7px 14px;
          border-radius: 99px;
          border: 1.5px solid rgba(168,85,247,0.2);
          background: rgba(255,255,255,0.8);
          color: #7C3AED;
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23A855F7' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 12px center;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .sort-select:focus {
          border-color: #A855F7;
          box-shadow: 0 0 0 3px rgba(168,85,247,0.1);
        }

        .section-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(168,85,247,0.15), transparent);
        }

        .stories-count {
          font-size: 0.8rem;
          font-weight: 600;
          color: #A855F7;
          background: rgba(168,85,247,0.08);
          border: 1px solid rgba(168,85,247,0.15);
          padding: 4px 12px;
          border-radius: 99px;
        }
      `}</style>

      <div
        className="stories-page min-h-screen"
        style={{ background: "linear-gradient(160deg, #F3EEFF 0%, #FDF2F8 50%, #EDE9FF 100%)" }}
      >
        {/* Ambient blobs */}
        <div className="fixed top-0 left-0 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(168,85,247,0.07) 0%, transparent 70%)", zIndex: 0 }} />
        <div className="fixed bottom-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(249,168,212,0.09) 0%, transparent 70%)", zIndex: 0 }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">

          {/* ── SHARE STORY SECTION ── */}
          <section className="max-w-2xl mx-auto mb-20">

            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-4"
                style={{ background: "rgba(168,85,247,0.08)", color: "#9333EA", border: "1px solid rgba(168,85,247,0.18)" }}>
                ✍️ Your story matters
              </div>
              <h1 className="font-extrabold mb-2" style={{ color: "#1E0A3C", fontSize: "clamp(2rem, 4vw, 2.8rem)" }}>
                Share Your Story
              </h1>
              <p style={{ color: "#9CA3AF", fontSize: "0.95rem" }}>
                This is a safe and supportive space. Your experience matters.
              </p>
            </div>

            <div className="form-card rounded-3xl p-8">
              <StoryForm onStoryCreated={handleNewStory} />
            </div>
          </section>

          <div className="section-divider mb-16 max-w-2xl mx-auto" />

          {/* ── EXPLORE SECTION ── */}
          <section>

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="font-extrabold mb-1" style={{ color: "#1E0A3C", fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}>
                  Explore Stories
                </h2>
                <p style={{ color: "#9CA3AF", fontSize: "0.88rem" }}>
                  Real voices. Real experiences.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="stories-count">
                  {sortedStories.length} {sortedStories.length === 1 ? "story" : "stories"}
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-select"
                >
                  <option value="recent">✨ Most Recent</option>
                  <option value="likes">💜 Most Liked</option>
                </select>
              </div>
            </div>

            {/* Category pills */}
            <div className="flex flex-wrap gap-2 mb-10">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setFilter(cat.value)}
                  className={`filter-pill ${filter === cat.value ? "active" : ""}`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Grid */}
            {sortedStories.length === 0 ? (
              <div className="text-center py-24">
                <p className="text-4xl mb-3">🌸</p>
                <p className="font-semibold" style={{ color: "#C084FC" }}>No stories yet in this category.</p>
                <p style={{ color: "#D1C4E9", fontSize: "0.85rem" }}>Be the first to share yours.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <StoryList stories={sortedStories} onLike={fetchStories} />
              </div>
            )}
          </section>

        </div>
      </div>
    </>
  );
}

export default Stories;