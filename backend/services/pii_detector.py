import re

def detect_pii(text):

    score = 0
    factors = []

    # -----------------------------
    # Email Detection
    # -----------------------------
    email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b'
    if re.search(email_pattern, text):
        score += 30
        factors.append({
            "factor": "Email Exposure",
            "points": 30
        })

    # -----------------------------
    # Phone Number Detection
    # -----------------------------
    phone_pattern = r'\b\d{10}\b'
    if re.search(phone_pattern, text):
        score += 30
        factors.append({
            "factor": "Phone Number Exposure",
            "points": 30
        })

    # -----------------------------
    # Username with Numbers (Possible DOB Pattern)
    # Example: avinash2003
    # -----------------------------
    username_pattern = r'\b[a-zA-Z]+\d{2,4}\b'
    if re.search(username_pattern, text):
        score += 15
        factors.append({
            "factor": "Username with Numeric Pattern",
            "points": 15
        })

    # -----------------------------
    # National ID / Large Numeric Exposure
    # (Very basic detection)
    # -----------------------------
    id_pattern = r'\b\d{12,}\b'
    if re.search(id_pattern, text):
        score += 40
        factors.append({
            "factor": "Potential Sensitive ID Exposure",
            "points": 40
        })

    return {
        "score": score,
        "factors": factors
    }