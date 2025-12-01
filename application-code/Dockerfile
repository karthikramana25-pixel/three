FROM node:16 AS builder

WORKDIR /app

# Copy only dependencies first
COPY web-tier/package.json ./

# Install dependencies normally
RUN npm install --legacy-peer-deps

# 🔥 Fix: Install required ajv packages manually (React-Scripts bug)
RUN npm install ajv@6 ajv-keywords@3 --legacy-peer-deps

# Copy rest of the code
COPY web-tier/ .

# Build React app
RUN npm run build


# ------------------------
# Stage 2: Nginx Runtime
# ------------------------
FROM nginx:latest

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/build/ /usr/share/nginx/html/
COPY ssl/ /etc/nginx/ssl/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

