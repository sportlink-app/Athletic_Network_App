from flask import Blueprint, jsonify
from .user_blueprint import token_required
from ..models import db, Notification, TeamInvite, JoinRequest, Team, Myusers, Sport
from ..utils.socketio import socketio, connected_users, handle_connect, handle_disconnect

notification_blueprint = Blueprint('notification_blueprint', __name__)

# Register socketio events for handling connections
def register_socketio_events(socketio):
    socketio.on_event('connect', handle_connect)
    socketio.on_event('disconnect', handle_disconnect)

# Get notifications count API
@notification_blueprint.route('/notifications/count', methods=['GET'])
@token_required()
def get_unread_notifications_count(current_user):
    unread_count = Notification.query.filter_by(user_id=current_user.id, is_read=False).count()

    # Emit the count via WebSocket if the user is connected
    if str(current_user.id) in connected_users:
        socketio.emit('unread_notifications_count', {'count': unread_count}, to=connected_users[str(current_user.id)])

    return jsonify({'unread_count': unread_count}), 200

# Get Notifications API 
@notification_blueprint.route('/notifications', methods=['GET'])
@token_required()
def get_all_notifications(current_user):
    notifications = Notification.query.filter_by(user_id=current_user.id).order_by(Notification.created_at.desc()).all()
    
    notifications_data = []

    for notification in notifications:
        notification_data = {
            "id": notification.id,
            "is_visited": notification.is_visited,
            "type": notification.type,
            "reference_id": notification.reference_id,
            "created_at": notification.created_at.strftime('%Y-%m-%d %H:%M:%S'),
        }
        
        if notification.type == 'team_invite':
                invite = TeamInvite.query.filter_by(id=notification.reference_id).first()
                if invite:
                    team = Team.query.filter_by(id=invite.team_id).first()
                    sender = Myusers.query.filter_by(id=invite.owner_id).first()
                    if team and sender:
                        notification_data.update({
                            "team_name": team.name,
                            "sender": {
                                "username": sender.username,
                                "gender": sender.gender
                            }
                        })

        elif notification.type == 'join_request':
                join_request = JoinRequest.query.filter_by(id=notification.reference_id).first()
                if join_request:
                    team = Team.query.filter_by(id=join_request.team_id).first()
                    sender = Myusers.query.filter_by(id=join_request.user_id).first()
                    if team and sender:
                        notification_data.update({
                            "team_name": team.name,
                            "sender": {
                                "username": sender.username,
                                "gender": sender.gender
                            }
                        })

        elif notification.type == 'team_completion':
                # Assuming you have a method to get the team details
                team = Team.query.filter_by(id=notification.reference_id).first()
                if team:
                    notification_data.update({
                        "team_name": team.name
                    })

        notifications_data.append(notification_data)

    # Commit changes to mark notifications as read
    db.session.commit()

    return jsonify(notifications_data), 200

# Mark Notifications as Read API
@notification_blueprint.route('/notifications/mark-as-read', methods=['PUT'])
@token_required()
def mark_notifications_as_read(current_user):
    try:
        # Fetch all unread notifications for the current user
        unread_notifications = Notification.query.filter_by(user_id=current_user.id, is_read=False).all()

        # Update the is_read status to True for each unread notification
        for notification in unread_notifications:
            notification.is_read = True

        # Commit the changes to the database
        db.session.commit()

        # Emit the updated count via WebSocket if the user is connected
        if str(current_user.id) in connected_users:
            socketio.emit('unread_notifications_count', {'count': 0}, to=connected_users[str(current_user.id)])

        return jsonify({"message": "Notifications marked as read"}), 200
    except Exception as e:
        return jsonify({"message": "Internal server error", "error": str(e)}), 500


# Delete Notification API
@notification_blueprint.route('/notification/<int:notification_id>', methods=['DELETE'])
@token_required()
def delete_notification(current_user, notification_id):
    try:
        notification = Notification.query.get(notification_id)

        if not notification:
            return jsonify({"message": "Notification_id not found"}), 404

        if notification.user_id != current_user.id:
            return jsonify({"message": "You are not authorized to delete this notification"}), 403

        db.session.delete(notification)
        db.session.commit()

        return jsonify({"message": "Notification deleted successfully"}), 200
    except Exception as e:
        return jsonify({"message": "Internal server error", "error": str(e)}), 500

# Get specific notification API
@notification_blueprint.route('/notification/<int:notification_id>', methods=['GET'])
@token_required()
def get_specific_notification(current_user, notification_id):
    try:
        # Fetch the specific notification for the user
        notification = Notification.query.filter_by(id=notification_id, user_id=current_user.id).first()

        if not notification:
            return jsonify({"message": "Notification not found"}), 404

        # Prepare the notification data
        notification_data = {
            "created_at": notification.created_at.strftime('%Y-%m-%d %H:%M:%S'),
            "type": notification.type,
            "reference_id": notification.reference_id,
        }

        # Mark the notification as visited
        notification.is_visited = True
        db.session.commit()

        # Fetch additional data based on the notification type and reference_id
        if notification.reference_id:
            if notification.type == 'team_invite':
                invite = TeamInvite.query.filter_by(id=notification.reference_id).first()
                if invite:
                    team = Team.query.filter_by(id=invite.team_id).first()
                    sender = Myusers.query.filter_by(id=invite.owner_id).first()
                    if team and sender:
                        # Fetch sport details if available
                        sport = Sport.query.filter_by(id=team.sport_id).first() if team.sport_id else None
                        
                        notification_data.update({
                            "team_name": team.name,
                            "city": team.city,
                            "description": team.description,
                            "date": team.date.strftime('%Y-%m-%d'),
                            "sport": sport.name if sport else "N/A",  # Add sport name if available
                            "sender": {
                                "username": sender.username,
                                "gender": sender.gender
                            }
                        })

            elif notification.type == 'join_request':
                join_request = JoinRequest.query.filter_by(id=notification.reference_id).first()
                if join_request:
                    team = Team.query.filter_by(id=join_request.team_id).first()
                    sender = Myusers.query.filter_by(id=join_request.user_id).first()
                    if team and sender:
                        # Fetch sport details if available
                        sport = Sport.query.filter_by(id=team.sport_id).first() if team.sport_id else None

                        notification_data.update({
                            "team_name": team.name,
                            "city": team.city,
                            "description": team.description,
                            "date": team.date.strftime('%Y-%m-%d'),
                            "sport": sport.name if sport else "N/A",  # Add sport name if available
                            "sender": {
                                "username": sender.username,
                                "gender": sender.gender
                            }
                        })

            elif notification.type == 'team_completion':
                team = Team.query.filter_by(id=notification.reference_id).first()
                if team:
                    # Fetch team members
                    members = Member.query.filter_by(team_id=team.id).all()
                    members_data = [
                        {"username": member.username, "availability": member.availability, "gender": member.gender}
                        for member in members
                    ]

                    # Fetch sport details if available
                    sport = Sport.query.filter_by(id=team.sport_id).first() if team.sport_id else None

                    notification_data.update({
                        "team_name": team.name,
                        "city": team.city,
                        "description": team.description,
                        "date": team.date.strftime('%Y-%m-%d'),
                        "sport": sport.name if sport else "N/A",  # Add sport name if available
                        "members": members_data
                    })

        return jsonify(notification_data), 200

    except Exception as e:
        return jsonify({"message": "Internal server error", "error": str(e)}), 500
