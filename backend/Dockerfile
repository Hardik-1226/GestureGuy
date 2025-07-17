# Use official Python image
FROM python:3.11-slim

# Prevent Python from writing .pyc files and buffer issues
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set work directory
WORKDIR /app

# Install system dependencies needed by Pillow, TensorFlow, etc.
RUN apt-get update && apt-get install -y \
    build-essential \
    libgl1-mesa-glx \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install base dependencies (without tensorflow)
COPY requirements.txt .

# Upgrade pip and install TensorFlow separately for better Docker cache
RUN pip install --upgrade pip \
    && pip install --no-cache-dir tensorflow \
    && pip install --no-cache-dir -r requirements.txt

# Copy app code
COPY . .

# Expose FastAPI port
EXPOSE 8000

# Start FastAPI app
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
