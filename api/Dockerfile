FROM php:8.1

RUN apt-get update -y && apt-get install -y openssl zip unzip git
RUN docker-php-ext-install mysqli pdo pdo_mysql


# copy the Composer PHAR from the Composer image into the PHP image
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Install supervisor to keep the queue worker running
RUN apt-get install -y --no-install-recommends supervisor
ADD supervisord.conf /etc/

WORKDIR /app/api
COPY . .
RUN composer install

EXPOSE 8000
