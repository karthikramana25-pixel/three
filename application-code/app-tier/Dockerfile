FROM node:18-slim

WORKDIR /app

# Install debugging tools + PM2
RUN apt update && apt install -y mariadb-client curl iputils-ping \
    && npm install -g pm2 \
    && apt clean

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 4000

# Run in production mode with PM2 (single stable process)
CMD ["pm2-runtime", "index.js"]

