def detect_social(text):

    text_lower = text.lower()

    score = 0
    factors = []

    # ---------------------------------
    # 1️⃣ Immediate Family Disclosure
    # ---------------------------------
    family_keywords = [
        "my wife", "my husband",
        "my daughter", "my son",
        "my parents", "my mom",
        "my dad", "my family"
    ]

    if any(keyword in text_lower for keyword in family_keywords):
        score += 20
        factors.append({
            "factor": "Family Information Disclosure",
            "points": 20
        })

    # ---------------------------------
    # 2️⃣ Relationship Status Exposure
    # ---------------------------------
    relationship_keywords = [
        "engaged", "married",
        "divorced", "single mom",
        "single dad"
    ]

    if any(keyword in text_lower for keyword in relationship_keywords):
        score += 10
        factors.append({
            "factor": "Relationship Status Disclosure",
            "points": 10
        })

    # ---------------------------------
    # 3️⃣ Children / Dependent Disclosure
    # ---------------------------------
    children_keywords = [
        "my baby", "my kid",
        "my children", "my toddler"
    ]

    if any(keyword in text_lower for keyword in children_keywords):
        score += 15
        factors.append({
            "factor": "Dependent Information Disclosure",
            "points": 15
        })

    # ---------------------------------
    # 4️⃣ Personal Routine Sharing
    # ---------------------------------
    routine_keywords = [
        "every morning", "daily routine",
        "walk alone", "home alone",
        "live alone"
    ]

    if any(keyword in text_lower for keyword in routine_keywords):
        score += 15
        factors.append({
            "factor": "Personal Routine Exposure",
            "points": 15
        })

    return {
        "score": score,
        "factors": factors
    }