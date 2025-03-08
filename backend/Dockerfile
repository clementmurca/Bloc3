# Development
FROM node:21.1-alpine AS development

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

EXPOSE 5001
CMD ["npm", "start"]

# Tests
FROM node:21.1-bullseye AS test

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ENV NODE_ENV=test

CMD ["npm", "run", "test"]