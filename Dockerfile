FROM bbcrd/node:6.x

USER app
WORKDIR /app

COPY . /app

RUN npm install --production

ENTRYPOINT ["/app/bin/swf-metrics"]

