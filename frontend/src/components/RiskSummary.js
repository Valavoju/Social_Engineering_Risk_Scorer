import React from "react";

function RiskSummary({ score }) {
  const severity =
    score < 30 ? "Low Risk" :
    score < 70 ? "Moderate Risk" :
    "High Risk";

  return (
    <div className="card">
      <h3>Executive Risk Summary</h3>
      <p>
        The analyzed digital footprint indicates a <strong>{severity}</strong>
        profile based on detected exposure patterns and behavioral signals.
      </p>
    </div>
  );
}

export default RiskSummary;