FROM node:12.20-alpine3.12

WORKDIR /app

COPY ./package*.json ./

RUN npm install

ADD . /app

EXPOSE 3000

CMD [ "npm", "run","start:dev" ]