FROM node:19
WORKDIR ./
COPY . .
RUN npm install
RUN npm run lint
ARG API_URL=https://mudra-3vqqmj4ryq-et.a.run.app
ARG UPLOAD_URL=https://uploads-service-3vqqmj4ryq-et.a.run.app
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]

