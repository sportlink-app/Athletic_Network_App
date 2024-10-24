from api.app import create_app, socketio
import logging

app = create_app()

if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    logging.info("Starting server on http://localhost:5001/")
    socketio.run(app, host='0.0.0.0', port=5000, debug=True, allow_unsafe_werkzeug=True) 