import os

from flask import Flask, render_template, request, jsonify
from serpapi import GoogleSearch

app = Flask(__name__)


def get_firebase_web_config():
    config = {
        "apiKey": os.getenv("FIREBASE_API_KEY", ""),
        "authDomain": os.getenv("FIREBASE_AUTH_DOMAIN", ""),
        "projectId": os.getenv("FIREBASE_PROJECT_ID", ""),
        "storageBucket": os.getenv("FIREBASE_STORAGE_BUCKET", ""),
        "messagingSenderId": os.getenv("FIREBASE_MESSAGING_SENDER_ID", ""),
        "appId": os.getenv("FIREBASE_APP_ID", ""),
        "measurementId": os.getenv("FIREBASE_MEASUREMENT_ID", ""),
    }
    return {key: value for key, value in config.items() if value}

# ---------------- ROUTES ---------------- #

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/dashboard")
def dashboard():
    return render_template("dashboard.html")

@app.route("/login")
def login():
    return render_template("login.html")

@app.route("/register")
def register():
    return render_template("register.html")

@app.route("/results")
def results():
    return render_template("results.html")

@app.route("/about")
def about():
    return render_template("about.html")


@app.route("/api/firebase-config", methods=["GET"])
def firebase_config():
    # Map client config keys to their corresponding environment variable names
    required_env_vars = {
        "apiKey": "FIREBASE_API_KEY",
        "authDomain": "FIREBASE_AUTH_DOMAIN",
        "projectId": "FIREBASE_PROJECT_ID",
        "storageBucket": "FIREBASE_STORAGE_BUCKET",
        "messagingSenderId": "FIREBASE_MESSAGING_SENDER_ID",
        "appId": "FIREBASE_APP_ID",
        # measurementId is often optional; leave it out of required set
    }

    missing_keys = [
        client_key
        for client_key, env_name in required_env_vars.items()
        if not os.getenv(env_name, "")
    ]

    if missing_keys:
        return (
            jsonify(
                {
                    "error": "Firebase configuration is incomplete",
                    "missingKeys": missing_keys,
                }
            ),
            500,
        )
    return jsonify(get_firebase_web_config())


# ---------------- SEARCH API ---------------- #

@app.route("/search", methods=["POST"])
def search():

    skill = request.json.get("skill")

    params = {
        "engine": "google",
        "q": f"site:linkedin.com/in {skill} developer",
        "api_key": os.getenv("SERPAPI_API_KEY", ""),
        "num": 5
    }

    if not params["api_key"]:
        return jsonify({"error": "SERPAPI_API_KEY is not configured"}), 500

    search = GoogleSearch(params)
    results = search.get_dict()

    collaborators = []

    if "organic_results" in results:
        for r in results["organic_results"]:

            collaborators.append({
                "name": r.get("title"),
                "skills": skill,
                "linkedin": r.get("link")
            })

    return jsonify(collaborators)


# ---------------- RUN SERVER ---------------- #

if __name__ == "__main__":
    app.run(debug=True)