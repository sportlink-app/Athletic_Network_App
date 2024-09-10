# Use a base image with Python
FROM python:3.11-slim

# Set the working directory
WORKDIR /app

# Copy the requirements file
COPY server/requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY server/ .

# Expose port 5000
EXPOSE 5000

# Run database migrations
RUN flask db upgrade

# Command to run the application
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "app:app"]
