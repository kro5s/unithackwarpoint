FROM node:18.18.2-alpine3.18
WORKDIR /app
COPY . .
RUN npm i
RUN npm i serve
RUN npm run build
CMD [ "npx", "serve", "./build" ]
