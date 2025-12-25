#!/bin/sh
# Скрипт для получения URL из Cloudflare Tunnel логов

# Ждем пока Cloudflare Tunnel запустится
sleep 5

# Получаем логи cloudflare-tunnel контейнера и ищем URL
CLOUDFLARE_URL=$(docker-compose logs cloudflare-tunnel 2>&1 | grep -oE "https://[a-zA-Z0-9-]+\.trycloudflare\.com" | head -1)

if [ -n "$CLOUDFLARE_URL" ]; then
  echo "Found Cloudflare URL: $CLOUDFLARE_URL"
  echo "Updating .env file..."
  
  # Обновляем .env файл
  if [ -f .env ]; then
    sed -i.bak "s|SHOPIFY_APP_URL=.*|SHOPIFY_APP_URL=$CLOUDFLARE_URL|g" .env
    
    echo "Updated SHOPIFY_APP_URL in .env to: $CLOUDFLARE_URL"
    echo "Recreating app container to apply new environment variable..."
    docker-compose up -d --force-recreate app
  else
    echo "Warning: .env file not found"
  fi
else
  echo "Could not find Cloudflare URL. Make sure cloudflare-tunnel container is running."
fi
