import "./Guidelines.css";
import { Link } from "react-router-dom";

import { BookOpen, UserX, Building2, Heart, Sparkles } from "lucide-react";

const guidelines = [
  {
    icon: <BookOpen size={20} color="#A855F7" />,
    title: "This is a storytelling space",
    text: "Echoes of Her is not a legal reporting channel or a complaint platform. It is a space to share personal experiences, reflections, and stories that inspire, challenge, and connect us.",
    delay: "0.1s",
  },
  {
    icon: <UserX size={20} color="#A855F7" />,
    title: "Do not mention real names",
    text: 'Avoid using full names of real people — colleagues, managers, or anyone involved in your story. Use alternatives like "my manager", "a colleague", or "someone I worked with". This protects both you and others.',
    delay: "0.2s",
  },
  {
    icon: <Building2 size={20} color="#A855F7" />,
    title: "Do not name specific companies",
    text: 'Avoid mentioning specific companies or organizations by name. Use general references like "a startup", "a large tech company", or "my previous employer". This keeps the focus on your experience, not on public accusations.',
    delay: "0.3s",
  },
  {
    icon: <Heart size={20} color="#A855F7" />,
    title: "Be respectful and kind",
    text: "Stories that include hate speech, offensive language, threats, or content designed to harm others will not be accepted. Disagreement and frustration are valid — but please express them with care.",
    delay: "0.4s",
  },
  {
    icon: <Sparkles size={20} color="#A855F7" />,
    title: "Share your truth",
    text: "Your experience is valid. Whether it's a moment of doubt, a victory, a challenge you overcame, or something you're still going through — this community is here to listen, support, and amplify your voice.",
    delay: "0.5s",
  },
];

function Guidelines() {
  return (
    <div
      className="guidelines-page min-h-screen py-16 px-6"
      style={{ background: "linear-gradient(145deg, #F3EEFF 0%, #FDF2F8 55%, #EDE9FF 100%)" }}
    >
      {/* Ambient blobs */}
      <div className="fixed top-0 left-0 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(168,85,247,0.07) 0%, transparent 70%)", zIndex: 0 }} />
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(249,168,212,0.09) 0%, transparent 70%)", zIndex: 0 }} />

      <div className="relative z-10 max-w-2xl mx-auto">

        {/* Header */}
        <div className="guidelines-header text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-4"
            style={{ background: "rgba(168,85,247,0.08)", color: "#9333EA", border: "1px solid rgba(168,85,247,0.18)" }}>
            Before you share
          </div>
          <h1 className="font-extrabold mb-3" style={{ color: "#1E0A3C", fontSize: "clamp(2rem, 4vw, 2.8rem)" }}>
            Community Guidelines
          </h1>
          <p style={{ color: "#9CA3AF", fontSize: "0.92rem", lineHeight: 1.6 }}>
            Echoes of Her is a safe space. Please read these guidelines before sharing your story.
          </p>
        </div>

        {/* Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {guidelines.map((g) => (
            <div key={g.title} className="guideline-card" style={{ animationDelay: g.delay }}>
              <div className="guideline-icon">{g.icon}</div>
              <div>
                <p className="guideline-title">{g.title}</p>
                <p className="guideline-text">{g.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* AI note */}
        <div className="ai-note mt-8">
          <p className="ai-note-text">
            ✦ Our AI reviews every story before it's published to help keep this space safe.
            You'll always have the choice to edit or publish anyway.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center mt-10" style={{ animation: "fadeUp 0.6s ease 0.6s both" }}>
          <Link
            to="/stories"
            style={{
              background: "linear-gradient(135deg, #A855F7, #EC4899)",
              color: "white",
              fontWeight: 700,
              fontSize: "0.9rem",
              padding: "12px 28px",
              borderRadius: 14,
              textDecoration: "none",
              boxShadow: "0 4px 16px rgba(168,85,247,0.3)",
              display: "inline-block",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
          >
            Ready to share your story?
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Guidelines;