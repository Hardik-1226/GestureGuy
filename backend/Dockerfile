# Use the official Python image with TensorFlow support
FROM python:3.11-slim

# Set environment variables to prevent Python from writing .pyc files and buffering stdout/stderr
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set the working directory in the container
WORKDIR /app

# Install system dependencies required by TensorFlow
RUN apt-get update && apt-get install -y \
    build-essential \
    libgl1-mesa-glx \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements.txt file and install dependencies
COPY requirements.txt .

# Install TensorFlow first to reduce cache busting if other packages change
RUN pip install --upgrade pip \
    && pip install --no-cache-dir tensorflow \
    && pip install --no-cache-dir -r requirements.txt

# Copy the backend code into the container
COPY . .

# Expose the FastAPI port
EXPOSE 8000

# Start FastAPI using uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
