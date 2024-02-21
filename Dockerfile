FROM node:20.5.1-alpine

WORKDIR /app

COPY package.json ./

RUN yarn install

COPY . .

EXPOSE 3000
RUN yarn run build

# Start the server using the production build
CMD [ "yarn", "run", "start:prod" ]

