FROM golang:1.22
WORKDIR /app
COPY go.mod .
COPY go.sum .
RUN go mod download
COPY ./src /app
RUN go build -o bin .
ENTRYPOINT ["/app/bin"]