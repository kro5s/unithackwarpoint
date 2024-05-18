FROM node:18.18.2-alpine3.18
WORKDIR /app
COPY . .
RUN yarn
RUN yarn build
RUN yarn cache clean
RUN chmod +x ./get-dev-deps.js
RUN yarn remove $(./get-dev-deps.js)
VOLUME ./.env
EXPOSE 3200
CMD [ "yarn", "start" ]