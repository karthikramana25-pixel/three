FROM mysql:8

# MySQL root password & database
ENV MYSQL_ROOT_PASSWORD=admin123
ENV MYSQL_DATABASE=mydb

# Copy DB init script
COPY init.sql /docker-entrypoint-initdb.d/

