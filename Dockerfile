FROM python:3.9-bullseye
ENV PYTHONBUFFERED True
WORKDIR ./
COPY . .
COPY requirements.txt .
RUN python3 -m venv venv
RUN . venv/bin/activate
RUN pip3 install -r requirements.txt
EXPOSE 9000
CMD exec flask run --host 0.0.0.0 --port $PORT

