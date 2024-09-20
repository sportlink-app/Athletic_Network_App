from flask import Blueprint, request, jsonify
from ..models import db, Myusers  # Changed import to relative import
from werkzeug.security import generate_password_hash
import jwt
import datetime
from ..utils.email_utils import send_reset_email  # Adjusted import path
from ..config import Config  # Adjusted import path

SECRET_KEY = Config.SECRET_KEY
password_blueprint = Blueprint('password_blueprint', __name__)


# Forgot Password API
@password_blueprint.route('/forgot_password', methods=['POST'])
def forgot_password():
    try:
        data = request.get_json()

        # Fetch the user by email
        user = Myusers.query.filter_by(email=data['email']).first()
        if not user:
            return jsonify({"message": "User not found!"}), 404

        # Generate a password reset token
        reset_token = jwt.encode({
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30)
        }, 'SECRET_KEY')

        # Send the reset token via email
        send_reset_email(user.email, reset_token)

        return jsonify({"message": "Password reset link sent to your email!"}), 200
    except Exception as e:
        return jsonify({"message": "Internal server error", "error": str(e)}), 500

# Reset Password API
@password_blueprint.route('/reset_password/<token>', methods=['POST'])
def reset_password(token):
    try:
        # Decode the reset token
        data = jwt.decode(token, 'SECRET_KEY', algorithms=["HS256"])
        user = Myusers.query.get(data['id'])

        if not user:
            return jsonify({"message": "Invalid or expired token!"}), 400

        # Get the new password from the request
        data = request.get_json()
        new_password = data.get('new_password')

        # Hash the new password and update the user record
        hashed_password = generate_password_hash(new_password, method='pbkdf2:sha256')
        user.password = hashed_password
        db.session.commit()

        return jsonify({"message": "Password has been reset successfully!"}), 200
    except jwt.ExpiredSignatureError:
        return jsonify({"message": "Token has expired!"}), 400
    except Exception as e:
        return jsonify({"message": "Invalid or expired token!", "error": str(e)}), 400

