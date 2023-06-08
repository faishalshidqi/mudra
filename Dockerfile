FROM node:19
WORKDIR ./
COPY . .
RUN npm install
RUN npm run lint
ARG API_URL=https://capstone-api-jrs5zaombq-et.a.run.app
ARG UPLOAD_URL=https://uploads-service-jrs5zaombq-et.a.run.app
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]

