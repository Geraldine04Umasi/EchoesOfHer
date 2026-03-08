import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import womenImg from "../assets/women-Photoroom.png";
import "./Landing.css";

const SUBTITLE = "A safe and supportive space for women to share experiences, struggles, victories, and strength.";

const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  size: Math.random() * 14 + 8,
  left: Math.random() * 100,
  delay: Math.random() * 8,
  duration: Math.random() * 6 + 12,
  opacity: Math.random() * 0.35 + 0.2,
}));

function Landing() {
  const [step, setStep] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [typingDone, setTypingDone] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 100);
    const t2 = setTimeout(() => setStep(2), 1600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (step < 2) return;
    setIsTyping(true);
    let i = 0;
    const interval = setInterval(() => {
      if (i < SUBTITLE.length) {
        setTypedText(SUBTITLE.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
        setTypingDone(true); 
      }
    }, 50);
    return () => clearInterval(interval);
  }, [step]);

  return (
    <div
      className="min-h-screen relative overflow-hidden flex flex-col"
      style={{ background: "linear-gradient(145deg, #F3EEFF 0%, #FDF2F8 55%, #EDE9FF 100%)" }}
    >
      {/* Floating particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute pointer-events-none"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            bottom: "0px",
            "--start-op": p.opacity,
            background: p.id % 3 === 0
              ? `rgba(168,85,247,${p.opacity})`
              : p.id % 3 === 1
              ? `rgba(249,168,212,${p.opacity})`
              : `rgba(192,132,252,${p.opacity})`,
            animation: `riseAndFade ${p.duration}s ease-in ${p.delay}s infinite`,
            borderRadius: p.id % 3 === 0 ? "50%" : p.id % 3 === 1 ? "40% 60% 55% 45%" : "30% 70% 40% 60%",
          }}
        />
      ))}

      {/* Ambient blobs */}
      <div className="absolute top-[-120px] left-[-100px] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(168,85,247,0.1) 0%, transparent 65%)" }} />
      <div className="absolute bottom-[-100px] right-[-80px] w-[550px] h-[550px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(249,168,212,0.14) 0%, transparent 65%)" }} />

      {/* HERO */}
      <main className="flex-1 flex items-center w-full max-w-7xl mx-auto px-12 py-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 w-full">

          {/* LEFT */}
          <div className="flex-1 text-left space-y-6">

            <div className="badge-anim inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold tracking-widest uppercase"
              style={{ background: "rgba(168,85,247,0.1)", color: "#9333EA", border: "1px solid rgba(168,85,247,0.25)" }}>
              A space for women in tech
            </div>

            <h1
              className={`hero-title font-extrabold leading-none ${step >= 1 ? "visible" : ""}`}
              style={{ color: "#1E0A3C", fontSize: "clamp(3.5rem, 7vw, 5.5rem)", lineHeight: 1.05 }}
            >
              Your voice
              <span className="block italic font-light" style={{ color: "#A855F7", fontSize: "clamp(3.8rem, 7.5vw, 6rem)" }}>
                matters.
              </span>
            </h1>

            {/* Typewriter */}
            <div
              style={{ color: "#6B7280", fontWeight: 400, fontSize: "clamp(1rem, 1.8vw, 1.25rem)", minHeight: "3.5em", lineHeight: 1.7 }}
            >
              {typedText}
              {isTyping && <span className="cursor" />}
            </div>

            {/* Botón — aparece solo cuando termina el typewriter */}
            <div className={`hero-btn pt-2 ${typingDone ? "visible" : ""}`}>
              <Link
                to="/stories"
                className="cta-btn inline-flex items-center gap-3 text-white font-bold px-10 py-5 rounded-2xl text-lg"
              >
                Share Your Story 
              </Link>
            </div>

            <p className={`stat-anim text-sm ${typingDone ? "" : "opacity-0"}`} style={{ color: "#B0A0C8" }}>
              Join women sharing their truth in tech
            </p>

          </div>

          {/* RIGHT */}
          <div className="flex-1 flex justify-center lg:justify-end items-center relative">
            <div className="relative">
              <div className="absolute inset-0 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse at 50% 60%, rgba(168,85,247,0.2) 0%, transparent 65%)",
                  transform: "scale(1.4)",
                }} />
              <img
                src={womenImg}
                alt="Women supporting each other"
                className="hero-image relative z-10 drop-shadow-2xl"
                style={{ width: "clamp(320px, 42vw, 580px)", mixBlendMode: "multiply" }}
              />
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default Landing;