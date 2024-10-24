from flask import Blueprint, request, jsonify
from flask_socketio import emit
from .user_blueprint import token_required
from ..models import db, Notification, TeamInvite, Team, Myusers
from ..utils.socketio import socketio, connected_users, handle_connect, handle_disconnect

notification_blueprint = Blueprint('notification_blueprint', __name__)

# Register socketio events for handling connections
def register_socketio_events(socketio):
    socketio.on_event('connect', handle_connect)
    socketio.on_event('disconnect', handle_disconnect)

@notification_blueprint.route('/notifications/count', methods=['GET'])
@token_required()
def get_unread_notifications_count(current_user):
    unread_count = Notification.query.filter_by(user_id=current_user.id, is_read=False).count()

    # Emit the count via WebSocket if the user is connected
    if str(current_user.id) in connected_users:
        socketio.emit('unread_notifications_count', {'count': unread_count}, to=connected_users[str(current_user.id)])

    return jsonify({'unread_count': unread_count}), 200

@notification_blueprint.route('/notifications', methods=['GET'])
@token_required()
def get_notifications(current_user):
    # Order notifications by 'created_at' in descending order
    notifications = Notification.query.filter_by(user_id=current_user.id).order_by(Notification.created_at.desc()).all()
    
    notifications_data = []

    for notification in notifications:
        if notification.invite_id:
            invite = TeamInvite.query.filter_by(id=notification.invite_id).first()
            if invite:
                team = Team.query.filter_by(id=invite.team_id).first()
                if not team:
                    continue

                sender = Myusers.query.filter_by(id=invite.invited_by_id).first()
                if not sender:
                    continue
                
                # Mark notification as read
                notification.is_read = True
                
                # Create notification data object
                notification_data = {
                    "type": notification.type, 
                    "invite_id": invite.id,
                    "team_name": team.name,
                    "created_at": notification.created_at.strftime('%Y-%m-%d %H:%M:%S'),
                    "sender": {
                        "username": sender.username,
                        "gender": sender.gender  # Assuming the 'gender' field exists in Myusers model
                    }
                }

                # Append the data to the list
                notifications_data.append(notification_data)

    # Commit changes to mark notifications as read
    db.session.commit()
    
    return jsonify(notifications_data), 200
