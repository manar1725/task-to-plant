#!/bin/sh

# Health check script for the containerized app
# This script verifies that the web server is responding correctly

# Check if nginx is running
if ! pgrep nginx > /dev/null; then
    echo "ERROR: nginx process not found"
    exit 1
fi

# Check if the application is serving content
if wget --quiet --tries=1 --spider http://localhost:80; then
    echo "OK: Application is responding"
    exit 0
else
    echo "ERROR: Application is not responding"
    exit 1
fi