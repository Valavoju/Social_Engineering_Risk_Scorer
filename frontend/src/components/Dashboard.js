import React, { useEffect, useState } from "react";
import "./Dashboard.css";

function Dashboard({ result }) {

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (result) {
      let start = 0;
      const interval = setInterval(() => {
        start += 1;
        if (start >= result.risk_score) {
          clearInterval(interval);
        }
        setProgress(start);
      }, 15);
    }
  }, [result]);

  const getSeverity = (score) => {
    if (score < 30) return "LOW";
    if (score < 70) return "MEDIUM";
    return "HIGH";
  };

  if (!result) return null;

  return (
    <div className="dashboard-wrapper">

      {/* CIRCULAR PROGRESS */}
      <div className="risk-circle-container">
        <svg className="progress-ring" width="220" height="220">
          <circle
            className="progress-ring-bg"
            strokeWidth="12"
            r="90"
            cx="110"
            cy="110"
          />
          <circle
            className="progress-ring-fill"
            strokeWidth="12"
            r="90"
            cx="110"
            cy="110"
            strokeDasharray={2 * Math.PI * 90}
            strokeDashoffset={
              2 * Math.PI * 90 -
              (progress / 100) * (2 * Math.PI * 90)
            }
          />
        </svg>

        <div className="risk-score-text">
          {progress}/100
          <div className="severity-label">
            {getSeverity(result.risk_score)}
          </div>
        </div>
      </div>

      {/* FACTORS */}
      <div className="factors-section">
        <h3>Detected Risk Factors</h3>
        {result.risk_factors.map((factor, index) => (
          <div key={index} className="factor-bar">
            <span>{factor.factor}</span>
            <div className="bar-wrapper">
              <div
                className="bar-fill"
                style={{ width: `${factor.points * 2}%` }}
              ></div>
            </div>
            <span className="points">+{factor.points}</span>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Dashboard;