from flask_mail import Mail, Message
from flask import current_app, render_template_string
import os

# Initialize Flask-Mail
mail = Mail()

def configure_email(app):
    """Configure email settings using app configuration."""
    # Set email configuration directly (without using environment variables)
    mail_host = 'smtp.gmail.com'
    mail_port = 587
    mail_username = os.getenv('EMAIL_USERNAME')  # Your Gmail address
    mail_password = os.getenv('EMAIL_PASSWORD')
    mail_from = os.getenv('EMAIL_FROM')

    # Ensure all necessary values are provided
    if not all([mail_username, mail_password, mail_from]):
        current_app.logger.error("Email configuration is missing some values!")
        raise ValueError("Missing email configuration values.")

    # Configure Flask app with the email settings
    app.config['MAIL_SERVER'] = mail_host
    app.config['MAIL_PORT'] = mail_port
    app.config['MAIL_USERNAME'] = mail_username
    app.config['MAIL_PASSWORD'] = mail_password
    app.config['MAIL_USE_TLS'] = True  # TLS for Gmail
    app.config['MAIL_USE_SSL'] = False  # SSL is not needed for Gmail
    app.config['MAIL_DEFAULT_SENDER'] = mail_from

    # Initialize the Mail object with the app configuration
    mail.init_app(app)

def send_email(subject, recipients, template_name, **template_context):
    try:
        # Provide the absolute path to the template
        template_path = os.path.join(os.getcwd(), 'api/utils/email/templates', template_name)
        with open(template_path, 'r') as file:
            html_body = file.read()

        # Render the template manually
        html_body = render_template_string(html_body, **template_context)

        # Create and send the message
        msg = Message(subject, recipients=recipients, sender=current_app.config['MAIL_DEFAULT_SENDER'])
        msg.html = html_body
        mail.send(msg)
    except Exception as e:
        current_app.logger.error(f"Failed to send email. Error: {e}")
        raise