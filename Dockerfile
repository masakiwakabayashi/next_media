# syntax=docker/dockerfile:1
FROM node:20.18.0-bookworm-slim

WORKDIR /app

ENV NODE_ENV=development \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    PATH=/app/node_modules/.bin:$PATH

COPY package.json yarn.lock ./
RUN corepack enable && yarn install --frozen-lockfile

COPY . .

EXPOSE 3000

CMD ["yarn", "dev", "-p", "3000", "-H", "0.0.0.0"]
