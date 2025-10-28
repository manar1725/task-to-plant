#!/bin/bash

# Build and run the Plant Productivity Garden app

echo "🌱 Building Plant Productivity Garden Docker image..."

# Build the Docker image
docker build -t plant-productivity-garden:latest .

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    echo "🚀 Starting the application..."
    
    # Stop any existing container
    docker stop plant-productivity-garden 2>/dev/null || true
    docker rm plant-productivity-garden 2>/dev/null || true
    
    # Run the container
    docker run -d \
        --name plant-productivity-garden \
        -p 3000:80 \
        --restart unless-stopped \
        plant-productivity-garden:latest
    
    echo "🎉 Plant Productivity Garden is running!"
    echo "📱 Open your browser and visit: http://localhost:3000"
else
    echo "❌ Build failed!"
    exit 1
fi