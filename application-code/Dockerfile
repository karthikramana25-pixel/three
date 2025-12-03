# ---------- Build Stage ----------
FROM node:18 AS builder

WORKDIR /app

# Copy package.json first
COPY package*.json ./

# Install dependencies (inside Docker, faster & cached)
RUN npm install --legacy-peer-deps

# Copy the rest of the code
COPY . .

# Build the React app
RUN npm run build

# ---------- Nginx Serve Stage ----------
FROM nginx:latest

COPY --from=builder /app/build /usr/share/nginx/html

# Optional: If you have SSL, copy certs
# COPY cert.crt /etc/nginx/certs/
# COPY cert.key /etc/nginx/certs/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

