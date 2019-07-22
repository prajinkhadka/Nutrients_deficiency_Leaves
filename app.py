import requests
from tensorflow.keras.preprocessing.image import img_to_array as img_to_array
from tensorflow.keras.preprocessing.image import load_img as load_img


import os
# Using Flask since Python doesn't have built-in session management
from flask import Flask, session, render_template
# Our target library
import requests
import json

app = Flask(__name__)

image = img_to_array(load_img('./images/7.jpg', target_size=(128,128))) / 255.
payload = {
  "instances": [{'input_image': image.tolist()}]
}
r = requests.post('http://localhost:9001/v1/models/LeavesModel:predict', json=payload)

output = json.loads(r.content)
print(output)

with open("outputs.txt",'w') as f:
	f.write(str(output))

