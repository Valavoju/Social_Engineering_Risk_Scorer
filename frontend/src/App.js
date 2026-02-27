import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeRisk = async () => {
    if (!text.trim()) return;

    setLoading(true);
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/analyze",
        { text: text }
      );
      setResult(response.data);
    } catch (error) {
      alert("Backend not connected");
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <motion.div
      className="layout"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Navbar />

      <div className="main">
        <Sidebar />

        <div className="content">

          {/* HERO */}
          <div className="hero">
            <h1 className="hero-title">
              AI Social Engineering Risk Intelligence
            </h1>
            <p className="hero-subtitle">
              Analyze public digital footprint exposure and detect vulnerability risks in real-time.
            </p>
          </div>

          {/* INPUT SECTION */}
          <div className="input-box">
            <textarea
              placeholder="Paste public social media content..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button onClick={analyzeRisk}>
              {loading ? "Analyzing..." : "Analyze Risk"}
            </button>
          </div>

          {/* DASHBOARD */}
          <Dashboard result={result} />

          {/* FOOTER */}
          <footer className="footer">
            © 2026 Cyber Risk Intelligence · Built for HackWithAI
          </footer>

        </div>
      </div>
    </motion.div>
  );
}

export default App;