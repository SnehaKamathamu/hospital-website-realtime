from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# Database Config
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///feedback.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Feedback Table
class Feedback(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    message = db.Column(db.Text, nullable=False)

# Create table
with app.app_context():
    db.create_all()

# Routes
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/submit', methods=['POST'])
def submit_feedback():
    try:
        name = request.form.get('name')
        message = request.form.get('message')

        print("📥 Received name:", name)
        print("📥 Received message:", message)

        if not name or not message:
            print("🚫 Missing data!")
            return jsonify({'status': 'error', 'message': 'Missing fields'}), 400

        new_fb = Feedback(name=name, message=message)
        db.session.add(new_fb)
        db.session.commit()

        print("✅ Feedback saved to DB")
        return jsonify({'status': 'success'}), 200

    except Exception as e:
        print("❌ Exception occurred:", e)
        return jsonify({'status': 'error', 'message': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
