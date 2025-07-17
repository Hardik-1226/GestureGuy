from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import tensorflow as tf
import numpy as np
from PIL import Image
from io import BytesIO
import pyautogui
import time

# Load TensorFlow model
model = tf.keras.models.load_model("hand_model.h5")
class_names = ["click", "scroll up", "scroll down", "volume up", "volume down", "zoom in", "zoom out", "next slide"]

# FastAPI Setup
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, change this
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

gesture_active = False
last_action_time = 0
gesture_hold_time = 0.8

# === Routes ===

@app.post("/get-started")
def get_started():
    global gesture_active
    if gesture_active:
        return JSONResponse(content={"status": "already_running"})
    gesture_active = True
    return JSONResponse(content={"status": "started"})

@app.post("/stop-gesture")
def stop_gesture():
    global gesture_active
    gesture_active = False
    return JSONResponse(content={"status": "stopped"})

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    global last_action_time, gesture_active
    if not gesture_active:
        return JSONResponse(content={"status": "inactive"})

    current_time = time.time()
    if current_time - last_action_time < gesture_hold_time:
        return JSONResponse(content={"status": "cooldown"})

    contents = await file.read()
    image = Image.open(BytesIO(contents)).convert("RGB")
    image = image.resize((224, 224))  # Resize for model
    img_array = np.array(image) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    predictions = model.predict(img_array)
    predicted_index = np.argmax(predictions[0])
    predicted_class = class_names[predicted_index]

    # Map predicted gesture to action
    action = "none"
    if predicted_class == "click":
        pyautogui.click()
        action = "click"
    elif predicted_class == "scroll up":
        pyautogui.scroll(60)
        action = "scroll up"
    elif predicted_class == "scroll down":
        pyautogui.scroll(-60)
        action = "scroll down"
    elif predicted_class == "volume up":
        pyautogui.press("volumeup")
        action = "volume up"
    elif predicted_class == "volume down":
        pyautogui.press("volumedown")
        action = "volume down"
    elif predicted_class == "zoom in":
        pyautogui.hotkey("ctrl", "+")
        action = "zoom in"
    elif predicted_class == "zoom out":
        pyautogui.hotkey("ctrl", "-")
        action = "zoom out"
    elif predicted_class == "next slide":
        pyautogui.press("right")
        action = "next slide"

    last_action_time = current_time
    return JSONResponse(content={"status": "action", "action": action})
