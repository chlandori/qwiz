
from flask import Flask, jsonify, render_template
import random, json

app = Flask(__name__)

# Load questions from a JSON file
with open('questions.json') as f:
    question_bank = json.load(f)

@app.route('/')
def index():
    return render_template('index.html')

@app.route("/next_batch")
def next_batch():
    batch_size = 5
    selected_questions = random.sample(question_bank, batch_size)
    return jsonify(selected_questions)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
