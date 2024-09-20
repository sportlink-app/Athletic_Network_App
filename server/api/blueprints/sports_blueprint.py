from flask import Blueprint, jsonify
from ..models import db, Sport

sports_blueprint = Blueprint('sports_blueprint', __name__)

@sports_blueprint.route('/sports', methods=['GET'])
def get_sports():
    try:
        # Query to get all sports names
        sports = Sport.query.all()

        # Prepare the list of sports names
        sports_list = [sport.name for sport in sports]

        return jsonify(sports_list), 200
    except Exception as e:
        return jsonify({"message": "Internal server error", "error": str(e)}), 500
