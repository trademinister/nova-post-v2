# Docker инструкции

## Быстрый старт

### 1. Сборка Docker образа

```bash
docker build -t nova-poshta-app .
```

### 2. Запуск с docker-compose (рекомендуется)

**Шаг 1**: Создайте файл `.env` в корне проекта:

```env
SHOPIFY_API_KEY=your_api_key
SHOPIFY_API_SECRET=your_api_secret
SHOPIFY_APP_URL=https://your-app-url.ngrok.io
SCOPES=read_orders,write_products
```

**Важно**: 
- `SHOPIFY_APP_URL` должен быть доступен извне (например, через ngrok: `ngrok http 3000`)
- Все переменные обязательны! Если какая-то переменная пустая, приложение не запустится.

**Шаг 2**: Запустите контейнеры:

```bash
docker-compose up -d
```

**Шаг 3**: Автоматически обновите `SHOPIFY_APP_URL` из Cloudflare Tunnel:

**Для Windows (PowerShell):**
```powershell
.\scripts\update-cloudflare-url.ps1
```

**Для Linux/Mac:**
```bash
chmod +x scripts/get-cloudflare-url.sh
./scripts/get-cloudflare-url.sh
```

Этот скрипт автоматически:
- Получит URL из логов Cloudflare Tunnel
- Обновит `.env` файл
- Пересоздаст контейнер `app` для применения новой переменной окружения

**Автоматический запуск (опционально):**

Вы можете запустить скрипт автоматически после `docker-compose up`:

**Windows:**
```powershell
docker-compose up -d; Start-Sleep -Seconds 10; .\scripts\update-cloudflare-url.ps1
```

**Linux/Mac:**
```bash
docker-compose up -d && sleep 10 && ./scripts/get-cloudflare-url.sh
```

**Шаг 4**: Проверьте логи:

```bash
docker-compose logs -f app
```

**Примечание**: Cloudflare Tunnel генерирует новый URL при каждом запуске. Скрипт автоматически обновит `.env` файл и перезапустит контейнер.

### 3. Запуск без docker-compose

Если у вас уже есть база данных PostgreSQL:

```bash
docker run -d \
  --name nova-poshta-app \
  -p 3000:3000 \
  -e NODE_ENV=production \
  -e DATABASE_URL=postgresql://user:password@host:5432/database \
  -e SHOPIFY_API_KEY=your_api_key \
  -e SHOPIFY_API_SECRET=your_api_secret \
  -e SCOPES=write_products,read_orders \
  -e SHOPIFY_APP_URL=https://your-app-url.ngrok.io \
  nova-poshta-app
```

## Полезные команды

### Просмотр логов

```bash
# Все сервисы
docker-compose logs -f

# Только приложение
docker-compose logs -f app

# Только база данных
docker-compose logs -f db
```

### Остановка контейнеров

```bash
docker-compose down
```

### Остановка с удалением volumes (удалит данные БД)

```bash
docker-compose down -v
```

### Пересборка образа

```bash
docker-compose build --no-cache
docker-compose up -d
```

### Выполнение команд внутри контейнера

```bash
# Зайти в контейнер
docker-compose exec app sh

# Выполнить миграции Prisma вручную
docker-compose exec app npx prisma migrate deploy

# Генерировать Prisma клиент
docker-compose exec app npx prisma generate
```

### Просмотр статуса контейнеров

```bash
docker-compose ps
```

## Структура Dockerfile

Dockerfile использует multi-stage build:

1. **Builder stage**: Устанавливает все зависимости, генерирует Prisma клиент и собирает приложение
2. **Runner stage**: Создает минимальный production образ только с необходимыми файлами

Это позволяет уменьшить размер финального образа.

## Переменные окружения

Обязательные переменные:

- `DATABASE_URL` - URL подключения к PostgreSQL
- `SHOPIFY_API_KEY` - API ключ Shopify приложения
- `SHOPIFY_API_SECRET` - API секрет Shopify приложения
- `SCOPES` - Разрешения для Shopify API
- `SHOPIFY_APP_URL` - URL вашего приложения

## Troubleshooting

### Проблема с подключением к базе данных

Убедитесь, что:
1. База данных запущена: `docker-compose ps`
2. DATABASE_URL правильный
3. Сеть между контейнерами работает: используйте имя сервиса `db` вместо `localhost`

### Проблема с Prisma миграциями

Если миграции не применяются автоматически:

```bash
docker-compose exec app npx prisma migrate deploy
```

### Проблема с портом 3000

Если порт 3000 занят, измените в `docker-compose.yml`:

```yaml
ports:
  - "3001:3000"  # Внешний:Внутренний
```

## Production deployment

Для production рекомендуется:

1. Использовать managed PostgreSQL (например, AWS RDS, Google Cloud SQL)
2. Настроить reverse proxy (nginx, Caddy)
3. Использовать secrets management (Docker secrets, Kubernetes secrets)
4. Настроить мониторинг и логирование
5. Использовать health checks для автоматического перезапуска


