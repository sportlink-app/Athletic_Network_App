from flask import Blueprint, request, jsonify
from ..models import db, Myusers, Sport, user_sports  # Import Sport for handling many-to-many relationship
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime
from functools import wraps
from ..config import Config

SECRET_KEY = Config.SECRET_KEY
user_blueprint = Blueprint('user_blueprint', __name__)

def token_required(skip_profile_check=False):
    def decorator(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            token = request.headers.get('Authorization')
            if not token:
                return jsonify({"message": "Token is missing!"}), 403

            try:
                token = token.split()[1]
                data = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
                current_user = Myusers.query.filter_by(id=data['id']).first()

                if not current_user:
                    return jsonify({"message": "User not found!"}), 404

                if not skip_profile_check and not current_user.isProfileCompleted:
                    return jsonify({"message": "Profile is not completed"}), 403

            except jwt.ExpiredSignatureError:
                return jsonify({"message": "Token has expired!"}), 403
            except jwt.InvalidTokenError:
                return jsonify({"message": "Token is invalid!"}), 403
            except Exception as e:
                return jsonify({"message": f"An error occurred: {str(e)}"}), 403

            return f(current_user, *args, **kwargs)
        return decorated
    return decorator

# Sign-Up API
@user_blueprint.route('/signup', methods=['POST'])
def signup():
    try:
        data = request.get_json()

        # Check if the username or email already exists
        if Myusers.query.filter_by(username=data['username']).first():
            return jsonify({"message": "Username already exists!"}), 400
        if Myusers.query.filter_by(email=data['email']).first():
            return jsonify({"message": "Email already exists!"}), 400

        # Hash the password
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
        }, SECRET_KEY)

        return jsonify({
            "message": "Profile created successfully!",
            'username': new_user.username,
            "token": token
        }), 200
    except Exception as e:
        return jsonify({"message": "Internal server error", "error": str(e)}), 500

# Login API
@user_blueprint.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        user = Myusers.query.filter_by(email=data['email']).first()
        if not user or not check_password_hash(user.password, data['password']):
            return jsonify({"message": "Login failed!"}), 400

        token = jwt.encode({
            'id': user.id,
            'username': user.username,
            'isProfileCompleted': user.isProfileCompleted,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        }, SECRET_KEY)

        return jsonify({"message": "Login successful",'username': user.username, "token": token}), 200
    except Exception as e:
        return jsonify({"message": "Internal server error", "error": str(e)}), 500

# Complete Profile API
@user_blueprint.route('/complete-profile', methods=['POST'])
@token_required(skip_profile_check=True)
def complete_profile(current_user):
    try:
        user = current_user

        if user.isProfileCompleted:
            return jsonify({"message": "Profile is already completed"}), 400

        data = request.get_json()

        required_fields = ['gender', 'bio', 'sports', 'city', 'tel']
        missing_fields = [field for field in required_fields if not data.get(field)]

        if missing_fields:
            return jsonify({
                "message": "Missing or empty required fields",
                "missing_fields": missing_fields
            }), 400

        user.gender = data.get('gender')
        user.bio = data.get('bio')

        # Handle many-to-many relationship for sports
        sports = data.get('sports', [])
        user.sports = []
        for sport_name in sports:
            sport = Sport.query.filter_by(name=sport_name).first()
            if sport:
                user.sports.append(sport)

        user.city = data.get('city')
        user.tel = data.get('tel')
        user.isProfileCompleted = True

        db.session.commit()

        token = jwt.encode({
            'id': user.id,
            'username': user.username,
            'isProfileCompleted': user.isProfileCompleted,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        }, SECRET_KEY)

        return jsonify({
            "message": "Profile completed successfully!",
            "token": token
        }), 200

    except Exception as e:
        return jsonify({"message": "Internal server error", "error": str(e)}), 500

# Get User Profile API
@user_blueprint.route('/profile', methods=['GET'])
@token_required()
def get_profile(current_user):
    try:
        user = Myusers.query.get(current_user.id)
        sports_list = [sport.name for sport in user.sports]

        return jsonify({
            "username": user.username,
            "gender": user.gender,
            "email": user.email,
            "bio": user.bio,
            "sports": sports_list,
            "city": user.city,
            "tel": user.tel,
        }), 200
    except Exception as e:
        return jsonify({"message": "Internal server error", "error": str(e)}), 500

