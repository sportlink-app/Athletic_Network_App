
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY')  # Secret key for session management and security
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL')  # Database URL from the environment variable
    SQLALCHEMY_TRACK_MODIFICATIONS = False  # Disable modification tracking, it's not needed
    DEBUG = os.getenv('FLASK_DEBUG', 'False').lower() in ['true', '1']  # Enables debug mode if set in .env
    TESTING = os.getenv('FLASK_TESTING', 'False').lower() in ['true', '1']  # Testing mode
    CORS_ALLOWED_ORIGINS = os.getenv('CORS_ALLOWED_ORIGINS', '*')  # For setting up CORS (optional)



# Development-specific configuration
class DevelopmentConfig(Config):
    ENV = 'development'
    DEBUG = True  # Automatically enable debugging in development

# Production-specific configuration
class ProductionConfig(Config):
    ENV = 'production'
    DEBUG = False  # Disable debugging in production

# Function to select the configuration
def get_config():
    environment = os.getenv('FLASK_ENV', 'development')  # Get environment setting from .env
    if environment == 'production':
        return ProductionConfig
    else:
        return DevelopmentConfig
