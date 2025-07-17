from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import numpy as np
from PIL import Image
import tensorflow as tf
import io
import time

app = FastAPI()

# CORS middleware to allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can replace "*" with your frontend domain in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load your TensorFlow gesture model
model = tf.keras.models.load_model("model.h5")

# Map class indices to actions
class_names = {
    0: "click",
    1: "scroll up",
    2: "scroll down",
    3: "volume up",
    4: "zoom in"
}

# To avoid repeating actions too fast
last_action_time = 0
cooldown_period = 1.0  # seconds

@app.get("/")
async def root():
    return {"message": "Gesture detection backend is working!"}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    global last_action_time

    # Load image from the uploaded file
    image_data = await file.read()
    image = Image.open(io.BytesIO(image_data)).convert("RGB")

    # Preprocess image for the model
    image = image.resize((224, 224))
    image_array = np.array(image) / 255.0
    image_array = np.expand_dims(image_array, axis=0)

    # Predict using the model
    predictions = model.predict(image_array)
    predicted_class = np.argmax(predictions)

    # Check cooldown to prevent spamming
    current_time = time.time()
    if current_time - last_action_time < cooldown_period:
        return JSONResponse(content={"action": None, "message": "Cooldown active"})

    last_action_time = current_time
    action = class_names[predicted_class]

    return JSONResponse(content={"action": action, "message": "Action performed"})
