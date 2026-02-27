import React from "react";

function Dashboard({ result }) {

  if (!result) return null;

  const getRiskColor = (score) => {
    if (score < 30) return "#00c853";
    if (score < 70) return "#ff9100";
    return "#ff1744";
  };

  return (
    <div className="dashboard-container">

      <div className="results-grid">

        <div className="risk-card">
          <h2>Risk Score</h2>
          <div
            className="risk-value"
            style={{ color: getRiskColor(result.risk_score) }}
          >
            {result.risk_score}/100
          </div>
        </div>

        <div className="factors-card">
          <h2>Risk Factors</h2>
          {result.risk_factors.map((f, index) => (
            <div key={index} className="factor-item">
              {f.factor} <span>+{f.points}</span>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}

export default Dashboard;