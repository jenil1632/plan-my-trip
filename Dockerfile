FROM node:21.7-alpine

WORKDIR /app

COPY public/ /app/public
COPY ./package*.json /app
RUN npm install

COPY src /app/src

CMD ["npm", "start"]