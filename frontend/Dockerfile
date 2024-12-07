FROM node:18.17.0-alpine3.18

ENV APP_ROOT /node

RUN apk update && \
    npm install -g pnpm && \
    mkdir -p $APP_ROOT

WORKDIR $APP_ROOT

COPY . .

EXPOSE 3000
