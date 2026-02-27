import streamlit as st
import re
from transformers import pipeline
import pandas as pd

# -----------------------------
# PAGE CONFIG
# -----------------------------
st.set_page_config(
    page_title="AI Social Engineering Risk Intelligence",
    layout="centered"
)

# -----------------------------
# CUSTOM DARK THEME STYLING
# -----------------------------
st.markdown("""
    <style>
        .main {
            background-color: #0E1117;
        }
        .stTextArea textarea {
            background-color: #1E222A;
            color: white;
            border-radius: 10px;
        }
        .stButton>button {
            background-color: #2563EB;
            color: white;
            border-radius: 10px;
            height: 3em;
            width: 100%;
            font-weight: bold;
        }
        .stProgress > div > div > div > div {
            background-color: #EF4444;
        }
    </style>
""", unsafe_allow_html=True)

# -----------------------------
# HEADER
# -----------------------------
st.markdown("""
<h1 style='text-align: center; color: #60A5FA;'>
🛡️ AI Social Engineering Risk Intelligence System
</h1>
""", unsafe_allow_html=True)

st.markdown("<hr>", unsafe_allow_html=True)

st.write("Analyze public posts to detect social engineering vulnerability using AI-powered contextual risk modeling.")

# -----------------------------
# LOAD SENTIMENT MODEL
# -----------------------------
@st.cache_resource
def load_model():
    return pipeline("sentiment-analysis")

sentiment_model = load_model()

# -----------------------------
# USER INPUT
# -----------------------------
user_input = st.text_area("📄 Paste Public Social Media Posts Here:", height=200)

if st.button("🔍 Analyze Risk"):

    risk_score = 0
    risk_factors = []
    vulnerable_sentences = []

    text = user_input.lower()

    # -----------------------
    # EMAIL DETECTION
    # -----------------------
    email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b'
    if re.search(email_pattern, user_input):
        risk_score += 25
        risk_factors.append("📧 Email exposed (+25)")

    # -----------------------
    # PHONE DETECTION
    # -----------------------
    phone_pattern = r'\b\d{10}\b'
    if re.search(phone_pattern, user_input):
        risk_score += 25
        risk_factors.append("📱 Phone number exposed (+25)")

    # -----------------------
    # TRAVEL KEYWORDS
    # -----------------------
    travel_keywords = ["flight", "airport", "vacation", "trip", "travel"]
    if any(word in text for word in travel_keywords):
        risk_score += 15
        risk_factors.append("✈️ Travel information shared (+15)")

    # -----------------------
    # FAMILY KEYWORDS
    # -----------------------
    family_keywords = ["my wife", "my daughter", "my son", "family"]
    if any(word in text for word in family_keywords):
        risk_score += 10
        risk_factors.append("👨‍👩‍👧 Family details shared (+10)")

    # -----------------------
    # JOB KEYWORDS
    # -----------------------
    job_keywords = ["working at", "joined", "company", "promotion"]
    if any(word in text for word in job_keywords):
        risk_score += 10
        risk_factors.append("💼 Job details shared (+10)")

    # -----------------------
    # SENTENCE LEVEL SENTIMENT
    # -----------------------
    sentences = user_input.split(".")
    for sentence in sentences:
        if sentence.strip():
            result = sentiment_model(sentence)[0]
            if result["label"] == "NEGATIVE" and result["score"] > 0.80:
                risk_score += 15
                vulnerable_sentences.append(sentence.strip())

    if vulnerable_sentences:
        risk_factors.append("😟 Emotional vulnerability detected (+15)")

    # Cap risk at 100
    risk_score = min(risk_score, 100)

    # -----------------------
    # DISPLAY RESULTS
    # -----------------------
    st.subheader(f"🔎 Risk Score: {risk_score}/100")
    st.progress(risk_score / 100)

    if risk_score < 30:
        st.success("🟢 Low Vulnerability")
    elif risk_score < 70:
        st.warning("🟡 Medium Vulnerability")
    else:
        st.error("🔴 High Vulnerability")

    # -----------------------
    # RISK FACTORS
    # -----------------------
    st.subheader("⚠️ Risk Factors Detected:")
    if risk_factors:
        for factor in risk_factors:
            st.write("-", factor)
    else:
        st.write("No major risk factors detected.")

    # -----------------------
    # VULNERABLE SENTENCES
    # -----------------------
    if vulnerable_sentences:
        st.subheader("🧠 Vulnerable Sentences Identified by AI:")
        for vs in vulnerable_sentences:
            st.write("➡️", vs)

    # -----------------------
    # RISK BREAKDOWN CHART
    # -----------------------
    if risk_factors:
        st.subheader("📊 Risk Breakdown Analytics")

        breakdown = []
        for factor in risk_factors:
            if "(+" in factor:
                points = int(factor.split("(+")[1].replace(")", ""))
                breakdown.append(points)
            else:
                breakdown.append(15)

        df = pd.DataFrame({
            "Risk Factor": risk_factors,
            "Points": breakdown
        })

        st.bar_chart(df.set_index("Risk Factor"))

    # -----------------------
    # RECOMMENDATIONS
    # -----------------------
    st.subheader("🛡️ Security Recommendations:")
    st.write("- Avoid posting personal contact information publicly.")
    st.write("- Avoid sharing travel plans in real time.")
    st.write("- Limit sharing detailed family information.")
    st.write("- Review privacy settings regularly.")
    st.write("- Be cautious of personalized phishing emails referencing your posts.")