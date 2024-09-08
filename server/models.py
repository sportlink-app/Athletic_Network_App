from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Myusers(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)
    isProfileCompleted = db.Column(db.Boolean, default=False)  # Default to False
    availability = db.Column(db.Boolean, default=True)  # Default to True
    bio = db.Column(db.String(500))
    gender = db.Column(db.String(10))
    sports = db.Column(db.String(200))
    city = db.Column(db.String(100))
    tel = db.Column(db.String(15))

    def __repr__(self):
        return f'<User {self.username}>'

