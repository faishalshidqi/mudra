FROM node:19
WORKDIR ./
COPY . .
RUN npm install
RUN npm run lint
ARG API_URL=https://api.rawg.io/api/creator-roles
ARG UPLOAD_URL=https://api.rawg.io/api/creator-roles
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]

