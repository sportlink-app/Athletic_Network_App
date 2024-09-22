from api.app import create_app
import logging

app = create_app()

if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    logging.info("Starting server on http://localhost:5001/")
    app.run(host='0.0.0.0', port=5000)  # Listen on all interfaces
