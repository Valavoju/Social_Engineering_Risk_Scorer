import React from "react";
import { motion } from "framer-motion";

function Navbar() {
  return (
    <motion.div
      className="navbar"
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="logo">
        🛡️ Cyber Risk Intelligence
      </div>
      <div className="nav-actions">
        <button className="logout-btn">Logout</button>
      </div>
    </motion.div>
  );
}

export default Navbar;