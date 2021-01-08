FROM node:12.20-alpine3.12

WORKDIR /usr/src/app

COPY package.json /usr/src/app/package.json/

RUN npm install

ADD . /usr/src/app

EXPOSE 3000

CMD [ "npm", "run", "start:dev" ]
