FROM tiangolo/uvicorn-gunicorn-fastapi:python3.8
COPY ./backend /app
RUN pip3 install -r /app/requirements.txt
