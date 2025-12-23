from fastapi import FastAPI
import tensorflow as tf
import numpy as np 
import json 
import os
from tensorflow.keras.preprocessing import image 

app = FastAPI()

model = tf.keras.models.load_model("TimeLessAi_Model.h5")
print("model loaded")


with open("class_names.json","r") as f:
    class_names = json.load(f)

print(class_names)


@app.get("/detect")
def predict():
    img_path = "test.jpg"

    img = image.load_img(img_path, target_size=(224, 224))
    img_array = image.img_to_array(img)
    img_array = img_array / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    predictions = model.predict(img_array)
    predicted_index = int(np.argmax(predictions))
    predicted_class = class_names[predicted_index]
    confidence = float(predictions[0][predicted_index] * 100)

    return {
        "monument": predicted_class,
        "confidence": round(confidence, 2)
    }

