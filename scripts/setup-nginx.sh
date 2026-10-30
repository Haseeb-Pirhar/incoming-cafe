#!/bin/bash

# ./scripts/setup-nginx.sh invosquare.com 3000

# Check if domain name is provided
if [ -z "$1" ]; then
    echo "Please provide a domain name"
    echo "Usage: ./setup-nginx.sh domain.com [port]"
    exit 1
fi

DOMAIN=$1
PORT=${2:-8001}  # Use provided port or default to 8001

# Create Nginx configuration file
echo "Creating Nginx configuration for $DOMAIN on port $PORT..."
sudo tee /etc/nginx/sites-available/$DOMAIN > /dev/null << EOF
server {
    listen 80;
    server_name $DOMAIN;

    location / {
        proxy_pass http://localhost:$PORT;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

# Create symbolic link
echo "Creating symbolic link..."
sudo ln -sf /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-enabled/

# Test Nginx configuration
echo "Testing Nginx configuration..."
sudo nginx -t

# Reload Nginx
echo "Reloading Nginx..."
sudo systemctl reload nginx

# Install Certbot if not already installed
if ! command -v certbot &> /dev/null; then
    echo "Installing Certbot..."
    sudo apt install certbot python3-certbot-nginx -y
fi

# Setup SSL certificate
echo "Setting up SSL certificate..."
sudo certbot --nginx -d $DOMAIN -d

echo "Nginx configuration completed for $DOMAIN on port $PORT" 