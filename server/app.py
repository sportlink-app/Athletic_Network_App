from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from config import Config

app = Flask(__name__)
app.config.from_object(Config)

# Initialize extensions
db = SQLAlchemy(app)
CORS(app)

@app.route('/')
def home():
    return {"message": "Welcome to SportLink API!"}

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
