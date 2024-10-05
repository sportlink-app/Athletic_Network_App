from flask import Blueprint, request, jsonify
from ..models import db, Team, TeamInvite, JoinRequest
from .user_blueprint import token_required

team_blueprint = Blueprint('team_blueprint', __name__)

# Create Team API
@team_blueprint.route('/team', methods=['POST'])
@token_required()
def create_team(current_user):
    data = request.get_json()
    name = data.get('name')
    sport_id = data.get('sport')
    city = data.get('city')
    date = data.get('date')
    
    # Validate data
    if not name or not sport_id or not city or not date:
        return jsonify({"message": "Missing required fields"}), 400

    # Create and add the team
    team = Team(name=name, sport_id=sport_id, city=city, date=date, owner_id=current_user.id)
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
    teams = Team.query.filter_by(isCompleted=False).all()

    result = []
    for team in teams:
        result.append({
            "id": team.id,
            "name": team.name,
            "sport": team.sport.name,
            "city": team.city,
            "date": team.date,
            "created_at": team.created_at,
            "owner_username": team.owner.username,
            "members": [{"username": member.username, "gender": member.gender} for member in team.members]
        })

    return jsonify(result), 200

# Invite People to Team API
@team_blueprint.route('/team/invite/<int:team_id>', methods=['POST'])
@token_required()
def invite_to_team(current_user, team_id):
    data = request.get_json()
    user_id = data.get('user_id')

    # Validate data
    if not user_id:
        return jsonify({"message": "Missing user ID"}), 400

    # Check if the team exists and the user is the owner
    team = Team.query.get(team_id)
    if not team or team.owner_id != current_user.id:
        return jsonify({"message": "Team not found or you are not the owner"}), 404

    # Create invite
    invite = TeamInvite(team_id=team_id, user_id=user_id, invited_by_id=current_user.id)
    db.session.add(invite)
    db.session.commit()

    return jsonify({"message": "Invitation sent successfully"}), 200

# Get Invites API
@team_blueprint.route('/team/invites', methods=['GET'])
@token_required()
def get_invites(current_user):
    invites = TeamInvite.query.filter_by(user_id=current_user.id).all()

    result = []
    for invite in invites:
        team = Team.query.get(invite.team_id)  # Get the team related to the invite
        if team:  # Check if the team exists
            result.append({
                "invite_id": invite.id,
                "team_id": team.id,
                "team_name": team.name,
                "invited_by": invite.invited_by.username,  # Assuming invited_by has a username field
                "created_at": invite.created_at
            })

    return jsonify(result), 200

# Accept or Reject Invite API
@team_blueprint.route('/team/respond/<int:invite_id>', methods=['PUT'])
@token_required()
def respond_to_invite(current_user, invite_id):
    data = request.get_json()
    action = data.get('action')

    invite = TeamInvite.query.get(invite_id)
    if not invite or invite.user_id != current_user.id:
        return jsonify({"message": "Invite not found or you are not the recipient"}), 404

    if action == 'accept':
        # Add user to team
        team = Team.query.get(invite.team_id)
        team.members.append(current_user)
        db.session.delete(invite)
    elif action == 'reject':
        db.session.delete(invite)
    else:
        return jsonify({"message": "Invalid action"}), 400

    db.session.commit()

    return jsonify({"message": f"Invite {action}ed successfully"}), 200

# Request to Join Team API
@team_blueprint.route('/team/join/<int:team_id>', methods=['POST'])
@token_required()
def request_to_join(current_user, team_id):
    team = Team.query.get(team_id)
    if not team:
        return jsonify({"message": "Team not found"}), 404

    # Create join request
    join_request = JoinRequest(team_id=team_id, user_id=current_user.id)
    db.session.add(join_request)
    db.session.commit()

    return jsonify({"message": "Join request sent successfully"}), 201

# Complete Team API (when members_count reaches a limit)
@team_blueprint.route('/team/<int:team_id>/complete', methods=['PUT'])
@token_required()
def complete_team(current_user, team_id):
    team = Team.query.get(team_id)
    if not team or team.owner_id != current_user.id:
        return jsonify({"message": "Team not found or you are not the owner"}), 404

    if team.members_count >= desired_count:  # Set desired_count to your requirements
        team.isCompleted = True
        db.session.commit()
        return jsonify({"message": "Team is now complete"}), 200

    return jsonify({"message": "Team is not complete yet"}), 400

