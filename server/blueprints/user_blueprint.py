from flask import Blueprint, request, jsonify
from models import db, Myusers
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime
from functools import wraps
from config import Config  # Import Config to load SECRET_KEY

SECRET_KEY = Config.SECRET_KEY
user_blueprint = Blueprint('user_blueprint', __name__)

# JWT Token Decorator
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({"message": "Token is missing!"}), 403
        try:
            # Decode the token, extracting both id and username
            data = jwt.decode(token.split()[1], 'SECRET_KEY', algorithms=["HS256"])

            # You can log the decoded data to check its structure
            print(f"Decoded token: {data}")

            # Use the id from the token to find the current user
            current_user = Myusers.query.filter_by(id=data['id']).first()

            if not current_user:
                return jsonify({"message": "User not found!"}), 404
        except jwt.ExpiredSignatureError:
            return jsonify({"message": "Token has expired!"}), 403
        except Exception as e:
            return jsonify({"message": "Token is invalid!"}), 403
        return f(current_user, *args, **kwargs)
    return decorated

# Sign-Up API
@user_blueprint.route('/signup', methods=['POST'])
def signup():
    try:
        data = request.get_json()

        # Check if the username already exists
        if Myusers.query.filter_by(username=data['username']).first():
            return jsonify({"message": "Username already exists!"}), 400

        # Check if the email already exists
        if Myusers.query.filter_by(email=data['email']).first():
            return jsonify({"message": "Email already exists!"}), 400

        # Hash the password with pbkdf2:sha256
        hashed_password = generate_password_hash(data['password'], method='pbkdf2:sha256')

        # Create a new user
        new_user = Myusers(username=data['username'], email=data['email'], password=hashed_password)
        db.session.add(new_user)
        db.session.commit()

        # Generate token
        token = jwt.encode({
            'id': new_user.id,
            'username': new_user.username,
            'isProfileCompleted': new_user.isProfileCompleted,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        }, 'SECRET_KEY')

        # Return success message
        return jsonify({
            "message": "Profile created successfully!",
            "token": token
        }), 201
    except Exception as e:
        return jsonify({"message": "Internal server error", "error": str(e)}), 500

# Login API
@user_blueprint.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        user = Myusers.query.filter_by(email=data['email']).first()
        if not user or not check_password_hash(user.password, data['password']):
            return jsonify({"message": "Login failed!"}), 401

        # Generate token with the correct user variable
        token = jwt.encode({
            'id': user.id,
            'username': user.username,
            'isProfileCompleted': user.isProfileCompleted,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        }, 'SECRET_KEY')

        return jsonify({"message": "Login successful", "token": token}), 200
    except Exception as e:
        return jsonify({"message": "Internal server error", "error": str(e)}), 500

# Complete Profile API
@user_blueprint.route('/profile/<int:id>', methods=['POST'])
@token_required
def complete_profile(current_user, id):
    try:
        data = request.get_json()
        user = Myusers.query.get(id)
        if not user:
            return jsonify({"message": "User not found!"}), 404
        if user != current_user:
            return jsonify({"message": "Unauthorized!"}), 403
        user.gender = data.get('gender')
        user.bio = data.get('bio')
        user.sports = ','.join(data.get('sports', []))  # Join sports as comma-separated string
        user.city = data.get('city')
        user.tel = data.get('tel')
        user.isProfileCompleted = True
        db.session.commit()
        return jsonify({"message": "Profile completed successfully", "isProfileCompleted": True}), 200
    except Exception as e:
        return jsonify({"message": "Internal server error", "error": str(e)}), 500

# Get User Profile API
@user_blueprint.route('/profile/<int:id>', methods=['GET'])
@token_required
def get_profile(current_user, id):
    try:
        user = Myusers.query.get(id)
        if not user:
            return jsonify({"message": "User not found!"}), 404
        if user != current_user:
            return jsonify({"message": "Unauthorized!"}), 403
        return jsonify({
            "username": user.username,
            "gender": user.gender,
            "bio": user.bio,
            "sports": user.sports.split(','),
            "city": user.city,
            "tel": user.tel,
            "isProfileCompleted": user.isProfileCompleted
        }), 200
    except Exception as e:
        return jsonify({"message": "Internal server error", "error": str(e)}), 500

