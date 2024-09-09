from flask import Blueprint

# Create blueprint for home
home_blueprint = Blueprint('home', __name__)

# Define the home route
@home_blueprint.route('/')
def home():
    return {"message": "Welcome to SportLink API!"}
