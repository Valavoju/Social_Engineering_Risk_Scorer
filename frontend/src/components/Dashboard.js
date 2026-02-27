import React from "react";

function Dashboard({ result }) {
  if (!result) return null;

  return (
    <div className="dashboard-content">
      <div className="card">
        <h3>Risk Score</h3>
        <h1>{result.risk_score}/100</h1>
      </div>

      <div className="card">
        <h3>Risk Factors</h3>
        {result.risk_factors.map((f, i) => (
          <p key={i}>{f.factor} (+{f.points})</p>
        ))}
      </div>

      {result.vulnerable_sentences.length > 0 && (
        <div className="card">
          <h3>Vulnerable Sentences</h3>
          {result.vulnerable_sentences.map((s, i) => (
            <p key={i}>"{s}"</p>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;