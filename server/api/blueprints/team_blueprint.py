from flask import Blueprint, request, jsonify
from ..models import db, Myusers, Team, TeamInvite, Notification
from .user_blueprint import token_required
from sqlalchemy import func
from ..utils.notification_utils import notify_new_notification 
from ..utils.socketio import socketio, connected_users

team_blueprint = Blueprint('team_blueprint', __name__)

# Create Team API
@team_blueprint.route('/team', methods=['POST'])
@token_required()
def create_team(current_user):
    data = request.get_json()
    name = data.get('name')
    sport_id = data.get('sport_id')
    city = data.get('city')
    date = data.get('date')
    description = data.get('description')  
    members_count = data.get('members_count')  

    # Validate data
    if not name or not sport_id or not city or not date:
        return jsonify({"message": "Missing required fields"}), 400

    # Check if the team name already exists
    existing_team = Team.query.filter_by(name=name).first()
    if existing_team:
        return jsonify({"message": "Team name already exists"}), 404
    
    # Optionally, you can also validate the description length
    if description and len(description) > 500:
        return jsonify({"message": "Description is too long, max 500 characters allowed"}), 400

    # Create and add the team
    team = Team(
        name=name,
        sport_id=sport_id,
        city=city,
        date=date,
        description=description,  
        members_count=members_count,  
        owner_id=current_user.id
    )
    db.session.add(team)
    db.session.commit()

    return jsonify({
        "message": "Team created successfully",
        "team_id": team.id,
        "isCompleted": team.isCompleted
    }), 201

# Retrieve Teams API
@team_blueprint.route('/teams', methods=['GET'])
@token_required()
def get_teams(current_user):
    # Query to get teams that are not owned by the current user and have more than 2 members
    teams = (
        db.session.query(Team)
        .outerjoin(Team.members)  # Use outer join to include teams without members
        .filter(Team.owner_id != current_user.id)  # Exclude teams owned by the current user
        .filter(Team.isCompleted == False)  # Exclude completed teams
        .group_by(Team.id)  # Group by team ID to aggregate member count
        .having(func.count(Myusers.id) >= 1)  # Count of members (users) must be greater than 2
        .options(db.joinedload(Team.members))  # Eager load members
        .all()
    )

    # Prepare the response
    result = []
    for team in teams:
        result.append({
            "id": team.id,
            "name": team.name,
            "sport": team.sport.name,
            "city": team.city,
            "date": team.date,
            "members": [{"username": member.username, "gender": member.gender} for member in team.members]
        })

    return jsonify(result), 200

# Invite Member API
@team_blueprint.route('/team/invite', methods=['POST'])
@token_required()
def invite_member(current_user):
    # Get the team_id from the query parameters
    team_id = request.args.get('team_id', type=int)
    if not team_id:
        return jsonify({"message": "team_id query parameter is required"}), 400

    data = request.get_json()
    user_id = data.get('user_id')  # The ID of the user to invite

    # Check if the team exists and is owned by the current user
    team = Team.query.filter_by(id=team_id).first()
    if not team:
        return jsonify({"message": "Team not found"}), 404

    # Check if the current user is the owner of the team
    if team.owner_id != current_user.id:
        return jsonify({"message": "You are not the owner of this team"}), 403

    # Ensure the owner is not inviting themselves
    if user_id == current_user.id:
        return jsonify({"message": "You cannot invite yourself to your own team"}), 400

    # Check if the user is already a member or has an existing invite
    existing_invite = TeamInvite.query.filter_by(team_id=team_id, user_id=user_id).first()
    if existing_invite:
        return jsonify({"message": "User has already been invited"}), 400

    # Create the invite
    invite = TeamInvite(
        team_id=team_id,
        user_id=user_id,
        owner_id=current_user.id
    )
    db.session.add(invite)
    db.session.flush()  

    # Create a notification for the invited user
    notification = Notification(
        user_id=user_id,
        reference_id=invite.id,  # Reference to the TeamInvite
        type='team_invite'  # Specify the type of notification
    )
    db.session.add(notification)
    
    # Call the notify function from utils
    notify_new_notification(user_id, socketio, connected_users)
    
    # Commit all changes to the database
    db.session.commit()

    return jsonify({"message": "Invitation sent successfully"}), 201

# Respond to Invitation API
@team_blueprint.route('/invitation/<int:invite_id>', methods=['PATCH'])
@token_required()
def respond_to_invitation(current_user, invite_id):
    # Query for the invitation
    invite = TeamInvite.query.filter_by(id=invite_id, user_id=current_user.id).first()
    
    if not invite:
        return jsonify({"message": "Invitation not found or does not belong to you"}), 404

    # Check if the invitation is still pending
    if invite.status != 'Pending':
        return jsonify({"message": "Invitation has already been responded to"}), 400

    # Check the action (accept or reject)
    data = request.get_json()
    action = data.get('action')  # expected to be either 'accept' or 'reject'

    if action == 'accept':
        # Add user to the team (assuming there is a many-to-many relationship)
        team = invite.team  # Get the team associated with the invitation
        team.members.append(current_user)  # Add the current user to the team

        # Update the invite status
        invite.status = 'Accepted'
        
        db.session.commit()

        return jsonify({"message": "Invitation accepted successfully"}), 200

    elif action == 'reject':
        # Delete the invitation
        db.session.delete(invite)
        db.session.commit()

        return jsonify({"message": "Invitation rejected successfully"}), 200

    else:
        return jsonify({"message": "Invalid action. Please specify 'accept' or 'reject'."}), 400
