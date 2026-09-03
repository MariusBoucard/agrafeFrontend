FROM node:20-slim AS build

WORKDIR /app

ARG VUE_APP_API_URL=
ENV VUE_APP_API_URL=$VUE_APP_API_URL

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
