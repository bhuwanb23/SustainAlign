@echo off
echo 🚀 Starting SustainAlign with Docker...

REM Check if .env file exists
if not exist .env (
    echo ❌ .env file not found. Please create one from config/env_example.txt
    echo 📝 Copy the example file:
    echo    copy config\env_example.txt .env
    echo    Then edit .env with your credentials
    pause
    exit /b 1
)

REM Check if Docker is running
docker info >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker is not running. Please start Docker Desktop
    pause
    exit /b 1
)

REM Build and start services
echo 🔨 Building and starting services...
docker-compose up --build -d

REM Wait for services to be ready
echo ⏳ Waiting for services to be ready...
timeout /t 30 /nobreak >nul

echo.
echo 🎉 SustainAlign is now running!
echo.
echo 📱 Frontend: http://localhost:3000
echo 🔧 Backend API: http://localhost:5000
echo 🤖 WatsonX Chat: http://localhost:3001/chat-lite
echo.
echo 📊 To view logs: docker-compose logs -f
echo 🛑 To stop: docker-compose down
echo.
pause