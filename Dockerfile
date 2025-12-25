FROM node:20-alpine

RUN apk add --no-cache openssl curl

# Устанавливаем cloudflared
RUN curl -L https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 -o /usr/local/bin/cloudflared && \
    chmod +x /usr/local/bin/cloudflared

WORKDIR /app

# Копируем package файлы
COPY package.json package-lock.json* ./

# Устанавливаем зависимости
RUN npm ci && npm cache clean --force

# Копируем весь код
COPY . .

# Генерируем Prisma клиент
RUN npx prisma generate

# Собираем приложение
RUN npm run build

EXPOSE 3000

# Запускаем приложение
CMD ["npm", "run", "docker-start"]
