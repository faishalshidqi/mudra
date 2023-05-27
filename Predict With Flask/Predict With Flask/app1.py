import requests
from flask import Flask, render_template, jsonify, request
from tensorflow.keras.models import load_model
import os
import cv2 as cv
import matplotlib.pyplot as plt
import matplotlib.image as mpimg
from PIL import Image
import numpy as np
import mediapipe as mp

app = Flask(__name__)
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True
model = load_model('model_SIBI.h5')
label_names = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

if not os.path.exists('static'):
    os.makedirs('static')

def extract_feature(input_image):
    mp_hands = mp.solutions.hands
    mp_drawing = mp.solutions.drawing_utils 
    image = cv.imread(input_image)
    with mp_hands.Hands(static_image_mode=True, max_num_hands=2, min_detection_confidence=0.1) as hands:
        while True:
            results = hands.process(cv.flip(cv.cvtColor(image, cv.COLOR_BGR2RGB), 1))
            image_height, image_width, _ = image.shape
            if results.multi_hand_landmarks:
                annotated_image = cv.flip(image.copy(), 1)
                for hand_landmarks in results.multi_hand_landmarks:
                    pergelangan_X = hand_landmarks.landmark[mp_hands.HandLandmark.WRIST].x * image_width
                    pergelangan_Y = hand_landmarks.landmark[mp_hands.HandLandmark.WRIST].y * image_height
                    pergelangan_Z = hand_landmarks.landmark[mp_hands.HandLandmark.WRIST].z
                    
                    ibujari_CmcX = hand_landmarks.landmark[mp_hands.HandLandmark.THUMB_CMC].x * image_width
                    ibujari_CmcY = hand_landmarks.landmark[mp_hands.HandLandmark.THUMB_CMC].y * image_height
                    ibujari_CmcZ = hand_landmarks.landmark[mp_hands.HandLandmark.THUMB_CMC].z
                    
                    ibujari_McpX = hand_landmarks.landmark[mp_hands.HandLandmark.THUMB_MCP].x * image_width
                    ibujari_McpY = hand_landmarks.landmark[mp_hands.HandLandmark.THUMB_MCP].y * image_height
                    ibujari_McpZ = hand_landmarks.landmark[mp_hands.HandLandmark.THUMB_MCP].z
                    
                    ibujari_IpX = hand_landmarks.landmark[mp_hands.HandLandmark.THUMB_IP].x * image_width
                    ibujari_IpY = hand_landmarks.landmark[mp_hands.HandLandmark.THUMB_IP].y * image_height
                    ibujari_IpZ = hand_landmarks.landmark[mp_hands.HandLandmark.THUMB_IP].z
                    
                    ibujari_TipX = hand_landmarks.landmark[mp_hands.HandLandmark.THUMB_TIP].x * image_width
                    ibujari_TipY = hand_landmarks.landmark[mp_hands.HandLandmark.THUMB_TIP].y * image_height
                    ibujari_TipZ = hand_landmarks.landmark[mp_hands.HandLandmark.THUMB_TIP].z

                    telunjuk_McpX = hand_landmarks.landmark[mp_hands.HandLandmark.INDEX_FINGER_MCP].x * image_width
                    telunjuk_McpY = hand_landmarks.landmark[mp_hands.HandLandmark.INDEX_FINGER_MCP].y * image_height
                    telunjuk_McpZ = hand_landmarks.landmark[mp_hands.HandLandmark.INDEX_FINGER_MCP].z
                    
                    telunjuk_PipX = hand_landmarks.landmark[mp_hands.HandLandmark.INDEX_FINGER_PIP].x * image_width
                    telunjuk_PipY = hand_landmarks.landmark[mp_hands.HandLandmark.INDEX_FINGER_PIP].y * image_height
                    telunjuk_PipZ = hand_landmarks.landmark[mp_hands.HandLandmark.INDEX_FINGER_PIP].z
                    
                    telunjuk_DipX = hand_landmarks.landmark[mp_hands.HandLandmark.INDEX_FINGER_DIP].x * image_width
                    telunjuk_DipY = hand_landmarks.landmark[mp_hands.HandLandmark.INDEX_FINGER_DIP].y * image_height
                    telunjuk_DipZ = hand_landmarks.landmark[mp_hands.HandLandmark.INDEX_FINGER_DIP].z
                    
                    telunjuk_TipX = hand_landmarks.landmark[mp_hands.HandLandmark.INDEX_FINGER_TIP].x * image_width
                    telunjuk_TipY = hand_landmarks.landmark[mp_hands.HandLandmark.INDEX_FINGER_TIP].y * image_height
                    telunjuk_TipZ = hand_landmarks.landmark[mp_hands.HandLandmark.INDEX_FINGER_TIP].z

                    tengah_McpX = hand_landmarks.landmark[mp_hands.HandLandmark.MIDDLE_FINGER_MCP].x * image_width
                    tengah_McpY = hand_landmarks.landmark[mp_hands.HandLandmark.MIDDLE_FINGER_MCP].y * image_height
                    tengah_McpZ = hand_landmarks.landmark[mp_hands.HandLandmark.MIDDLE_FINGER_MCP].z
                    
                    tengah_PipX = hand_landmarks.landmark[mp_hands.HandLandmark.MIDDLE_FINGER_PIP].x * image_width
                    tengah_PipY = hand_landmarks.landmark[mp_hands.HandLandmark.MIDDLE_FINGER_PIP].y * image_height
                    tengah_PipZ = hand_landmarks.landmark[mp_hands.HandLandmark.MIDDLE_FINGER_PIP].z
                    
                    tengah_DipX = hand_landmarks.landmark[mp_hands.HandLandmark.MIDDLE_FINGER_DIP].x * image_width
                    tengah_DipY = hand_landmarks.landmark[mp_hands.HandLandmark.MIDDLE_FINGER_DIP].y * image_height
                    tengah_DipZ = hand_landmarks.landmark[mp_hands.HandLandmark.MIDDLE_FINGER_DIP].z
                    
                    tengah_TipX = hand_landmarks.landmark[mp_hands.HandLandmark.MIDDLE_FINGER_TIP].x * image_width
                    tengah_TipY = hand_landmarks.landmark[mp_hands.HandLandmark.MIDDLE_FINGER_TIP].y * image_height
                    tengah_TipZ = hand_landmarks.landmark[mp_hands.HandLandmark.MIDDLE_FINGER_TIP].z

                    manis_McpX = hand_landmarks.landmark[mp_hands.HandLandmark.RING_FINGER_MCP].x * image_width
                    manis_McpY = hand_landmarks.landmark[mp_hands.HandLandmark.RING_FINGER_MCP].y * image_height
                    manis_McpZ = hand_landmarks.landmark[mp_hands.HandLandmark.RING_FINGER_MCP].z
                    
                    manis_PipX = hand_landmarks.landmark[mp_hands.HandLandmark.RING_FINGER_PIP].x * image_width
                    manis_PipY = hand_landmarks.landmark[mp_hands.HandLandmark.RING_FINGER_PIP].y * image_height
                    manis_PipZ = hand_landmarks.landmark[mp_hands.HandLandmark.RING_FINGER_PIP].z
                    
                    manis_DipX = hand_landmarks.landmark[mp_hands.HandLandmark.RING_FINGER_DIP].x * image_width
                    manis_DipY = hand_landmarks.landmark[mp_hands.HandLandmark.RING_FINGER_DIP].y * image_height
                    manis_DipZ = hand_landmarks.landmark[mp_hands.HandLandmark.RING_FINGER_DIP].z
                    
                    manis_TipX = hand_landmarks.landmark[mp_hands.HandLandmark.RING_FINGER_TIP].x * image_width
                    manis_TipY = hand_landmarks.landmark[mp_hands.HandLandmark.RING_FINGER_TIP].y * image_height
                    manis_TipZ = hand_landmarks.landmark[mp_hands.HandLandmark.RING_FINGER_TIP].z

                    kelingking_McpX = hand_landmarks.landmark[mp_hands.HandLandmark.PINKY_MCP].x * image_width
                    kelingking_McpY = hand_landmarks.landmark[mp_hands.HandLandmark.PINKY_MCP].y * image_height
                    kelingking_McpZ = hand_landmarks.landmark[mp_hands.HandLandmark.PINKY_MCP].z
                    
                    kelingking_PipX = hand_landmarks.landmark[mp_hands.HandLandmark.PINKY_PIP].x * image_width
                    kelingking_PipY = hand_landmarks.landmark[mp_hands.HandLandmark.PINKY_PIP].y * image_height
                    kelingking_PipZ = hand_landmarks.landmark[mp_hands.HandLandmark.PINKY_PIP].z
                    
                    kelingking_DipX = hand_landmarks.landmark[mp_hands.HandLandmark.PINKY_DIP].x * image_width
                    kelingking_DipY = hand_landmarks.landmark[mp_hands.HandLandmark.PINKY_DIP].y * image_height
                    kelingking_DipZ = hand_landmarks.landmark[mp_hands.HandLandmark.PINKY_DIP].z
                    
                    kelingking_TipX = hand_landmarks.landmark[mp_hands.HandLandmark.PINKY_TIP].x * image_width
                    kelingking_TipY = hand_landmarks.landmark[mp_hands.HandLandmark.PINKY_TIP].y * image_height
                    kelingking_TipZ = hand_landmarks.landmark[mp_hands.HandLandmark.PINKY_TIP].z

                    mp_drawing.draw_landmarks(annotated_image, hand_landmarks, mp_hands.HAND_CONNECTIONS)
                
                return (pergelangan_X, pergelangan_Y, pergelangan_Z,
                        ibujari_CmcX, ibujari_CmcY, ibujari_CmcZ,
                        ibujari_McpX, ibujari_McpY, ibujari_McpZ,
                        ibujari_IpX, ibujari_IpY, ibujari_IpZ,
                        ibujari_TipX, ibujari_TipY, ibujari_TipZ,
                        telunjuk_McpX, telunjuk_McpY, telunjuk_McpZ,
                        telunjuk_PipX, telunjuk_PipY, telunjuk_PipZ,
                        telunjuk_DipX, telunjuk_DipY, telunjuk_DipZ,
                        telunjuk_TipX, telunjuk_TipY, telunjuk_TipZ,
                        tengah_McpX, tengah_McpY, tengah_McpZ,
                        tengah_PipX, tengah_PipY, tengah_PipZ,
                        tengah_DipX, tengah_DipY, tengah_DipZ,
                        tengah_TipX, tengah_TipY, tengah_TipZ,
                        manis_McpX, manis_McpY, manis_McpZ,
                        manis_PipX, manis_PipY, manis_PipZ,
                        manis_DipX, manis_DipY, manis_DipZ,
                        manis_TipX, manis_TipY, manis_TipZ,
                        kelingking_McpX, kelingking_McpY, kelingking_McpZ,
                        kelingking_PipX, kelingking_PipY, kelingking_PipZ,
                        kelingking_DipX, kelingking_DipY, kelingking_DipZ,
                        kelingking_TipX, kelingking_TipY, kelingking_TipZ,
                        annotated_image)

            else:   
                #Pergelangan Tangan
                pergelangan_X = 0
                pergelangan_Y = 0
                pergelangan_Z = 0
                
                #Ibu Jari
                ibujari_CmcX = 0
                ibujari_CmcY = 0
                ibujari_CmcZ = 0
                
                ibujari_McpX = 0
                ibujari_McpY = 0
                ibujari_McpZ = 0
                
                ibujari_IpX = 0
                ibujari_IpY = 0
                ibujari_IpZ = 0
                
                ibujari_TipX = 0
                ibujari_TipY = 0
                ibujari_TipZ = 0

                #Jari Telunjuk
                telunjuk_McpX = 0
                telunjuk_McpY = 0
                telunjuk_McpZ = 0
                
                telunjuk_PipX = 0
                telunjuk_PipY = 0
                telunjuk_PipZ = 0
                
                telunjuk_DipX = 0
                telunjuk_DipY = 0
                telunjuk_DipZ = 0
                
                telunjuk_TipX = 0
                telunjuk_TipY = 0
                telunjuk_TipZ = 0

                #Jari Tengah
                tengah_McpX = 0
                tengah_McpY = 0
                tengah_McpZ = 0
                
                tengah_PipX = 0
                tengah_PipY = 0
                tengah_PipZ = 0
                
                tengah_DipX = 0
                tengah_DipY = 0
                tengah_DipZ = 0
                
                tengah_TipX = 0
                tengah_TipY = 0
                tengah_TipZ = 0

                #Jari Manis
                manis_McpX = 0
                manis_McpY = 0
                manis_McpZ = 0
                
                manis_PipX = 0
                manis_PipY = 0
                manis_PipZ = 0
                
                manis_DipX = 0
                manis_DipY = 0
                manis_DipZ = 0
                
                manis_TipX = 0
                manis_TipY = 0
                manis_TipZ = 0

                #Jari Kelingking
                kelingking_McpX = 0
                kelingking_McpY = 0
                kelingking_McpZ = 0
                
                kelingking_PipX = 0
                kelingking_PipY = 0
                kelingking_PipZ = 0
                
                kelingking_DipX = 0
                kelingking_DipY = 0
                kelingking_DipZ = 0
                
                kelingking_TipX = 0
                kelingking_TipY = 0
                kelingking_TipZ = 0
                
                annotated_image = 0

                annotated_image = cv.flip(image.copy(), 1)

                return (pergelangan_X, pergelangan_Y, pergelangan_Z,
                        ibujari_CmcX, ibujari_CmcY, ibujari_CmcZ,
                        ibujari_McpX, ibujari_McpY, ibujari_McpZ,
                        ibujari_IpX, ibujari_IpY, ibujari_IpZ,
                        ibujari_TipX, ibujari_TipY, ibujari_TipZ,
                        telunjuk_McpX, telunjuk_McpY, telunjuk_McpZ,
                        telunjuk_PipX, telunjuk_PipY, telunjuk_PipZ,
                        telunjuk_DipX, telunjuk_DipY, telunjuk_DipZ,
                        telunjuk_TipX, telunjuk_TipY, telunjuk_TipZ,
                        tengah_McpX, tengah_McpY, tengah_McpZ,
                        tengah_PipX, tengah_PipY, tengah_PipZ,
                        tengah_DipX, tengah_DipY, tengah_DipZ,
                        tengah_TipX, tengah_TipY, tengah_TipZ,
                        manis_McpX, manis_McpY, manis_McpZ,
                        manis_PipX, manis_PipY, manis_PipZ,
                        manis_DipX, manis_DipY, manis_DipZ,
                        manis_TipX, manis_TipY, manis_TipZ,
                        kelingking_McpX, kelingking_McpY, kelingking_McpZ,
                        kelingking_PipX, kelingking_PipY, kelingking_PipZ,
                        kelingking_DipX, kelingking_DipY, kelingking_DipZ,
                        kelingking_TipX, kelingking_TipY, kelingking_TipZ,
                        annotated_image)

