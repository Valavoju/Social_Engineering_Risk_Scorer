import React from "react";

function Sidebar({ activePage, setActivePage }) {

  const MenuItem = ({ id, label }) => (
    <div
      className={`menu-item ${activePage === id ? "active" : ""}`}
      onClick={() => setActivePage(id)}
    >
      {label}
    </div>
  );

  return (
    <div className="cyber-sidebar">
      <MenuItem id="scanner" label="THREAT SCANNER" />
      <MenuItem id="dashboard" label="RISK DASHBOARD" />
      <MenuItem id="analytics" label="ANALYTICS" />
      <MenuItem id="reports" label="REPORTS" />
    </div>
  );
}

export default Sidebar;