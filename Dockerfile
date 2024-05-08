FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn

COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD ["yarn", "start"]
