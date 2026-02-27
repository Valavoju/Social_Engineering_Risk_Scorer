from flask import Blueprint, request, jsonify
from services.risk_engine import analyze_text

analyze_bp = Blueprint("analyze", __name__)

@analyze_bp.route("/analyze", methods=["POST"])
def analyze():

    try:
        # Ensure JSON request
        if not request.is_json:
            return jsonify({
                "error": "Request must be JSON"
            }), 400

        data = request.get_json()

        # Validate text field
        if "text" not in data:
            return jsonify({
                "error": "Missing 'text' field in request"
            }), 400

        text = data.get("text", "").strip()

        if len(text) == 0:
            return jsonify({
                "error": "Input text cannot be empty"
            }), 400

        # Call risk engine
        result = analyze_text(text)

        # Ensure consistent response format
        return jsonify({
            "success": True,
            "risk_score": result.get("risk_score", 0),
            "risk_factors": result.get("risk_factors", []),
            "vulnerable_sentences": result.get("vulnerable_sentences", [])
        }), 200

    except Exception as e:
        # Production-safe error handling
        return jsonify({
            "success": False,
            "error": "Internal Server Error",
            "details": str(e)
        }), 500
    