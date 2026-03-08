import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Stories from "./pages/Stories";
import Guidelines from "./pages/Guidelines";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/stories" element={<Stories />} />
        <Route path="/guidelines" element={<Guidelines />} />
      </Routes>
    </>
  );
}

export default App;
