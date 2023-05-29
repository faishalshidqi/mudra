FROM node:16
WORKDIR /app
COPY package*.json .
RUN npm install
RUN npm migrate up
COPY . .
EXPOSE 8080
CMD ["npm", "start"]
