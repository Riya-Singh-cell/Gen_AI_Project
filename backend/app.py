from flask import Flask, request, jsonify
from flask_cors import CORS
from model.keyword_extractor import extract_keywords_tfidf

app = Flask(__name__)
CORS(app)

@app.route('/extract', methods=['POST'])
def extract():
    data = request.get_json()
    text = data.get("text", "")
    if not text.strip():
        return jsonify({"error": "No text provided"}), 400
    keywords = extract_keywords_tfidf(text)
    return jsonify({"keywords": keywords})

if __name__ == '__main__':
    app.run(debug=True)
