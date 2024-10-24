from flask_socketio import SocketIO, emit
from flask import request

# Initialize SocketIO with CORS allowed origins
socketio = SocketIO(cors_allowed_origins="*")

# Dictionary to store connected users and their session IDs
connected_users = {}

# Handle user connection
@socketio.on('connect')
def handle_connect():
    user_id = request.args.get('user_id')  # Send user_id from frontend when connecting
    if user_id:
        connected_users[user_id] = request.sid
        print(f"User {user_id} connected with session ID {request.sid}")

# Handle user disconnection
@socketio.on('disconnect')
def handle_disconnect():
    user_id = request.args.get('user_id')
    if user_id in connected_users:
        del connected_users[user_id]
        print(f"User {user_id} disconnected")

# Emit notification to a specific user
def send_notification(user_id, notification_data):
    if user_id in connected_users:
        socketio.emit('notification', notification_data, to=connected_users[user_id])

