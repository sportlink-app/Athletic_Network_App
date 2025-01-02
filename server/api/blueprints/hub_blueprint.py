from flask import Blueprint, request, jsonify
from ..models import db, Team, Sport
from .user_blueprint import token_required
from datetime import datetime, timedelta
from sqlalchemy import func, extract, cast, Date

hub_blueprint = Blueprint('hub_blueprint', __name__)

@hub_blueprint.route('/hub', methods=['GET'])
@token_required()  # Ensure the current user is authenticated
def get_hub(current_user):
    current_city = current_user.city  # Assuming current_user has a 'city' attribute
    current_datetime = datetime.utcnow()  # Use UTC for consistency
    start_of_week = current_datetime - timedelta(days=current_datetime.weekday())
    end_of_week = start_of_week + timedelta(days=6)

    # Get the filter option
    filter_option = request.args.get('filter', 'finished')  # Default to 'this_week'

    # Base query to get teams where the current user is a member
    teams_query = Team.query.join(
        Team.members  # Join with the 'members' relationship
    ).filter(
        Team.isCompleted == True,
        Team.city == current_city,
        Team.members.any(id=current_user.id)  # Ensure the current user is a member
    )

    # Apply the filter based on the `filter` query parameter
    if filter_option == 'this_week':
        teams_query = teams_query.filter(Team.date >= current_datetime, Team.date >= start_of_week, Team.date <= end_of_week)
    elif filter_option == 'later':
        teams_query = teams_query.filter(Team.date > end_of_week)
    elif filter_option == 'finished':
        # Get completed teams with deprecated (past) dates
        teams_query = teams_query.filter(Team.date < current_datetime)

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

@hub_blueprint.route('/countdown', methods=['GET'])
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
        return jsonify({"message": "No hub team activities found."}), 404

    # Calculate the countdown (remaining time in milliseconds)
    deadline = int((next_team.date - current_datetime).total_seconds() * 1000)

    # Build the response data
    response = {
        "id": next_team.id,
        "name": next_team.name,
        "countdown": deadline,
    }

    return jsonify(response), 200


@hub_blueprint.route('/progress', methods=['GET'])
@token_required()  # Ensure the current user is authenticated
def get_progress(current_user):
    # Get the current date
    today = datetime.utcnow()
    
    # Determine the date 8 weeks ago
    eight_weeks_ago = today - timedelta(weeks=8)

    # Query to fetch completed teams grouped by week
    results = db.session.query(
        func.to_char(Team.created_at, 'IYYY-IW').label('week'),
        func.count(Team.id).label('times')
    ).filter(
        Team.owner_id == current_user.id,
        Team.isCompleted == True,  # Only count completed teams
        Team.created_at >= eight_weeks_ago  # Limit to the last 8 weeks
    ).group_by(
        func.to_char(Team.created_at, 'IYYY-IW')
    ).order_by('week').all()

    # Format the data into the required structure
    data = []
    for week, times in results:
        # Calculate the start and end dates of the week
        year, week_number = map(int, week.split('-'))
        start_date = datetime.strptime(f'{year}-{week_number}-1', '%Y-%W-%w')
        end_date = start_date + timedelta(days=6)
        week_range = f'{start_date.strftime("%b %d")} - {end_date.strftime("%b %d")}'
        data.append({'week': week_range, 'activities': times})

    return jsonify(data), 200


@hub_blueprint.route('/engaging_sports', methods=['GET'])
@token_required()  # Ensure the current user is authenticated
def get_engaging_sports(current_user):
    # Get the current date
    today = datetime.utcnow()

    # Query to fetch completed teams with sport names and their count
    results = db.session.query(
        Sport.name.label('sport_name'),
        func.count(Team.id).label('times')
    ).join(Team, Team.sport_id == Sport.id) \
     .filter(
         Team.owner_id == current_user.id,
         Team.isCompleted == True  # Only count completed teams
     ).group_by(Sport.name) \
      .all()

    # If no results, return an empty list
    if not results:
        return jsonify([]), 200

    # Format the data into the required structure
    engaging_sports = [{'sport': sport_name, 'times': times} for sport_name, times in results]

    return jsonify(engaging_sports), 200