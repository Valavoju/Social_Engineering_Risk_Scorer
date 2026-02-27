import React, { useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import "./App.css";

function App() {

  const [activePage, setActivePage] = useState("scanner");
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeRisk = async () => {
    if (!text.trim()) return;

    setLoading(true);
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/analyze",
        { text }
      );
      setResult(response.data);
    } catch (error) {
      alert("Backend not connected");
    }
    setLoading(false);
  };

  const generatePDF = (data) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("CyberRisk Intelligence Report", 20, 20);

    doc.setFontSize(14);
    doc.text(`Risk Score: ${data.risk_score}/100`, 20, 40);

    doc.text("Risk Factors:", 20, 55);

    let y = 65;
    data.risk_factors.forEach((factor) => {
      doc.text(`${factor.factor} (+${factor.points})`, 25, y);
      y += 10;
    });

    doc.save("CyberRisk_Report.pdf");
  };

  const renderPage = () => {
    switch (activePage) {

      case "scanner":
        return (
          <>
            <h1 className="scanner-title">THREAT SCANNER</h1>

            <div className="input-box">
              <textarea
                placeholder="Paste public social media link or content..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <button onClick={analyzeRisk}>
                {loading ? "Analyzing..." : "Analyze Risk"}
              </button>
            </div>
          </>
        );

      case "dashboard":
        return (
          <>
            <h1 className="scanner-title">RISK DASHBOARD</h1>
            <Dashboard result={result} />
          </>
        );

      case "analytics":
        return (
          <>
            <h1 className="scanner-title">ANALYTICS</h1>

            {result ? (
              <div className="analytics-cards">
                <div className="analytics-card">
                  <h3>Risk Score</h3>
                  <div className="analytics-value">
                    {result.risk_score}/100
                  </div>
                </div>

                <div className="analytics-card">
                  <h3>Total Risk Factors</h3>
                  <div className="analytics-value">
                    {result.risk_factors.length}
                  </div>
                </div>
              </div>
            ) : (
              <p>No analysis data available.</p>
            )}
          </>
        );

      case "reports":
        return (
          <>
            <h1 className="scanner-title">INTEL REPORT</h1>

            {result ? (
              <>
                <div className="report-preview">
                  <h3>Risk Score: {result.risk_score}/100</h3>
                  <h4>Risk Factors:</h4>
                  <ul>
                    {result.risk_factors.map((f, index) => (
                      <li key={index}>
                        {f.factor} (+{f.points})
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  className="download-btn"
                  onClick={() => generatePDF(result)}
                >
                  Download Report
                </button>
              </>
            ) : (
              <p>No report data available.</p>
            )}
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="layout">
      <Navbar />
      <div className="main">
        <Sidebar
          activePage={activePage}
          setActivePage={setActivePage}
        />
        <div className="content">
          {renderPage()}
        </div>
      </div>
    </div>
  );
}

export default App;