FROM node:14.18.0-alpine

WORKDIR /opt/app
COPY "package*.json" ./
COPY yarn.lock ./
RUN yarn
COPY . .
RUN yarn turbo run build --scope=next-my-app &&\
  yarn turbo run start --scope=next-my-app

