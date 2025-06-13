FROM node:18

WORKDIR /app

COPY api-v1 .

RUN npm install && npm run build

CMD npm run start
