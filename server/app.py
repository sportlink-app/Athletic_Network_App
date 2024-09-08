from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from config import Config
from models import db
from blueprints.user_blueprint import user_blueprint
from blueprints.home_blueprint import home_blueprint
from blueprints.password_blueprint import password_blueprint

app = Flask(__name__)
app.config.from_object(Config)

# Initialize extensions
db.init_app(app)
CORS(app)

# Register blueprints
app.register_blueprint(user_blueprint)
app.register_blueprint(home_blueprint)
app.register_blueprint(password_blueprint)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
