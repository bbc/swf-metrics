FROM bbcrd/node:6.x

WORKDIR /app

COPY . /app

RUN npm install --production

ENTRYPOINT "/bin/bash"

