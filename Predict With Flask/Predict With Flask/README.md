## Simple Flask Server for Model Classification Model
The model used in this repository is from [here](https://colab.research.google.com/github/https-deeplearning-ai/tensorflow-1-public/blob/master/C1/W2/ungraded_labs/C1_W2_Lab_1_beyond_hello_world.ipynb#scrollTo=6EN_OaovDjK5)

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
