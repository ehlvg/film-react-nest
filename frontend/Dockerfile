# Сборка фронтенда (multi-stage)
FROM node:20-alpine AS builder
WORKDIR /app

ARG VITE_API_URL=/api/afisha
ARG VITE_CDN_URL=/content/afisha
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_CDN_URL=$VITE_CDN_URL

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# Финальный образ: только собранный dist, без исходников и dev-зависимостей
FROM alpine:3.20
COPY --from=builder /app/dist /build

# Точка монтирования общего volume с nginx
VOLUME /usr/share/nginx/html

# При запуске копируем собранные файлы в volume и держим контейнер живым
CMD ["sh", "-c", "cp -r /build/. /usr/share/nginx/html/ && tail -f /dev/null"]