FROM node:20

COPY entrypoint.sh /entrypoint.sh

WORKDIR /app

COPY package.json /app
RUN npm install

COPY . /app
CMD [ "/bin/sh", "/entrypoint.sh" ]