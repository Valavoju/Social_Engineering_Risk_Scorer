import React from "react";
import { FaShieldAlt } from "react-icons/fa";

function Navbar() {
  return (
    <div className="navbar">
      <div className="logo">
        <FaShieldAlt style={{ marginRight: "10px" }} />
        Cyber Risk Intelligence
      </div>
    </div>
  );
}

export default Navbar;