FROM python:3.11-slim
ENV PYTHONBUFFERED True
WORKDIR /app
COPY . .
RUN pip3 install -r requirements.txt
EXPOSE 9000
CMD exec gunicorn --bind :$PORT wsgi:app

