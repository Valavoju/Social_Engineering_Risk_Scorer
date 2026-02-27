from services.pii_detector import detect_pii
from services.sentiment_service import detect_sentiment
from services.behavior_detector import detect_behavior
from services.social_detector import detect_social

def analyze_text(text):

    total_score = 0
    risk_factors = []
    vulnerable_sentences = []

    # 1️⃣ PII Exposure (weight: 0.30)
    pii = detect_pii(text)
    pii_score = pii["score"] * 0.30
    total_score += pii_score
    risk_factors.extend(pii["factors"])

    # 2️⃣ Behavioral Disclosure (weight: 0.20)
    behavior = detect_behavior(text)
    behavior_score = behavior["score"] * 0.20
    total_score += behavior_score
    risk_factors.extend(behavior["factors"])

    # 3️⃣ Emotional Vulnerability (weight: 0.25)
    sentiment = detect_sentiment(text)
    sentiment_score = sentiment["score"] * 0.25
    total_score += sentiment_score
    vulnerable_sentences = sentiment["sentences"]

    if vulnerable_sentences:
        risk_factors.append({
            "factor": "Emotional Vulnerability",
            "points": round(sentiment_score)
        })

    # 4️⃣ Social Graph Exposure (weight: 0.15)
    social = detect_social(text)
    social_score = social["score"] * 0.15
    total_score += social_score
    risk_factors.extend(social["factors"])

    # 5️⃣ External Link Exposure (weight: 0.10)
    if "http" in text:
        link_score = 10 * 0.10
        total_score += link_score
        risk_factors.append({
            "factor": "External Link Shared",
            "points": round(link_score)
        })

    total_score = min(round(total_score), 100)

    return {
        "risk_score": total_score,
        "risk_factors": risk_factors,
        "vulnerable_sentences": vulnerable_sentences
    }