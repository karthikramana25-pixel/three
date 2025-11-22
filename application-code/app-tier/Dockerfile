FROM node:18-slim

WORKDIR /app

# Install debugging tools
RUN apt update && apt install -y mariadb-client curl iputils-ping

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 4000

CMD ["node", "index.js"]

