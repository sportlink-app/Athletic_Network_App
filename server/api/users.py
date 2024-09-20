from flask import Blueprint, request, jsonify
from .models import Myusers, db  # Ensure `Myusers` and `db` are imported correctly

users_blueprint = Blueprint('users', __name__)

@users_blueprint.route('/match', methods=['POST'])
def match_users():
    user_id = request.json['user_id']
    user = Myusers.query.get(user_id)
    user_sports = set(user.sports.split(','))
    
    matched_users = Myusers.query.filter(Myusers.id != user_id).all()
    matches = []
    
    for other_user in matched_users:
        other_user_sports = set(other_user.sports.split(','))
        if user_sports.intersection(other_user_sports):
            matches.append({
                'id': other_user.id,
                'username': other_user.username,
                'sports': other_user.sports
            })
    
    return jsonify(matches)
