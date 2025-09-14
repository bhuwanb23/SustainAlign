# SustainAlign Docker Setup (Simplified)

Simple Docker configuration for running SustainAlign with frontend, backend, and IBM WatsonX Orchestrate.

## 🐳 What You Need

**Only 6 files:**
- `docker-compose.yml` - Main configuration
- `Dockerfile.frontend` - Frontend build
- `Dockerfile.backend` - Backend build  
- `Dockerfile.watson` - WatsonX build
- `docker/nginx.conf` - Nginx config
- `start-docker.bat` - Windows startup script

## 🚀 Quick Start

### 1. Setup Environment
```bash
# Copy environment template
cp config/env_example.txt .env

# Edit .env with your credentials
# Add your IBM WatsonX API keys
```

### 2. Start Everything
```bash
# Windows
start-docker.bat

# Linux/Mac
docker-compose up --build -d
```

### 3. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **WatsonX Chat**: http://localhost:3001/chat-lite

## 📋 Basic Commands

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Rebuild and start
docker-compose up --build -d
```

## 🔧 What Each Service Does

### Frontend (Port 3000)
- React + Vite + Tailwind CSS
- Built and served with Nginx
- Proxies API calls to backend

### Backend (Port 5000)
- Flask API server
- SQLite database
- AI matching and project management

### WatsonX (Port 3001)
- IBM WatsonX Orchestrate
- AI agents and tools
- Chat interface for AI interaction

## 🐛 Troubleshooting

### Services Won't Start
```bash
# Check if Docker is running
docker --version

# Check logs
docker-compose logs

# Restart everything
docker-compose down
docker-compose up --build -d
```

### Frontend Not Loading
```bash
# Check frontend logs
docker-compose logs frontend

# Rebuild frontend
docker-compose build frontend
```

### Backend API Errors
```bash
# Check backend logs
docker-compose logs backend

# Restart backend
docker-compose restart backend
```

### WatsonX Not Working
```bash
# Check WatsonX logs
docker-compose logs watson

# Restart WatsonX
docker-compose restart watson
```

## 🎯 That's It!

This simplified setup gives you everything you need to run SustainAlign with Docker. No complex configurations, just the essentials.

**Access Points:**
- Frontend: http://localhost:3000
- Backend: http://localhost:5000  
- WatsonX: http://localhost:3001/chat-lite

**To stop:** `docker-compose down`
**To restart:** `docker-compose up -d`