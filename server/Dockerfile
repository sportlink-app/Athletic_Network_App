
# Dockerfile for Flask
FROM python:3.9

# Set environment variables
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Copy requirements file and install dependencies
COPY requirements.txt ./
RUN pip install --no-cache-dir --default-timeout=200 -r requirements.txt

# Copy the rest of your application code
COPY . .

# Command to run your Flask app
CMD ["python", "run.py"]

# Expose the port the app runs on
EXPOSE 5000
