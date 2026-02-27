def detect_behavior(text):

    text_lower = text.lower()

    score = 0
    factors = []

    # -----------------------------
    # Travel Disclosure
    # -----------------------------
    travel_keywords = [
        "flight", "airport", "vacation",
        "trip", "traveling", "out of town",
        "leaving tomorrow", "boarding now"
    ]

    if any(keyword in text_lower for keyword in travel_keywords):
        score += 25
        factors.append({
            "factor": "Travel Disclosure",
            "points": 25
        })

    # -----------------------------
    # Real-Time Location Sharing
    # -----------------------------
    realtime_keywords = [
        "currently at", "right now at",
        "live from", "at the mall",
        "at the office", "home alone"
    ]

    if any(keyword in text_lower for keyword in realtime_keywords):
        score += 20
        factors.append({
            "factor": "Real-Time Location Exposure",
            "points": 20
        })

    # -----------------------------
    # Schedule Disclosure
    # -----------------------------
    schedule_keywords = [
        "tomorrow", "next week",
        "this weekend", "tonight",
        "leaving at", "returning on"
    ]

    if any(keyword in text_lower for keyword in schedule_keywords):
        score += 15
        factors.append({
            "factor": "Future Schedule Disclosure",
            "points": 15
        })

    return {
        "score": score,
        "factors": factors
    }