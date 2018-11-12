FROM node:6.10
ENV NODE_ENV production
WORKDIR /todo
COPY . .
RUN npm install --silent

EXPOSE 3000

CMD ["/usr/local/bin/node", "/todo/index.js"]
