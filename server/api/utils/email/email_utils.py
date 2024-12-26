from flask_mail import Mail, Message
from flask import current_app, render_template

mail = Mail()

def send_email(subject, recipients, template_name, **template_context):
    """
    Sends an email with a rendered HTML template.

    Args:
        subject (str): Subject of the email.
        recipients (list): List of recipient email addresses.
        template_name (str): The name of the template file to render.
        **template_context: Context variables for rendering the template.
    """
    with current_app.app_context():
        html_body = render_template(template_name, **template_context)
        msg = Message(subject, recipients=recipients)
        msg.html = html_body
        mail.send(msg)
