FROM node:18 AS build-stage

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3000

ENV REACT_APP_API_URL=https://your-production-api-url.com

RUN npm run build

FROM nginx:stable-alpine AS prod-stage

COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
