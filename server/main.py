from fastapi import FastAPI ,Request
import tensorflow as tf
import requests
import cv2
import numpy as np 
import json 
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = tf.keras.models.load_model("TimeLessAi_Model.h5")

with open("class_names.json","r") as f:
    class_names = json.load(f)

@app.post("/detect")
async def predict(req: Request):
    body = await req.json()
    url = body.get("url")

    resp = requests.get(url)
    img_bytes = np.frombuffer(resp.content, np.uint8)
    img = cv2.imdecode(img_bytes, cv2.IMREAD_COLOR)
    img = cv2.resize(img, (224, 224))
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    img = img.astype(np.float32) / 255.0
    img = np.expand_dims(img, axis=0)
    predictions = model.predict(img)
    predicted_index = int(np.argmax(predictions))
    predicted_class = class_names[predicted_index]
    confidence = float(predictions[0][predicted_index] * 100)

    return {
        "monument": predicted_class,
        "confidence": round(confidence, 2)
    }
