from flask import Blueprint, request, jsonify
from ..models import Team
from .user_blueprint import token_required
from datetime import datetime, timedelta

upcoming_blueprint = Blueprint('upcoming_blueprint', __name__)

@upcoming_blueprint.route('/upcoming', methods=['GET'])
@token_required()  # Ensure the current user is authenticated
def get_upcoming(current_user):
    current_city = current_user.city  # Assuming current_user has a 'city' attribute
    current_datetime = datetime.utcnow()  # Use UTC for consistency
    start_of_week = current_datetime - timedelta(days=current_datetime.weekday())
    end_of_week = start_of_week + timedelta(days=6)

    # Get the filter option
    filter_option = request.args.get('filter', 'this_week')  # Default to 'this_week'

    # Base query to get teams where the current user is a member
    teams_query = Team.query.join(
        Team.members  # Join with the 'members' relationship
    ).filter(
        Team.isCompleted == True,
        Team.city == current_city,
        Team.date >= current_datetime,  # Ensure the date is in the future or current
        Team.members.any(id=current_user.id)  # Ensure the current user is a member
    )

    # Apply the filter based on the `filter` query parameter
    if filter_option == 'this_week':
        teams_query = teams_query.filter(Team.date >= start_of_week, Team.date <= end_of_week)
    elif filter_option == 'later':
        teams_query = teams_query.filter(Team.date > end_of_week)

    # Sort by date
    teams_query = teams_query.order_by(Team.date.desc())

    # Fetch all matching teams
    teams = teams_query.all()

    # Build the response data
    teams_data = []
    for team in teams:
        members_data = [
            {"username": member.username, "gender": member.gender}
            for member in team.members
        ]
        team_data = {
            "id": team.id,
            "name": team.name,
            "members": members_data,
            "date": team.date,
            "city": team.city,
            "sport": team.sport.name,
        }
        teams_data.append(team_data)

    # Response
    response = {
        "teams": teams_data,
    }
    return jsonify(response), 200

@upcoming_blueprint.route('/countdown', methods=['GET'])
@token_required()  # Ensure the current user is authenticated
def get_countdown(current_user):
    current_city = current_user.city  # Assuming current_user has a 'city' attribute
    current_datetime = datetime.utcnow()  # Use UTC for consistency

    # Query for the next team event in the user's city and that the user is a member of
    next_team = (
        Team.query.filter(
            Team.isCompleted == True,
            Team.city == current_city,
            Team.date >= current_datetime,  # Ensure the date is in the future or current
            Team.members.any(id=current_user.id)  # Ensure the user is a member of the team
        )
        .order_by(Team.date.asc())  # Order by the nearest date
        .first()  # Get the first match
    )

    # Check if a team activity is found
    if not next_team:
        return jsonify({"message": "No upcoming team activities found."}), 404

    # Calculate the countdown (remaining time in milliseconds)
    deadline = int((next_team.date - current_datetime).total_seconds() * 1000)

    # Build the response data
    response = {
        "id": next_team.id,
        "name": next_team.name,
        "countdown": deadline,
    }

    return jsonify(response), 200
