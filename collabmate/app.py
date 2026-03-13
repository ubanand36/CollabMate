from flask import Flask, render_template, request, jsonify
from serpapi import GoogleSearch

app = Flask(__name__)

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


# ---------------- SEARCH API ---------------- #

@app.route("/search", methods=["POST"])
def search():

    skill = request.json.get("skill")

    params = {
        "engine": "google",
        "q": f"site:linkedin.com/in {skill} developer",
        "api_key": "e982c35751fcf5b616da20a53c8b2e37888ee7df15e3a42f3730043767c02233",
        "num": 5
    }

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