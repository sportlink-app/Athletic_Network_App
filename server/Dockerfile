# Dockerfile for Flask
FROM python:3.9

WORKDIR /app

# Copy requirements file and install dependencies
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of your application code
COPY . .

# Command to run your Flask app
CMD ["python", "run.py"]

EXPOSE 5000
