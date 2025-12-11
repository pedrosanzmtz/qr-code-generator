#!/bin/bash

# Simple HTTP development server for local testing
# Note: PWA features limited without HTTPS. Use dev-server-https.sh for full PWA testing.

# Check if python3 is installed
if ! command -v python3 &> /dev/null; then
    echo "⚠️  python3 not found. Please install Python 3."
    exit 1
fi

# Check if port 8000 is already in use
if lsof -Pi :8000 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "⚠️  Port 8000 is already in use"
    echo "Please stop the other process or use a different port"
    exit 1
fi

# Cross-platform IP detection
if command -v ifconfig &> /dev/null; then
    # macOS/BSD
    IP=$(ifconfig | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}' | head -n 1)
elif command -v ip &> /dev/null; then
    # Linux
    IP=$(ip -4 addr show | grep -oP '(?<=inet\s)\d+(\.\d+){3}' | grep -v 127.0.0.1 | head -n 1)
else
    IP="<YOUR_IP_HERE>"
    echo "⚠️  Could not auto-detect IP address"
fi

echo "=========================================="
echo "  QR Code Generator - Dev Server (HTTP)"
echo "=========================================="
echo ""
echo "📱 Access from this Mac:"
echo "   http://localhost:8000"
echo ""
echo "📱 Access from iPhone (same WiFi):"
echo "   http://$IP:8000"
echo ""
echo "⚠️  Note: Service worker and PWA features won't work over HTTP"
echo "   Use dev-server-https.sh for full PWA testing"
echo ""
echo "Press Ctrl+C to stop"
echo "=========================================="
echo ""

# Start Python HTTP server
cd "$(dirname "$0")/.." && python3 -m http.server 8000
