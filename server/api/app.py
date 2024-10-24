from flask import Flask, jsonify
from flask_migrate import Migrate
from flask_cors import CORS
from .config import Config
from .models import db, create_default_sports
from .blueprints.home_blueprint import home_blueprint
from .blueprints.newsletter_blueprint import newsletter_blueprint
from .blueprints.user_blueprint import user_blueprint
from .blueprints.sports_blueprint import sports_blueprint
from .blueprints.blog_blueprint import blog_blueprint
from .blueprints.team_blueprint import team_blueprint
from .blueprints.notification_blueprint import notification_blueprint, register_socketio_events
from .utils.socketio import socketio  

migrate = Migrate()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    migrate.init_app(app, db)

    socketio.init_app(app)

    CORS(app, origins=["http://localhost:5173"], supports_credentials=True)

    # Register blueprints
    app.register_blueprint(home_blueprint)
    app.register_blueprint(newsletter_blueprint)
    app.register_blueprint(user_blueprint)
    app.register_blueprint(sports_blueprint)
    app.register_blueprint(blog_blueprint)
    app.register_blueprint(team_blueprint)
    app.register_blueprint(notification_blueprint)

    # Register socketio event handlers
    register_socketio_events(socketio)

    @app.before_first_request
    def create_tables_and_insert_data():
        db.create_all()  # Create tables
        create_default_sports()

    @app.errorhandler(404)
    def not_found_error(error):
        return jsonify({"message": "Resource not found!"}), 404

    @app.errorhandler(500)
    def internal_error(error):
        return jsonify({"message": "Internal server error!"}), 500

    return app
