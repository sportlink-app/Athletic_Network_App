from api.app import create_app, socketio
import logging
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

SERVER_URL = os.getenv('SERVER_URL')

app = create_app()

if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    logging.info(f"Starting server on {SERVER_URL}")
    socketio.run(app, host='0.0.0.0', port=5000, debug=True, allow_unsafe_werkzeug=True)
