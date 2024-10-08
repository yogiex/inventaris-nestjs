FROM node:18 as build
WORKDIR /usr/src/app
COPY package.json .
COPY package-lock.json .
RUN npm i
COPY . .
RUN npx prisma generate
EXPOSE 4000

