from app import db, app

with app.app_context():
    try:
        db.create_all()  # Create all tables
        print("Database tables created successfully.")
    except Exception as e:
        print(f"Error: {e}")

