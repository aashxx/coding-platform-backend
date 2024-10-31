FROM python:3.9
WORKDIR /usr/src/app
COPY . .
CMD ["python3", "executor.py"]
