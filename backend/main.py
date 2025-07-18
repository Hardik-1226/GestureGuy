from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import threading
import cv2
from cvzone.HandTrackingModule import HandDetector
import pyautogui
import time

# FastAPI Setup
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Gesture Thread Control
gesture_thread = None
gesture_running = threading.Event()

# Distance Helper
def dist(p1, p2):
    return ((p1[0] - p2[0])**2 + (p1[1] - p2[1])**2)**0.5

# Gesture Control Function
def run_gesture_control():
    screen_width, screen_height = pyautogui.size()
    cap = cv2.VideoCapture(0)
    detector = HandDetector(detectionCon=0.8, maxHands=1)

    last_action_time = 0
    gesture_hold_time = 0.8  # seconds

    while gesture_running.is_set():
        success, frame = cap.read()
        if not success:
            break

        frame = cv2.flip(frame, 1)
        hands, img = detector.findHands(frame)

        current_time = time.time()
        action_text = "None"

        if hands:
            hand = hands[0]
            lmList = hand["lmList"]
            handType = hand["type"]

            # Landmark points
            index_tip = lmList[8]
            middle_tip = lmList[12]
            thumb_tip = lmList[4]
            pinky_tip = lmList[20]

            # Cursor movement (middle finger)
            cursor_x = int(middle_tip[0] / frame.shape[1] * screen_width)
            cursor_y = int(middle_tip[1] / frame.shape[0] * screen_height)
            pyautogui.moveTo(cursor_x, cursor_y, duration=0.1)

            # Click (Index tip near thumb)
            if dist(index_tip, thumb_tip) < 30 and current_time - last_action_time > gesture_hold_time:
                pyautogui.click()
                action_text = "Click"
                last_action_time = current_time

            # Scroll Up
            if thumb_tip[1] < index_tip[1] and thumb_tip[1] < pinky_tip[1] and current_time - last_action_time > gesture_hold_time:
                pyautogui.scroll(60)
                action_text = "Scroll Up"
                last_action_time = current_time

            # Scroll Down
            elif thumb_tip[1] > index_tip[1] and thumb_tip[1] > pinky_tip[1] and current_time - last_action_time > gesture_hold_time:
                pyautogui.scroll(-60)
                action_text = "Scroll Down"
                last_action_time = current_time

            # Volume Up (V sign - index and middle far apart)
            if dist(index_tip, middle_tip) > 50 and current_time - last_action_time > gesture_hold_time:
                pyautogui.press("volumeup")
                action_text = "Volume Up"
                last_action_time = current_time

            # Volume Down (fingers close together)
            elif dist(index_tip, middle_tip) < 20 and current_time - last_action_time > gesture_hold_time:
                pyautogui.press("volumedown")
                action_text = "Volume Down"
                last_action_time = current_time

            # Zoom In (thumb + pinky close)
            if dist(thumb_tip, pinky_tip) < 30 and current_time - last_action_time > gesture_hold_time:
                pyautogui.hotkey("ctrl", "+")
                action_text = "Zoom In"
                last_action_time = current_time

            # Zoom Out (thumb + middle close)
            elif dist(thumb_tip, middle_tip) < 30 and current_time - last_action_time > gesture_hold_time:
                pyautogui.hotkey("ctrl", "-")
                action_text = "Zoom Out"
                last_action_time = current_time

            # Slide Navigation
            if dist(thumb_tip, pinky_tip) > 150 and current_time - last_action_time > gesture_hold_time:
                if handType == "Right":
                    pyautogui.press("right")
                    action_text = "Next Slide"
                else:
                    pyautogui.press("left")
                    action_text = "Previous Slide"
                last_action_time = current_time

        # Display action on camera feed
        cv2.putText(img, f"Action: {action_text}", (10, 40),
                    cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
        cv2.imshow("Gesture Control", img)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()
    gesture_running.clear()

# Start Endpoint
@app.post("/get-started")
def start_gesture():
    global gesture_thread
    if gesture_running.is_set():
        return JSONResponse(content={"status": "already_running"})
    gesture_running.set()
    gesture_thread = threading.Thread(target=run_gesture_control, daemon=True)
    gesture_thread.start()
    return JSONResponse(content={"status": "started"})

# Stop Endpoint
@app.post("/stop-gesture")
def stop_gesture():
    if not gesture_running.is_set():
        return JSONResponse(content={"status": "not_running"})
    gesture_running.clear()
    return JSONResponse(content={"status": "stopped"})
