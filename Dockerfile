FROM node:16.6.1-alpine3.11 as builder
RUN npm install -g @angular/cli@12.2.0
COPY src /app/src/
COPY tsconfig.json /app/
COPY tsconfig.app.json /app/
COPY package.json /app/
COPY package-lock.json /app/
COPY angular.json /app/
WORKDIR /app
RUN npm install && ng build --prod

FROM nginx:1.21.1
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist/countries /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
