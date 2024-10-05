from flask import Blueprint, request, jsonify
from ..models import db, NewsletterSubscriber

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

    # Create a new subscriber
    new_subscriber = NewsletterSubscriber(email=email)
    db.session.add(new_subscriber)
    db.session.commit()

    return jsonify({"message": "Successfully subscribed to the newsletter!"}), 201