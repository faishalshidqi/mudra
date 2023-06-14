## Simple Flask Server for Classification Model
The model used in this repository is from [here](https://colab.research.google.com/drive/1T_FR0YhdIb1WkwrxtV49_KB5JKXfxh91?usp=sharing)

### Install required libraries
`pip3 install -r requirements.txt`

### Run the application
You can run the app either using <br>
- `python3 wsgi.py` (for development) or using <br>
- `gunicorn --bind 0.0.0.0:5000 wsgi:app` (for production)

### Endpoints
You can access the app on
- **GET** `localhost:5000` (for checking)
- **POST** `localhost:5000/predict` (this is where the model is)
- or using the `index.html` file in browser and upload the image
