from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

# Association table for many-to-many relationship between Myusers and Sport
user_sports = db.Table('user_sports',
    db.Column('user_id', db.Integer, db.ForeignKey('myusers.id'), primary_key=True),
    db.Column('sport_id', db.Integer, db.ForeignKey('sports.id'), primary_key=True)
)

class NewsletterSubscriber(db.Model):
    __tablename__ = 'newsletter_subscribers'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    subscribed_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<Subscriber {self.email}>'

class Myusers(db.Model):
    __tablename__ = 'myusers'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)
    isProfileCompleted = db.Column(db.Boolean, default=False)
    tel = db.Column(db.String(15))
    availability = db.Column(db.Boolean, default=True)
    bio = db.Column(db.String(600))
    gender = db.Column(db.String(10))
    city = db.Column(db.String(100))

    # Relationships
    owned_teams = db.relationship('Team', back_populates='owner', cascade='all, delete-orphan')
    blogs = db.relationship('Blog', back_populates='author', cascade='all, delete-orphan')  
    # Remove cascade delete from the sports relationship to prevent unintended deletion
    sports = db.relationship('Sport', secondary=user_sports, backref='users')

class Sport(db.Model):
    __tablename__ = 'sports'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)

    def __repr__(self):
        return f'<Sport {self.name}>'
    
class Blog(db.Model):
    __tablename__ = 'blogs'
    id = db.Column(db.Integer, primary_key=True)
    sport_id = db.Column(db.Integer, db.ForeignKey('sports.id'), nullable=False)  # Ensure this is set properly
    title = db.Column(db.String(200), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('myusers.id'), nullable=False)

    # Relationships
    sport = db.relationship('Sport', backref='blogs', passive_deletes=True)  # Handle sport deletion properly
    author = db.relationship('Myusers', back_populates='blogs', passive_deletes=True)


# Function to insert default sports
def create_default_sports():
    default_sports = [
        'Football', 'Basketball', 'Tennis', 'Baseball', 'Swimming',
        'Volleyball', 'Cricket', 'Rugby', 'Table Tennis', 'Golf',
        'Handball', 'Hockey', 'Boxing', 'Cycling', 'Wrestling',
        'Gymnastics', 'Surf', 'Skiing', 'Surfing',
        'Snowboarding', 'Skateboarding', 'Darts', 'Fencing',
        'Bowling', 'Archery', 'Rowing', 'Kickball', 'Lacrosse',
        'Squash', 'Polo', 'BMX Racing', 'Water Polo',
    ]

    for sport_name in default_sports:
        if not Sport.query.filter_by(name=sport_name).first():  # Check if sport already exists
            sport = Sport(name=sport_name)
            db.session.add(sport)
    
    db.session.commit()

class Team(db.Model):
    __tablename__ = 'teams'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    sport_id = db.Column(db.Integer, db.ForeignKey('sports.id'), nullable=False)
    city = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(500), nullable=False)
    description = db.Column(db.String(500))
    date = db.Column(db.DateTime, nullable=False)
    members_count = db.Column(db.Integer, default=0)
    isCompleted = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    owner_id = db.Column(db.Integer, db.ForeignKey('myusers.id'), nullable=False)

    # Relationships
    sport = db.relationship('Sport', backref='teams', passive_deletes=True)
    owner = db.relationship('Myusers', back_populates='owned_teams', passive_deletes=True)
    members = db.relationship('Myusers', secondary='team_members', backref='teams')

    def __repr__(self):
        return f'<Team {self.name}>'

# Many-to-Many relationship table for team members
team_members = db.Table('team_members',
    db.Column('team_id', db.Integer, db.ForeignKey('teams.id', ondelete='CASCADE'), primary_key=True),
    db.Column('user_id', db.Integer, db.ForeignKey('myusers.id', ondelete='CASCADE'), primary_key=True)
)

class TeamInvite(db.Model):
    __tablename__ = 'team_invites'
    id = db.Column(db.Integer, primary_key=True)
    team_id = db.Column(db.Integer, db.ForeignKey('teams.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('myusers.id'), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey('myusers.id'), nullable=False)  # Ensure this is a foreign key
    status = db.Column(db.String(20), default='pending')  # 'Pending', 'Accepted', 'Rejected'
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationships
    team = db.relationship('Team', backref='invites', passive_deletes=True)
    user = db.relationship('Myusers', backref='team_invites', foreign_keys=[user_id], passive_deletes=True)
    owner = db.relationship('Myusers', backref='invited_teams', foreign_keys=[owner_id], passive_deletes=True)  # Correctly reference the owner

class JoinRequest(db.Model):
    __tablename__ = 'join_requests'
    id = db.Column(db.Integer, primary_key=True)
    team_id = db.Column(db.Integer, db.ForeignKey('teams.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('myusers.id'), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey('myusers.id'), nullable=False)  # Ensure this is a foreign key
    status = db.Column(db.String(20), default='pending')  # 'Pending', 'Accepted', 'Rejected'
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationships
    team = db.relationship('Team', backref='join_requests', passive_deletes=True)
    user = db.relationship('Myusers', backref='join_requests', foreign_keys=[user_id], passive_deletes=True)
    owner = db.relationship('Myusers', backref='requested_teams', foreign_keys=[owner_id], passive_deletes=True)  # Correctly reference the owner


class Notification(db.Model):
    __tablename__ = 'notifications'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('myusers.id'), nullable=False)
    reference_id = db.Column(db.Integer, nullable=True)  # ID of the reference entity (JoinRequest/TeamInvite/Team)
    type = db.Column(db.String(50), nullable=False)  # Type of notification
    is_visited = db.Column(db.Boolean, default=False)
    is_read = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationships
    user = db.relationship('Myusers', backref='notifications_received', passive_deletes=True)

    def __repr__(self):
        return f'<Notification {self.type} for user {self.user_id}>'

