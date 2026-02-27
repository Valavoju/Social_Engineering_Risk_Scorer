from flask import Flask, jsonify
from flask_cors import CORS
from routes.analyze import analyze_bp

def create_app():
    app = Flask(__name__)
    CORS(app)

    # Register routes
    app.register_blueprint(analyze_bp)

    # Health Check Endpoint
    @app.route("/")
    def health():
        return jsonify({
            "status": "Cyber Risk Intelligence API Running"
        })

    return app


app = create_app()

if __name__ == "__main__":
    app.run(debug=True)