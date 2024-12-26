from flask_mail import Mail, Message
from flask import current_app
import os

# Initialize Flask-Mail
mail = Mail()

def configure_email(app):
    """Configure email settings using app configuration."""
    # Set email configuration directly (without using environment variables)
    mail_host = 'smtp.gmail.com'
    mail_port = 587
    mail_username = 'sportlink.user@gmail.com'  # Your Gmail address
    mail_password = 'bjhk oxtj pfzx ueiz'  # Your Gmail App Password (not your regular Gmail password)
    mail_from = 'sportlink.user@gmail.com'  # Default sender email address

    # Log the email values for debugging
    print(f"MAIL_HOST: {mail_host}")
    print(f"MAIL_USERNAME: {mail_username}")
    print(f"MAIL_FROM: {mail_from}")

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
    """Send email using Flask-Mail."""
    with current_app.app_context():
        try:
            # Direct HTML content for testing (ideally use a template engine like Jinja2)
            html_body = """
            <html>
                <head>
                    <title>Welcome to Our Newsletter</title>
                </head>
                <body>
                    <h1>Welcome, {{ name }}!</h1>
                    <p>Thank you for subscribing to our newsletter. Stay tuned for updates!</p>
                </body>
            </html>
            """
            # Substitute the {{ name }} placeholder with actual value from template_context
            name = template_context.get('name', 'Subscriber')
            html_body = html_body.replace("{{ name }}", name)

            # Create the message
            msg = Message(subject, recipients=recipients, sender=current_app.config['MAIL_DEFAULT_SENDER'])
            msg.html = html_body

            # Send the email
            mail.send(msg)
        except Exception as e:
            current_app.logger.error(f"Failed to send email. Error: {e}")
            raise
