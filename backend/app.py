from flask import Flask, request, jsonify
from flask_cors import CORS
import re
from transformers import pipeline

app = Flask(__name__)
CORS(app)

sentiment_model = pipeline("sentiment-analysis")

@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.json
    user_input = data.get("text", "")

    risk_score = 0
    risk_factors = []
    vulnerable_sentences = []

    text = user_input.lower()

    # Email Detection
    if re.search(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b', user_input):
        risk_score += 25
        risk_factors.append({"factor": "Email Exposure", "points": 25})

    # Phone Detection
    if re.search(r'\b\d{10}\b', user_input):
        risk_score += 25
        risk_factors.append({"factor": "Phone Exposure", "points": 25})

    # Travel Keywords
    if any(word in text for word in ["flight", "airport", "vacation", "trip", "travel"]):
        risk_score += 15
        risk_factors.append({"factor": "Travel Disclosure", "points": 15})

    # Sentence-level Sentiment
    sentences = user_input.split(".")
    for sentence in sentences:
        if sentence.strip():
            result = sentiment_model(sentence)[0]
            if result["label"] == "NEGATIVE" and result["score"] > 0.80:
                risk_score += 15
                vulnerable_sentences.append(sentence.strip())

    if vulnerable_sentences:
        risk_factors.append({"factor": "Emotional Vulnerability", "points": 15})

    risk_score = min(risk_score, 100)

    return jsonify({
        "risk_score": risk_score,
        "risk_factors": risk_factors,
        "vulnerable_sentences": vulnerable_sentences
    })

if __name__ == "__main__":
    app.run(debug=True)