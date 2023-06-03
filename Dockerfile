FROM python:3.9-bullseye
ENV PYTHONBUFFERED True
WORKDIR ./
COPY . .
COPY requirements.txt .
RUN python3 -m venv venv
RUN . venv/bin/activate
RUN pip3 install -r requirements.txt
EXPOSE 9000
CMD exec gunicorn --bind :9000 wsgi:app

