FROM python:3.9-slim
ENV PYTHONBUFFERED True
WORKDIR ./
COPY . .
COPY requirements.txt .
RUN python3 -m venv venv
RUN . venv/bin/activate
RUN apt-get update -y && apt-get install libgl1 libglib2.0-0 libsm6 libxrender1 libxext6 -y
RUN pip3 install -r requirements.txt
EXPOSE 9000
CMD exec gunicorn --bind :9000 wsgi:app

