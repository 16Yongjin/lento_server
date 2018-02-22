FROM mhart/alpine-node:latest

RUN mkdir -p /usr/src/lento
WORKDIR /usr/src/lento
COPY package.json /usr/src/lento/
RUN npm install
COPY . /usr/src/lento
EXPOSE 3000
CMD [ “npm”, “start” ]