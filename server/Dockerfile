# Use an official Python runtime as a parent image
FROM python:3.11-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container at /app
COPY server/requirements.txt /app/

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code into the container
COPY server/ /app/

# Expose port 5000 for the app
EXPOSE 5000

# Define environment variable
ENV FLASK_APP=app.py

# Run flask db upgrade and then start the app using Gunicorn
CMD ["sh", "-c", "flask db upgrade && gunicorn -w 4 -b 0.0.0.0:$PORT app:app"]
