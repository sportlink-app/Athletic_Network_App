from flask import Blueprint, request, jsonify
from ..models import db, Myusers, Team, team_members, TeamInvite, Notification
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

    # Add the current user to the team_members table
    team_member_entry = team_members.insert().values(team_id=team.id, user_id=current_user.id)
    db.session.execute(team_member_entry)
    db.session.commit()

    return jsonify({
        "message": "Team created successfully",
        "team_id": team.id,
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
        return jsonify({"message": "You cannot invite yourself to your own team"}), 403

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

# Respond to Invite API
@team_blueprint.route('/team/invite/response', methods=['POST'])
@token_required()
def respond_to_invitation(current_user):
    reference_id = request.args.get('reference_id', type=int)
    if not reference_id:
        return jsonify({"message": "reference_id query parameter is required"}), 400

    data = request.get_json()
    action = data.get('action')  # 'accept' or 'reject'

    # Check if action is valid
    if action not in ['accept', 'reject']:
        return jsonify({"message": "Invalid action. Use 'accept' or 'reject'."}), 400

    # Check if the invite exists
    invite = TeamInvite.query.filter_by(id=reference_id).first()
    if not invite:
        return jsonify({"message": "Invitation not found."}), 404

    # Check if the current user is the invited user
    if invite.user_id != current_user.id:
        return jsonify({"message": "You are not authorized to respond to this invitation."}), 403

    # Check if the team is already completed
    team = Team.query.get(invite.team_id)
    if team and team.isCompleted:
        return jsonify({"message": "The team is already completed. You cannot accept this invitation."}), 401

    # Update the status of the invitation
    invite.status = 'accepted' if action == 'accept' else 'rejected'

    # Delete any notification associated with the invitation
    notification = Notification.query.filter_by(reference_id=invite.id, type='team_invite').first()
    if notification:
        db.session.delete(notification)

    # If the action is 'accept', add the user to the team members and notify the team owner
    if action == 'accept' and team:
        # Add the current user to team members
        team.members.append(current_user)

        # Send notification to the team owner about the acceptance
        owner_notification = Notification(
            user_id=invite.owner_id,  # Owner of the team
            reference_id=invite.id,
            type='team_invite_response'
        )
        db.session.add(owner_notification)

        # Notify the owner if they are connected
        notify_new_notification(invite.owner_id, socketio, connected_users)

        # Count actual members in the team_members table
        actual_member_count = db.session.query(team_members).filter_by(team_id=team.id).count()

        # Check if the actual member count meets the required members_count
        if actual_member_count >= team.members_count:
            # Mark the team as completed
            team.isCompleted = True

            # Send a "team_completion" notification to all team members
            for member in team.members:
                completion_notification = Notification(
                    user_id=member.id,
                    reference_id=team.id,
                    type='team_completion'
                )
                db.session.add(completion_notification)

                # Notify connected users
                notify_new_notification(member.id, socketio, connected_users)

    # Commit changes
    db.session.commit()

    return jsonify({"message": f"Invitation {invite.status.lower()} successfully."}), 200