# Update User Profile API
@user_blueprint.route('/profile', methods=['PUT'])
@token_required()
def update_profile(current_user):
    try:
        data = request.get_json()
        new_username = data.get('username')
        existing_user = Myusers.query.filter_by(username=new_username).first()
        if existing_user and existing_user.id != current_user.id:
            return jsonify({"message": "Username already exists"}), 400

        user = Myusers.query.get(current_user.id)
        user.username = new_username
        user.bio = data.get('bio')
        user.gender = data.get('gender')

        # Handle many-to-many relationship for sports
        sports = data.get('sports', [])
        user.sports = []
        for sport_name in sports:
            sport = Sport.query.filter_by(name=sport_name).first()
            if sport:
                user.sports.append(sport)

        user.city = data.get('city')
        user.tel = data.get('tel')
        db.session.commit()

        token = jwt.encode({
            'id': user.id,
            'username': user.username,
            'isProfileCompleted': user.isProfileCompleted,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        }, SECRET_KEY)

        return jsonify({
            "message": "Profile updated successfully",
            "token": token
        }), 200
    
    except Exception as e:
        return jsonify({"message": "Internal server error", "error": str(e)}), 500

# Delete User API
@user_blueprint.route('/profile', methods=['DELETE'])
@token_required()
def delete_user(current_user):
    try:
        user = Myusers.query.get(current_user.id)
        db.session.delete(user)
        db.session.commit()
        return jsonify({"message": "Account deleted successfully"}), 200
    except Exception as e:
        return jsonify({"message": "Internal server error", "error": str(e)}), 500

# Get Specific User API
@user_blueprint.route('/users/<string:username>', methods=['GET'])
@token_required()
def get_specific_user(current_user, username):
    try:
        user = Myusers.query.filter_by(username=username).first()

        if not user:
            return jsonify({"message": "User not found!"}), 404

        sports_list = [sport.name for sport in user.sports]

        return jsonify({
            "username": user.username,
            "gender": user.gender,
            "sports": sports_list,
            "city": user.city,
            "bio": user.bio,
        }), 200
    except Exception as e:
        return jsonify({"message": "Internal server error", "error": str(e)}), 500

# Get All Users API and search by sport name
@user_blueprint.route('/users', methods=['GET'])
@token_required()
def get_all_users(current_user):
    try:
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        sport_name = request.args.get('sport', None)  # Query parameter for sport search

        # Extract the current user's ID
        current_user_id = current_user.id

        # Base query to filter out the current user and ensure profile completion
        query = Myusers.query.filter(
            Myusers.id != current_user_id,               # Exclude the current user
            Myusers.isProfileCompleted == True,          # Ensure profile is completed
            Myusers.availability == True                 # Ensure the user is available
        )

        # If a sport name is provided, filter users by sport
        if sport_name:
            query = query.join(user_sports).join(Sport).filter(Sport.name.ilike(f'%{sport_name}%'))

        # Paginate the results
        users_query = query.paginate(page=page, per_page=per_page, error_out=False)

        output = []
        for user in users_query.items:
            sports_list = [sport.name for sport in user.sports]
            user_data = {
                "username": user.username,
                "gender": user.gender,
                "sports": sports_list,
                "city": user.city
            }
            output.append(user_data)

        pagination_metadata = {
            "total_items": users_query.total,
            "total_pages": users_query.pages,
            "current_page": users_query.page,
            "per_page": users_query.per_page,
            "items": output
        }

        return jsonify(pagination_metadata), 200
    except Exception as e:
        return jsonify({"message": "Internal server error", "error": str(e)}), 500

# Get User Availability API
@user_blueprint.route('/availability/<string:username>', methods=['GET'], endpoint='get_availability')
@token_required()
def get_availability(current_user, username):
    try:
        user = Myusers.query.filter_by(username=username).first()
        return jsonify({"availability": user.availability}), 200
    except Exception as e:
        return jsonify({"message": "Internal server error", "error": str(e)}), 500

# Update User Availability API
@user_blueprint.route('/availability', methods=['PUT'], endpoint='update_availability')
@token_required()
def update_availability(current_user):
    try:
        data = request.get_json()
        user = Myusers.query.get(current_user.id)
        user.availability = data.get('availability', user.availability)
        db.session.commit()
        return jsonify({"message": "Availability updated"}), 200
    except Exception as e:
        return jsonify({"message": "Internal server error", "error": str(e)}), 500









