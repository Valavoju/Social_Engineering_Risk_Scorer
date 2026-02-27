import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const COLORS = ["#4F9CF9", "#9333EA", "#22C55E", "#F59E0B", "#EF4444"];

function Dashboard({ result }) {
  if (!result) return null;

  const chartData = result.risk_factors.map((f) => ({
    name: f.factor,
    value: f.points,
  }));

  const exportPDF = () => {
    const input = document.getElementById("dashboard-report");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, width, height);
      pdf.save("Cyber_Risk_Report.pdf");
    });
  };

  return (
    <div id="dashboard-report" className="dashboard-content">

      {/* ================= Risk Score Card ================= */}
      <motion.div
        className="card"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h3>Risk Score</h3>

        <div className="circle-wrapper">
          <div
            className="circle-progress"
            style={{
              background: `conic-gradient(#4F9CF9 ${
                result.risk_score * 3.6
              }deg, #1e2638 0deg)`,
            }}
          >
            <div className="circle-inner">
              {result.risk_score}%
            </div>
          </div>
        </div>
      </motion.div>

      {/* ================= Bar Chart ================= */}
      <motion.div
        className="card"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h3>Risk Factor Breakdown</h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip />
            <Bar dataKey="value" fill="#4F9CF9" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* ================= Pie Chart ================= */}
      <motion.div
        className="card"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h3>Risk Distribution</h3>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              outerRadius={100}
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </motion.div>

      {/* ================= Vulnerable Sentences ================= */}
      {result.vulnerable_sentences.length > 0 && (
        <motion.div
          className="card"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <h3>Vulnerable Sentences</h3>
          {result.vulnerable_sentences.map((s, i) => (
            <p key={i}>"{s}"</p>
          ))}
        </motion.div>
      )}

      {/* ================= Export Button ================= */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        style={{ marginTop: "20px" }}
      >
        <button onClick={exportPDF}>
          Export PDF Report
        </button>
      </motion.div>

    </div>
  );
}

export default Dashboard;