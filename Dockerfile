FROM bbcrd/node:6.x

WORKDIR /app

COPY . /app

RUN npm install

ENTRYPOINT "/bin/bash"

