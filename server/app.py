from flask import Flask
#Testing CI/CD on render 
#from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from config import Config
from models import db, User  # Import the database and the User model

app = Flask(__name__)
app.config.from_object(Config)

# Initialize extensions
db.init_app(app)  # Ensure db is initialized with the app
CORS(app)

@app.route('/')
def home():
    return {"message": "Welcome to SportLink API!"}

@app.route('/add_user', methods=['POST'])
def add_user():
    data = request.get_json()
    new_user = User(username=data['username'], email=data['email'], password=data['password'])  # Include password
    db.session.add(new_user)
    db.session.commit()
    return {"message": f"User {new_user.username} added successfully!"}

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
