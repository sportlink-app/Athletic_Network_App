import os
from flask import Blueprint, request, jsonify
from twilio.rest import Client
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Fetch Twilio credentials from environment variables
TWILIO_ACCOUNT_SID = os.getenv('TWILIO_ACCOUNT_SID')
TWILIO_AUTH_TOKEN = os.getenv('TWILIO_AUTH_TOKEN')
TWILIO_PHONE_NUMBER = os.getenv('TWILIO_PHONE_NUMBER')

if not TWILIO_ACCOUNT_SID or not TWILIO_AUTH_TOKEN or not TWILIO_PHONE_NUMBER:
    raise ValueError("Twilio credentials are not properly set in the environment.")

# Initialize Twilio client
client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

# Define blueprint
phone_confirmation_blueprint = Blueprint('phone_confirmation_blueprint', __name__)

# Route to send SMS confirmation code
@phone_confirmation_blueprint.route('/send-confirmation', methods=['POST'])
def send_confirmation():
    try:
        # Get the phone number and confirmation code from the request body
        data = request.get_json()
        phone_number = data.get('phone_number')
        confirmation_code = data.get('confirmation_code')

        if not phone_number or not confirmation_code:
            return jsonify({"error": "Phone number and confirmation code are required."}), 400

        # Send SMS using Twilio
        message = client.messages.create(
            body=f"Your confirmation code is: {confirmation_code}",
            from_=TWILIO_PHONE_NUMBER,
            to=phone_number
        )

        return jsonify({"message": "Confirmation code sent successfully.", "sid": message.sid}), 200

    except Exception as e:
        # Handle errors
        return jsonify({"error": str(e)}), 500
