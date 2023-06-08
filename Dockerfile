FROM node:19
WORKDIR ./
COPY . .
RUN npm install
RUN npm run lint
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]

