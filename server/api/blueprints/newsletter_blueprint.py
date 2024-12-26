from flask import Blueprint, request, jsonify
from ..models import db, NewsletterSubscriber
from ..utils.email.email_utils import send_email

newsletter_blueprint = Blueprint('newsletter_blueprint', __name__)

@newsletter_blueprint.route('/subscribe', methods=['POST'])
def subscribe_to_newsletter():
    data = request.get_json()
    email = data.get('email')

    if not email:
        return jsonify({"message": "Email is required"}), 400

    # Check if the email is already subscribed
    existing_subscriber = NewsletterSubscriber.query.filter_by(email=email).first()
    if existing_subscriber:
        return jsonify({"message": "Email is already subscribed"}), 400

    # Extract the name from the email (e.g., "john" from "john@gmail.com")
    subscriber_name = email.split('@')[0].split('.')[0].capitalize()

    # Send the welcome email with the extracted name
    try:
        send_email(
            subject="Welcome to Our Newsletter",
            recipients=[email],
            template_name='newsletter_welcome.html',
            name=subscriber_name  # Pass the extracted name to the template
        )
    except Exception as e:
        # Handle email sending failure
        return jsonify({"message": "Failed to send welcome email", "error": str(e)}), 500

    # Create a new subscriber after the email has been sent successfully
    new_subscriber = NewsletterSubscriber(email=email)
    db.session.add(new_subscriber)
    db.session.commit()

    return jsonify({"message": f"Successfully subscribed to the newsletter, welcome {subscriber_name}!"}), 201
