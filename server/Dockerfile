FROM python:3.11
WORKDIR /running_app
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
EXPOSE 8000
COPY . .
CMD ["fastapi", "dev", "main.py"]