FROM node:latest

COPY package.json /app
COPY .babelrc /app
COPY ./src /app

WORKDIR /app

RUN npm install

EXPOSE 4000

CMD npm start
