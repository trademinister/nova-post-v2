# PowerShell скрипт для автоматического обновления SHOPIFY_APP_URL из Cloudflare Tunnel

Write-Host "Waiting for Cloudflare Tunnel to start..." -ForegroundColor Yellow

# Ждем пока контейнер запустится
Start-Sleep -Seconds 5

$maxAttempts = 30
$attempt = 0
$url = $null

while ($attempt -lt $maxAttempts -and -not $url) {
    $attempt++
    Write-Host "Attempt $attempt/$maxAttempts: Checking Cloudflare Tunnel logs..." -ForegroundColor Gray
    
    # Получаем логи cloudflare-tunnel контейнера
    $logs = docker-compose logs cloudflare-tunnel 2>&1
    
    # Ищем URL в логах (формат: https://xxxxx.trycloudflare.com)
    if ($logs -match "https://([a-zA-Z0-9-]+)\.trycloudflare\.com") {
        $url = $matches[0]
        Write-Host "Found Cloudflare URL: $url" -ForegroundColor Green
        break
    }
    
    Start-Sleep -Seconds 2
}

if ($url) {
    # Обновляем .env файл
    $envFile = ".env"
    
    if (Test-Path $envFile) {
        $content = Get-Content $envFile
        $updated = $false
        
        $newContent = $content | ForEach-Object {
            if ($_ -match "^SHOPIFY_APP_URL=") {
                $updated = $true
                "SHOPIFY_APP_URL=$url"
            } else {
                $_
            }
        }
        
        # Если переменная не найдена, добавляем её
        if (-not $updated) {
            $newContent += "SHOPIFY_APP_URL=$url"
        }
        
        $newContent | Set-Content $envFile
        Write-Host "Updated SHOPIFY_APP_URL in .env to: $url" -ForegroundColor Green
        Write-Host "Recreating app container to apply new environment variable..." -ForegroundColor Yellow
        
        # Пересоздаем контейнер app для применения новой переменной окружения
        docker-compose up -d --force-recreate app
        
        Write-Host "Done! Your app should now be accessible at: $url" -ForegroundColor Green
    } else {
        Write-Host "Error: .env file not found!" -ForegroundColor Red
    }
} else {
    Write-Host "Error: Could not find Cloudflare URL after $maxAttempts attempts." -ForegroundColor Red
    Write-Host "Make sure cloudflare-tunnel container is running: docker-compose logs cloudflare-tunnel" -ForegroundColor Yellow
}

