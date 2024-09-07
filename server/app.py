from flask import Flask, request, jsonify
from flask_cors import CORS
from config import Config
from models import db, Myusers  # Import the database and the Myusers model
from flask_migrate import Migrate 

app = Flask(__name__)
app.config.from_object(Config)

# Initialize extensions
db.init_app(app)  # Initialize SQLAlchemy with Flask app
CORS(app)  # Enable CORS for handling cross-origin requests

migrate = Migrate(app, db)  # Initialize Flask-Migrate with the app and db

# Ensure database tables are created if they don't exist
with app.app_context():
    db.create_all()

# Home route for testing
@app.route('/')
def home():
    return {"message": "Welcome to SportLink API!v3-with_Migration"}

# Route for adding a user
@app.route('/add_user', methods=['POST'])
def add_user():
    try:
        data = request.get_json()  # Get the JSON data from the request
        new_user = Myusers(
            username=data['username'],
            email=data['email'],
            password=data['password']  # Storing plain password for now; consider hashing
        )
        db.session.add(new_user)  # Add the user to the session
        db.session.commit()  # Commit the transaction to save the user
        return jsonify({"message": f"User {new_user.username} added successfully!"}), 201
    except Exception as e:
        return jsonify({"message": str(e)}), 500

# Route to list all users (for testing purposes)
@app.route('/users', methods=['GET'])
def get_users():
    users = Myusers.query.all()  # Query all users from the database
    result = [
        {
            "id": user.id,
            "username": user.username,
            "email": user.email
        }
        for user in users
    ]
    return jsonify(result), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)

