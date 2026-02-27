import React, { useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);

  const analyzeRisk = async () => {
    const response = await axios.post("http://127.0.0.1:5000/analyze", {
      text: text,
    });
    setResult(response.data);
  };

  return (
    <div className="layout">
      <Navbar />
      <div className="main">
        <Sidebar />
        <div className="content">
          <div className="input-box">
            <textarea
              placeholder="Paste social media content..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button onClick={analyzeRisk}>Analyze Risk</button>
          </div>

          <Dashboard result={result} />
        </div>
      </div>
    </div>
  );
}

export default App;