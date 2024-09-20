from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from .config import Config
from .models import db
from .blueprints.home_blueprint import home_blueprint
from .blueprints.user_blueprint import user_blueprint
from .blueprints.sports_blueprint import sports_blueprint
from .blueprints.blog_blueprint import blog_blueprint  

migrate = Migrate()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    migrate.init_app(app, db)

    CORS(app, origins=["http://localhost:5173"])

    app.register_blueprint(user_blueprint)
    app.register_blueprint(home_blueprint)
    app.register_blueprint(sports_blueprint)
    app.register_blueprint(blog_blueprint)  

    @app.errorhandler(404)
    def not_found_error(error):
        return jsonify({"message": "Resource not found!"}), 404

    @app.errorhandler(500)
    def internal_error(error):
        return jsonify({"message": "Internal server error!"}), 500

    return app