@app.route('/predict', methods=['POST'])
def predict():
    cap = cv.VideoCapture(0)

    mp_hands = mp.solutions.hands
    mp_drawing = mp.solutions.drawing_utils
    with mp_hands.Hands(static_image_mode=True, max_num_hands=2, min_detection_confidence=0.1) as hands:
        while cap.isOpened():
            ret, frame = cap.read()
            
            image = cv.cvtColor(frame, cv.COLOR_BGR2RGB)
            image.flags.writeable = False
            
            results = hands.process(image)
            
            image.flags.writeable = True
            image = cv.cvtColor(image, cv.COLOR_BGR2RGB)
            image_height, image_width, _ = image.shape
            
            try:
                if results.multi_hand_landmarks:
                    for hand_landmarks in results.multi_hand_landmarks:
                        pergelangan_X = hand_landmarks.landmark[mp_hands.HandLandmark.WRIST].x * image_width
                        pergelangan_Y = hand_landmarks.landmark[mp_hands.HandLandmark.WRIST].y * image_height
                        pergelangan_Z = hand_landmarks.landmark[mp_hands.HandLandmark.WRIST].z
                        
                        ibujari_CmcX = hand_landmarks.landmark[mp_hands.HandLandmark.THUMB_CMC].x * image_width
                        ibujari_CmcY = hand_landmarks.landmark[mp_hands.HandLandmark.THUMB_CMC].y * image_height
                        ibujari_CmcZ = hand_landmarks.landmark[mp_hands.HandLandmark.THUMB_CMC].z
                        
                        ibujari_McpX = hand_landmarks.landmark[mp_hands.HandLandmark.THUMB_MCP].x * image_width
                        ibujari_McpY = hand_landmarks.landmark[mp_hands.HandLandmark.THUMB_MCP].y * image_height
                        ibujari_McpZ = hand_landmarks.landmark[mp_hands.HandLandmark.THUMB_MCP].z
                        
                        ibujari_IpX = hand_landmarks.landmark[mp_hands.HandLandmark.THUMB_IP].x * image_width
                        ibujari_IpY = hand_landmarks.landmark[mp_hands.HandLandmark.THUMB_IP].y * image_height
                        ibujari_IpZ = hand_landmarks.landmark[mp_hands.HandLandmark.THUMB_IP].z
                        
                        ibujari_TipX = hand_landmarks.landmark[mp_hands.HandLandmark.THUMB_TIP].x * image_width
                        ibujari_TipY = hand_landmarks.landmark[mp_hands.HandLandmark.THUMB_TIP].y * image_height
                        ibujari_TipZ = hand_landmarks.landmark[mp_hands.HandLandmark.THUMB_TIP].z

                        telunjuk_McpX = hand_landmarks.landmark[mp_hands.HandLandmark.INDEX_FINGER_MCP].x * image_width
                        telunjuk_McpY = hand_landmarks.landmark[mp_hands.HandLandmark.INDEX_FINGER_MCP].y * image_height
                        telunjuk_McpZ = hand_landmarks.landmark[mp_hands.HandLandmark.INDEX_FINGER_MCP].z
                        
                        telunjuk_PipX = hand_landmarks.landmark[mp_hands.HandLandmark.INDEX_FINGER_PIP].x * image_width
                        telunjuk_PipY = hand_landmarks.landmark[mp_hands.HandLandmark.INDEX_FINGER_PIP].y * image_height
                        telunjuk_PipZ = hand_landmarks.landmark[mp_hands.HandLandmark.INDEX_FINGER_PIP].z
                        
                        telunjuk_DipX = hand_landmarks.landmark[mp_hands.HandLandmark.INDEX_FINGER_DIP].x * image_width
                        telunjuk_DipY = hand_landmarks.landmark[mp_hands.HandLandmark.INDEX_FINGER_DIP].y * image_height
                        telunjuk_DipZ = hand_landmarks.landmark[mp_hands.HandLandmark.INDEX_FINGER_DIP].z
                        
                        telunjuk_TipX = hand_landmarks.landmark[mp_hands.HandLandmark.INDEX_FINGER_TIP].x * image_width
                        telunjuk_TipY = hand_landmarks.landmark[mp_hands.HandLandmark.INDEX_FINGER_TIP].y * image_height
                        telunjuk_TipZ = hand_landmarks.landmark[mp_hands.HandLandmark.INDEX_FINGER_TIP].z

                        tengah_McpX = hand_landmarks.landmark[mp_hands.HandLandmark.MIDDLE_FINGER_MCP].x * image_width
                        tengah_McpY = hand_landmarks.landmark[mp_hands.HandLandmark.MIDDLE_FINGER_MCP].y * image_height
                        tengah_McpZ = hand_landmarks.landmark[mp_hands.HandLandmark.MIDDLE_FINGER_MCP].z
                        
                        tengah_PipX = hand_landmarks.landmark[mp_hands.HandLandmark.MIDDLE_FINGER_PIP].x * image_width
                        tengah_PipY = hand_landmarks.landmark[mp_hands.HandLandmark.MIDDLE_FINGER_PIP].y * image_height
                        tengah_PipZ = hand_landmarks.landmark[mp_hands.HandLandmark.MIDDLE_FINGER_PIP].z
                        
                        tengah_DipX = hand_landmarks.landmark[mp_hands.HandLandmark.MIDDLE_FINGER_DIP].x * image_width
                        tengah_DipY = hand_landmarks.landmark[mp_hands.HandLandmark.MIDDLE_FINGER_DIP].y * image_height
                        tengah_DipZ = hand_landmarks.landmark[mp_hands.HandLandmark.MIDDLE_FINGER_DIP].z
                        
                        tengah_TipX = hand_landmarks.landmark[mp_hands.HandLandmark.MIDDLE_FINGER_TIP].x * image_width
                        tengah_TipY = hand_landmarks.landmark[mp_hands.HandLandmark.MIDDLE_FINGER_TIP].y * image_height
                        tengah_TipZ = hand_landmarks.landmark[mp_hands.HandLandmark.MIDDLE_FINGER_TIP].z

                        manis_McpX = hand_landmarks.landmark[mp_hands.HandLandmark.RING_FINGER_MCP].x * image_width
                        manis_McpY = hand_landmarks.landmark[mp_hands.HandLandmark.RING_FINGER_MCP].y * image_height
                        manis_McpZ = hand_landmarks.landmark[mp_hands.HandLandmark.RING_FINGER_MCP].z
                        
                        manis_PipX = hand_landmarks.landmark[mp_hands.HandLandmark.RING_FINGER_PIP].x * image_width
                        manis_PipY = hand_landmarks.landmark[mp_hands.HandLandmark.RING_FINGER_PIP].y * image_height
                        manis_PipZ = hand_landmarks.landmark[mp_hands.HandLandmark.RING_FINGER_PIP].z
                        
                        manis_DipX = hand_landmarks.landmark[mp_hands.HandLandmark.RING_FINGER_DIP].x * image_width
                        manis_DipY = hand_landmarks.landmark[mp_hands.HandLandmark.RING_FINGER_DIP].y * image_height
                        manis_DipZ = hand_landmarks.landmark[mp_hands.HandLandmark.RING_FINGER_DIP].z
                        
                        manis_TipX = hand_landmarks.landmark[mp_hands.HandLandmark.RING_FINGER_TIP].x * image_width
                        manis_TipY = hand_landmarks.landmark[mp_hands.HandLandmark.RING_FINGER_TIP].y * image_height
                        manis_TipZ = hand_landmarks.landmark[mp_hands.HandLandmark.RING_FINGER_TIP].z

                        kelingking_McpX = hand_landmarks.landmark[mp_hands.HandLandmark.PINKY_MCP].x * image_width
                        kelingking_McpY = hand_landmarks.landmark[mp_hands.HandLandmark.PINKY_MCP].y * image_height
                        kelingking_McpZ = hand_landmarks.landmark[mp_hands.HandLandmark.PINKY_MCP].z
                        
                        kelingking_PipX = hand_landmarks.landmark[mp_hands.HandLandmark.PINKY_PIP].x * image_width
                        kelingking_PipY = hand_landmarks.landmark[mp_hands.HandLandmark.PINKY_PIP].y * image_height
                        kelingking_PipZ = hand_landmarks.landmark[mp_hands.HandLandmark.PINKY_PIP].z
                        
                        kelingking_DipX = hand_landmarks.landmark[mp_hands.HandLandmark.PINKY_DIP].x * image_width
                        kelingking_DipY = hand_landmarks.landmark[mp_hands.HandLandmark.PINKY_DIP].y * image_height
                        kelingking_DipZ = hand_landmarks.landmark[mp_hands.HandLandmark.PINKY_DIP].z
                        
                        kelingking_TipX = hand_landmarks.landmark[mp_hands.HandLandmark.PINKY_TIP].x * image_width
                        kelingking_TipY = hand_landmarks.landmark[mp_hands.HandLandmark.PINKY_TIP].y * image_height
                        kelingking_TipZ = hand_landmarks.landmark[mp_hands.HandLandmark.PINKY_TIP].z
                        
                        res = np.array([[[pergelangan_X], [pergelangan_Y], [pergelangan_Z],
                            [ibujari_CmcX], [ibujari_CmcY], [ibujari_CmcZ],
                            [ibujari_McpX], [ibujari_McpY], [ibujari_McpZ],
                            [ibujari_IpX], [ibujari_IpY], [ibujari_IpZ],
                            [ibujari_TipX], [ibujari_TipY], [ibujari_TipZ],
                            [telunjuk_McpX], [telunjuk_McpY], [telunjuk_McpZ],
                            [telunjuk_PipX], [telunjuk_PipY], [telunjuk_PipZ],
                            [telunjuk_DipX], [telunjuk_DipY], [telunjuk_DipZ],
                            [telunjuk_TipX], [telunjuk_TipY], [telunjuk_TipZ],
                            [tengah_McpX], [tengah_McpY], [tengah_McpZ],
                            [tengah_PipX], [tengah_PipY], [tengah_PipZ],
                            [tengah_DipX], [tengah_DipY], [tengah_DipZ],
                            [tengah_TipX], [tengah_TipY], [tengah_TipZ],
                            [manis_McpX], [manis_McpY], [manis_McpZ],
                            [manis_PipX], [manis_PipY], [manis_PipZ],
                            [manis_DipX], [manis_DipY], [manis_DipZ],
                            [manis_TipX], [manis_TipY], [manis_TipZ],
                            [kelingking_McpX], [kelingking_McpY], [kelingking_McpZ],
                            [kelingking_PipX], [kelingking_PipY], [kelingking_PipZ],
                            [kelingking_DipX], [kelingking_DipY], [kelingking_DipZ],
                            [kelingking_TipX], [kelingking_TipY], [kelingking_TipZ]]])
                
                #time.sleep(2)        
                pred = model.predict(res)
                # get top 3 predictions indices ordered by probabilty in decending order
                top_n = 3
                indices = np.argpartition(pred, -top_n)[-top_n:]
                indices = np.squeeze(indices)
                indices = np.flip(indices)

                response_list = [{'Huruf': label_names[id], 'probability': str(pred[0][id]), 'label_id': str(id)} for id in indices[:top_n]]
                #print(response_list[0]['Huruf'])
                response_dict = {
                                'response': response_list,
                                }
                
                predicted_label = response_list[0]['Huruf']
                predicted_prob = response_list[0]['probability']
                label_with_prob = f"{predicted_label} ({predicted_prob})"

                text_size, _ = cv.getTextSize(label_with_prob, cv.FONT_HERSHEY_SIMPLEX, 1, 2)
                text_x = (image_width - text_size[0]) // 2
                text_y = 50  # Ganti dengan posisi yang sesuai agar tidak tertutupi
                # Display predicted label on the image
                cv.putText(image, label_with_prob, (text_x, text_y), cv.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2, cv.LINE_AA)

                # Draw landmarks on the image
                mp_drawing.draw_landmarks(image, hand_landmarks, mp_hands.HAND_CONNECTIONS)
            except:
                pass
            cv.imshow("Camera 1", image)
            if cv.waitKey(10) & 0xFF == ord('q'):
                break      
    cap.release()
    cv.destroyAllWindows()
    return jsonify(response_dict)

if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0')