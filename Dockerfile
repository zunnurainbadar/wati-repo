FROM node:16.14-bullseye-slim
WORKDIR /home/sns/zunnurain
COPY package*.json ./
RUN npm install
RUN apt-get update

COPY . .
EXPOSE 80
CMD [ "npm", "run" , "dev"]