# ---------- Stage 1: Build React ----------
FROM node:16 AS builder

WORKDIR /app

# Copy package.json
COPY package.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# React-Scripts fix
RUN npm install ajv@6 ajv-keywords@3 --legacy-peer-deps

# Copy all frontend source code
COPY . .

# Build React app
RUN npm run build



# ---------- Stage 2: Nginx ----------
FROM nginx:latest

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built frontend
COPY --from=builder /app/build /usr/share/nginx/html/

# Copy SSL certificates
COPY ssl/ /etc/nginx/ssl/

EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]

