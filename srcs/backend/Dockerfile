FROM node:18

WORKDIR /app

COPY api-v1 .

RUN npm install && npm run build && npx prisma generate

ENV NODE_ENV=production

CMD npm run start:prod
