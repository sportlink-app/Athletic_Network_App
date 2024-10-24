from ..models import Notification

# Notify the user in real-time about the new notification
def notify_new_notification(user_id, socketio, connected_users):
    unread_count = Notification.query.filter_by(user_id=user_id, is_read=False).count()
    if str(user_id) in connected_users:
        socketio.emit('unread_notifications_count', {'count': unread_count}, to=connected_users[str(user_id)])

