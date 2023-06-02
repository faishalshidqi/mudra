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
#file_path = "D:\Predict With Flask\Predict With Flask\model_ASL.h5" 
#model = load_model(file_path)
model_Bisindo = load_model('D:\Predict With Flask\Predict With Flask\model_Bisindo_1.h5')
model_SIBI = load_model("D:\Predict With Flask\Predict With Flask\model_sibi_new.h5")
model_American = load_model("D:\Predict With Flask\Predict With Flask\model_ASL.h5")
label_names = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

if not os.path.exists('static'):
    os.makedirs('static')

def trigger(model):
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
     
                pred = model.predict(res)
                # get top 3 predictions indices ordered by probabilty in decending order
                #top_n = 3
                #indices = np.argpartition(pred, -top_n)[-top_n:]
                #indices = np.squeeze(indices)
                #indices = np.flip(indices)
                predicted_labels = np.argmax(pred, axis=1)
                predicted_labels_str = [label_names[i] for i in predicted_labels]
                #response_list = [{'Huruf': label_names[id], 'probability': '{:.2%}'.format(pred[0][id]), 'label_id': str(id)} for id in indices[:top_n]]
                predicted_label = predicted_labels_str[0]#response_list[0]['Huruf']
                prob_percent = pred[0][predicted_labels[0]] * 100#response_list[0]['probability']

                # Menggabungkan label dan probabilitas menjadi satu string
                label_with_prob = f"{predicted_label} : {prob_percent:.2f}%"

                text_size, _ = cv.getTextSize(label_with_prob, cv.FONT_HERSHEY_SIMPLEX, 1, 2)
                text_x = (image_width - text_size[0]) // 2
                text_y = 50  # Ganti dengan posisi yang sesuai agar tidak tertutupi
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

@app.route('/predict', methods=['POST'])
def predict():
    while True:
        # Menerima input string dari pengguna
        user_input = input("Masukkan pilihan (A/B/C): ")

        # Melakukan percabangan berdasarkan input pengguna
        if user_input.upper() == "A":
            trigger(model_Bisindo)
        elif user_input.upper() == "B":
            trigger(model_SIBI)
        elif user_input.upper() == "C":
            trigger(model_American) #ganti klo udah ada ASL model .h5
        else:
            print("Input tidak valid. Silakan coba lagi.")

        # Memberikan pilihan untuk mengulangi atau menghentikan program
        repeat = input("Apakah Anda ingin mengulangi? (ya/tidak): ")
        if repeat.lower() != "ya":
            break

    print("Program dihentikan.")


if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0')