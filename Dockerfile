FROM node:16
WORKDIR ./
COPY . .
RUN npm install
EXPOSE 3000
CMD ["npm", "run", "dev"]

