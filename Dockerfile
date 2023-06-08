FROM node:19
WORKDIR ./
COPY . .
RUN npm install
RUN npm run lint
ARG API_URL=http://localhost:8080
ARG UPLOAD_URL=http://localhost:8081
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]

