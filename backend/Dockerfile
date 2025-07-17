# Use an official Python base image with 3.10
FROM python:3.10-slim

# Install system dependencies needed by mediapipe and OpenCV
RUN apt-get update && apt-get install -y \
    ffmpeg \
    libsm6 \
    libxext6 \
    libgl1-mesa-glx \
    cmake \
    git \
    && apt-get clean

# Set working directory
WORKDIR /app

# Copy your backend files to the container
COPY . /app

# Install Python dependencies (including mediapipe)
RUN pip install --upgrade pip
RUN pip install fastapi uvicorn cvzone opencv-python pyautogui \
    && pip install mediapipe

# Expose port
EXPOSE 10000

# Start your app
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "10000"]