# Update User Profile API
@user_blueprint.route('/profile/<int:id>', methods=['PUT'])
@token_required
def update_profile(current_user, id):
    try:
        data = request.get_json()
        user = Myusers.query.get(id)
        if not user:
            return jsonify({"message": "User not found!"}), 404
        if user != current_user:
            return jsonify({"message": "Unauthorized!"}), 403
        user.gender = data.get('gender')
        user.bio = data.get('bio')
        user.sports = ','.join(data.get('sports', []))
        user.city = data.get('city')
        user.tel = data.get('tel')
        user.email = data.get('email')  # Ensure email is being updated
        db.session.commit()
        return jsonify({"message": "Profile updated successfully"}), 200
    except Exception as e:
        return jsonify({"message": "Internal server error", "error": str(e)}), 500

# Delete User API
@user_blueprint.route('/profile/<int:id>', methods=['DELETE'])
@token_required
def delete_user(current_user, id):
    try:
        user = Myusers.query.get(id)
        if not user:
            return jsonify({"message": "User not found!"}), 404
        if user != current_user:
            return jsonify({"message": "Unauthorized!"}), 403
        db.session.delete(user)
        db.session.commit()
        return jsonify({"message": "Account deleted successfully"}), 200
    except Exception as e:
        return jsonify({"message": "Internal server error", "error": str(e)}), 500

# Get Specific User API
@user_blueprint.route('/user/<int:id>', methods=['GET'])
@token_required
def get_specific_user(current_user, id):
    try:
        # Fetch the user based on the id passed in the URL
        user = Myusers.query.get(id)

        if not user:
            return jsonify({"message": "User not found!"}), 404

        return jsonify({
            "username": user.username,
            "isAvailable": user.availability,
            "sports": user.sports.split(',') if user.sports else [],
            "city": user.city,
            "bio": user.bio,
            "isProfileCompleted": user.isProfileCompleted
        }), 200
    except Exception as e:
        return jsonify({"message": "Internal server error", "error": str(e)}), 500

# Get All Users API
@user_blueprint.route('/users', methods=['GET'])
@token_required
def get_all_users(current_user):
    try:
        users = Myusers.query.all()
        output = []
        for user in users:
            user_data = {
                "username": user.username,
                "isAvailable": user.availability,
                "sports": user.sports.split(','),
                "city": user.city
            }
            output.append(user_data)
        return jsonify(output), 200
    except Exception as e:
        return jsonify({"message": "Internal server error", "error": str(e)}), 500

# Search Users API
@user_blueprint.route('/users/search', methods=['GET'])
@token_required
def search_users(current_user):
    try:
        city = request.args.get('city')
        sport = request.args.get('sport')
        availability = request.args.get('availability', type=bool)
        query = Myusers.query
        if city:
            query = query.filter_by(city=city)
        if sport:
            query = query.filter(Myusers.sports.contains(sport))
        if availability is not None:
            query = query.filter_by(availability=availability)
        users = query.all()
        if not users:
            return jsonify({"message": "No users found!"}), 404
        output = []
        for user in users:
            user_data = {
                "username": user.username,
                "isAvailable": user.availability,
                "sports": user.sports.split(','),
                "city": user.city
            }
            output.append(user_data)
        return jsonify(output), 200
    except Exception as e:
        return jsonify({"message": "Internal server error", "error": str(e)}), 500

# Get User Availability API
@user_blueprint.route('/availability/<int:id>', methods=['GET'])
@token_required
def get_availability(current_user, id):
    try:
        user = Myusers.query.get(id)
        if not user:
            return jsonify({"message": "User not found!"}), 404
        return jsonify({"isAvailable": user.availability}), 200
    except Exception as e:
        return jsonify({"message": "Internal server error", "error": str(e)}), 500

# Update User Availability API
@user_blueprint.route('/availability/<int:id>', methods=['PUT'])
@token_required
def update_availability(current_user, id):
    try:
        data = request.get_json()
        user = Myusers.query.get(id)
        if not user:
            return jsonify({"message": "User not found!"}), 404
        if user != current_user:
            return jsonify({"message": "Unauthorized!"}), 403
        user.availability = data.get('availability', user.availability)
        db.session.commit()
        return jsonify({"message": "Availability updated"}), 200
    except Exception as e:
        return jsonify({"message": "Internal server error", "error": str(e)}), 500

