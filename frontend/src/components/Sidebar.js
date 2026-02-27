import React from "react";
import { FaChartBar, FaShieldAlt, FaFileAlt } from "react-icons/fa";

function Sidebar() {
  return (
    <div className="sidebar">
      <ul>
        <li><FaShieldAlt /> Risk Dashboard</li>
        <li><FaChartBar /> Analytics</li>
        <li><FaFileAlt /> Reports</li>
      </ul>
    </div>
  );
}

export default Sidebar;