FROM node:20.5.1-alpine

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3000
RUN npm run build

# Start the server using the production build
CMD [ "npm", "run", "start:prod" ]

