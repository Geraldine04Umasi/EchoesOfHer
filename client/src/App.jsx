import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Stories from "./pages/Stories";
import Guidelines from "./pages/Guidelines";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/guidelines" element={<Guidelines />} />
        </Routes>
      </main>
      <footer style={{
        textAlign: "center",
        padding: "20px",
        fontSize: "0.8rem",
        color: "#B0A0C8",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        borderTop: "1px solid rgba(168,85,247,0.1)",
        background: "rgba(255,255,255,0.4)",
        backdropFilter: "blur(8px)",
      }}>
        Made with 💜 by <span style={{ color: "#A855F7", fontWeight: 700 }}>CodeHer</span> · Echoes of Her © 2026
      </footer>
    </div>
  );
}

export default App;
