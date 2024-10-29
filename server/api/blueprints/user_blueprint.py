from flask import Blueprint, request, jsonify
from ..models import db, Myusers, Sport, Team, TeamInvite
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
            'exp': datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(days=365)
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
            'exp': datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(days=365)
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

        # Check if profile is already completed
        if user.isProfileCompleted:
            return jsonify({"message": "Profile is already completed"}), 400

        data = request.get_json()

        # Validate required fields
        required_fields = ['gender', 'bio', 'sports', 'city', 'tel']
        missing_fields = [field for field in required_fields if not data.get(field)]

        if missing_fields:
            return jsonify({
                "message": "Missing or empty required fields",
                "missing_fields": missing_fields
            }), 400

        # Set basic profile details
        user.gender = data.get('gender')
        user.bio = data.get('bio')
        user.city = data.get('city')
        user.tel = data.get('tel')

        # Handle many-to-many relationship for sports, now using sport IDs
        sports_ids = data.get('sports', [])
        user.sports = []

        for sport_id in sports_ids:
            sport = Sport.query.filter_by(id=sport_id).first()
            if sport:
                user.sports.append(sport)
            else:
                return jsonify({"message": f"Sport with ID {sport_id} not found"}), 404

        # Mark the profile as completed
        user.isProfileCompleted = True
        db.session.commit()

        # Generate a new token
        token = jwt.encode({
            'id': user.id,
            'username': user.username,
            'isProfileCompleted': user.isProfileCompleted,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        }, SECRET_KEY)

        # Return success response with token
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
        sports_list = [{"id": sport.id, "name": sport.name} for sport in user.sports]

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

        # Handle many-to-many relationship for sports using IDs
        sport_ids = data.get('sports', [])
        user.sports = []
        for sport_id in sport_ids:
            sport = Sport.query.get(sport_id)
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

# api.py
@user_blueprint.route('/profile', methods=['DELETE'])
@token_required()
def delete_user(current_user):
    try:
        user = Myusers.query.get(current_user.id)
        if not user:
            return jsonify({"message": "User not found"}), 404
        
      
        
        # Now delete the user
        db.session.delete(user)
        db.session.commit()

        return jsonify({"message": "Account deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()  # Ensure session rollback on error
        return jsonify({"message": "Internal server error", "error": str(e)}), 500

# Get Specific User API
@user_blueprint.route('/user/<string:username>', methods=['GET'])
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

# Get All Users API and search by username
@user_blueprint.route('/users', methods=['GET'])
@token_required()
def get_all_users(current_user):
    try:
        # Get pagination parameters
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        team_id = request.args.get('team_id', None, type=int)
        username = request.args.get('username', None, type=str)

        # Extract the current user's ID from the token
        current_user_id = current_user.id

        # Retrieve the current user's data from the database
        current_user_db = Myusers.query.filter_by(id=current_user_id).first()
        
        if not current_user_db:
            return jsonify({"message": "User not found"}), 404

        team_members = set()  # Initialize set for team members
        team_invites = set()  # Initialize set for team invites

        # Validate team existence and ownership if team_id is provided
        if team_id:
            team = Team.query.filter_by(id=team_id, owner_id=current_user_id).first()
            if not team:
                return jsonify({"message": "Team not found or you are not the team owner"}), 403
            
            # Populate team members and invites
            team_members = {member.id for member in team.members}
            team_invites = {invite.user_id for invite in TeamInvite.query.filter_by(team_id=team_id).all()}

        # Get the current user's city
        current_user_city = current_user_db.city

        # Base query to filter out the current user and ensure profile completion
        query = Myusers.query.filter(
            Myusers.id != current_user_id,
            Myusers.isProfileCompleted == True,
            Myusers.availability == True,
            Myusers.city == current_user_city
        )

        # Filter by team's sport and city if team_id is provided
        if team_id:
            query = query.filter(
                Myusers.city == team.city,
                Myusers.sports.any(Sport.name == team.sport.name)
            )

        # Apply username filter if provided
        if username:
            query = query.filter(Myusers.username.ilike(f"%{username}%"))

        # Paginate the results
        users_query = query.paginate(page=page, per_page=per_page, error_out=False)

        # Prepare the response
        output = []
        for user in users_query.items:
            sports_list = [sport.name for sport in user.sports]
            user_data = {
                "id": user.id,
                "username": user.username,
                "gender": user.gender,
                "sports": sports_list,
                "city": user.city,
                "isMember": user.id in team_members if team_id else False,
                "isInvited": user.id in team_invites if team_id else False
            }
            output.append(user_data)

        # Pagination metadata
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
