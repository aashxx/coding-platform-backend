FROM gcc:latest
WORKDIR /usr/src/app
COPY . .
CMD ["./executor"]
