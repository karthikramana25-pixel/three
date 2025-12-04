# ---------- Stage 1: Build React ----------
FROM node:16 AS builder

WORKDIR /app

# Copy only package files (NPM install cached)
COPY package*.json ./

# Install deps
RUN npm install --legacy-peer-deps

# Fix for react-scripts ajv bug
RUN npm install ajv@6 ajv-keywords@3 --legacy-peer-deps

# Copy the entire project
COPY . .

# Build React app
RUN npm run build


# ---------- Stage 2: Nginx ----------
FROM nginx:latest

# Copy custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Create proxy_params file
RUN printf "proxy_set_header Host \$host;\n\
proxy_set_header X-Real-IP \$remote_addr;\n\
proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;\n\
proxy_set_header X-Forwarded-Proto \$scheme;\n\
proxy_http_version 1.1;\n\
proxy_set_header Connection \"\";\n" > /etc/nginx/proxy_params

# Copy build output
COPY --from=builder /app/build /usr/share/nginx/html/

# Copy SSL certificates
COPY ssl/ /etc/nginx/ssl/

EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]

