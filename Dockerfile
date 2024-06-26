FROM node:18 as build

WORKDIR /app
COPY . .

ARG REACT_APP_API_URL
RUN touch .env
RUN echo "REACT_APP_API_URL=$REACT_APP_API_URL" >> .env
RUN cat .env

RUN npm i
RUN npm run build

FROM nginx:latest

COPY --from=build /app/build /app/build
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80/tcp

CMD ["/usr/sbin/nginx", "-g", "daemon off;"]
