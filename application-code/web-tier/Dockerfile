# ---------- Stage 1: Build React ----------
FROM node:16-alpine AS builder

WORKDIR /app

# Copy ONLY package.json (you don’t have package-lock.json)
COPY package.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Fix react-scripts ajv bug
RUN npm install ajv@6 ajv-keywords@3 --legacy-peer-deps

# Copy full project
COPY . .

# Build React app
RUN npm run build


# ---------- Stage 2: Nginx ----------
FROM nginx:stable-alpine

# Copy Nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy SSL certs
COPY ssl/ /etc/nginx/ssl/

# Copy frontend build
COPY --from=builder /app/build/ /usr/share/nginx/html/

# Create proxy_params file
RUN printf "proxy_set_header Host \$host;\n\
proxy_set_header X-Real-IP \$remote_addr;\n\
proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;\n\
proxy_set_header X-Forwarded-Proto \$scheme;\n\
proxy_http_version 1.1;\n\
proxy_set_header Connection \"\";\n" \
> /etc/nginx/proxy_params

EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]

