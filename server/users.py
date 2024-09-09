# Flask API to match users based on their sports interests
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://username:password@localhost/sportlink'
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    sports_interests = db.Column(db.String(200))  # Comma-separated sports

@app.route('/match', methods=['POST'])
def match_users():
    user_id = request.json['user_id']
    user = User.query.get(user_id)
    user_sports = set(user.sports_interests.split(','))
    
    matched_users = User.query.filter(User.id != user_id).all()
    matches = []
    
    for other_user in matched_users:
        other_user_sports = set(other_user.sports_interests.split(','))
        if user_sports.intersection(other_user_sports):
            matches.append({
                'id': other_user.id,
                'name': other_user.name,
                'sports_interests': other_user.sports_interests
            })
    
    return jsonify(matches)

if __name__ == '__main__':
    app.run(debug=True)
