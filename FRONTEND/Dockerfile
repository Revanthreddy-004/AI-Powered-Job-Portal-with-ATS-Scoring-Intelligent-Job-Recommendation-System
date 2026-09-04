# BUILD STAGE
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci --no-audit --no-fund --fetch-retries=5 --fetch-retry-factor=2 --fetch-retry-mintimeout=10000 --fetch-retry-maxtimeout=120000

COPY . .

RUN npm run build

# NGINX STAGE
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]