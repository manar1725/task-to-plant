# 🐳 Docker Deployment Guide

## Plant Productivity Garden - Docker Setup

This guide explains how to containerize and deploy the Plant Productivity Garden app using Docker.

## 📋 Prerequisites

- Docker installed on your system
- Docker Compose (optional, for easier management)

## 🚀 Quick Start

### Option 1: Using the automated script
```bash
./docker-run.sh
```

### Option 2: Manual Docker commands
```bash
# Build the image
docker build -t plant-productivity-garden:latest .

# Run the container
docker run -d \
  --name plant-productivity-garden \
  -p 3000:80 \
  --restart unless-stopped \
  plant-productivity-garden:latest
```

### Option 3: Using Docker Compose
```bash
docker-compose up -d
```

## 🌐 Access the Application

Once the container is running, open your browser and visit:
- **Local:** http://localhost:3000
- **Network:** http://YOUR_SERVER_IP:3000

## 📁 Docker Files Overview

### `Dockerfile`
- **Multi-stage build** for optimized production image
- **Builder stage**: Installs dependencies and builds the React app
- **Production stage**: Serves static files with Nginx
- **Size optimized**: Uses Alpine Linux for minimal footprint

### `nginx.conf`
- Configured for Single Page Application (SPA) routing
- Enables gzip compression
- Sets appropriate cache headers
- Includes security headers

### `.dockerignore`
- Excludes unnecessary files from Docker build context
- Reduces build time and image size

### `docker-compose.yml`
- Simplified deployment with Docker Compose
- Includes health checks
- Automatic restart policy

## 🔧 Customization

### Environment Variables
You can customize the deployment by setting environment variables:

```bash
docker run -d \
  --name plant-productivity-garden \
  -p 3000:80 \
  -e NODE_ENV=production \
  plant-productivity-garden:latest
```

### Port Configuration
To use a different port, change the mapping:
```bash
docker run -d -p 8080:80 plant-productivity-garden:latest
```

## 📊 Monitoring

### Check container status
```bash
docker ps
```

### View logs
```bash
docker logs plant-productivity-garden
```

### Health check
```bash
docker exec plant-productivity-garden wget --quiet --tries=1 --spider http://localhost:80
```

## 🛠 Maintenance

### Update the application
```bash
# Stop and remove old container
docker stop plant-productivity-garden
docker rm plant-productivity-garden

# Rebuild image with latest changes
docker build -t plant-productivity-garden:latest .

# Start new container
docker run -d --name plant-productivity-garden -p 3000:80 plant-productivity-garden:latest
```

### Clean up unused images
```bash
docker image prune -f
```

## 🚢 Publishing to Docker Registry

### Tag for registry
```bash
docker tag plant-productivity-garden:latest your-registry/plant-productivity-garden:latest
```

### Push to registry
```bash
docker push your-registry/plant-productivity-garden:latest
```

## 🌍 Production Deployment

For production deployment, consider:

1. **Use a reverse proxy** (nginx, Traefik, or cloud load balancer)
2. **Enable HTTPS** with SSL certificates
3. **Set up monitoring** and logging
4. **Configure resource limits**:
   ```bash
   docker run -d \
     --name plant-productivity-garden \
     --memory="256m" \
     --cpus="0.5" \
     -p 3000:80 \
     plant-productivity-garden:latest
   ```

## 🐛 Troubleshooting

### Container won't start
```bash
docker logs plant-productivity-garden
```

### Port already in use
```bash
# Find process using port 3000
lsof -i :3000

# Use different port
docker run -d -p 3001:80 plant-productivity-garden:latest
```

### Build issues
```bash
# Clean build cache
docker system prune -f

# Rebuild without cache
docker build --no-cache -t plant-productivity-garden:latest .
```

## 📝 Notes

- The application serves static files, no server-side processing required
- All routing is handled client-side by React Router
- The Docker image is optimized for production with Nginx serving static assets
- Health checks ensure the container is running properly

---

Happy gardening! 🌱✨