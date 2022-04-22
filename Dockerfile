FROM node:alpine

WORKDIR /user/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5500

CMD ["npm","start"]