FROM python:3.10-slim

# Install system-level deps
RUN apt-get update && apt-get install -y \
    ffmpeg \
    libgl1-mesa-glx \
    libglib2.0-0 \
    && apt-get clean

# Set working dir
WORKDIR /app

# Install pip deps
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy source code
COPY . .

# Run your server
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "10000"]
