#!/bin/bash

# HTTPS development server for full PWA testing
# Requires: npm install -g local-web-server

# Check if local-web-server is installed
if ! command -v ws &> /dev/null; then
    echo "⚠️  local-web-server not found"
    echo ""
    echo "Install with:"
    echo "  npm install -g local-web-server"
    echo ""
    echo "Or use Homebrew:"
    echo "  brew install node"
    echo "  npm install -g local-web-server"
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
echo "  QR Code Generator - Dev Server (HTTPS)"
echo "=========================================="
echo ""
echo "🔒 Access from this Mac:"
echo "   https://localhost:8000"
echo ""
echo "🔒 Access from iPhone (same WiFi):"
echo "   https://$IP:8000"
echo ""
echo "⚠️  First time on iPhone:"
echo "   1. Visit the URL above"
echo "   2. Click 'Advanced' or 'Details'"
echo "   3. Click 'Proceed to localhost' or 'Accept Risk'"
echo "   4. PWA features will now work!"
echo ""
echo "✅ Full PWA testing enabled:"
echo "   • Service worker"
echo "   • Install as app"
echo "   • Offline mode"
echo ""
echo "Press Ctrl+C to stop"
echo "=========================================="
echo ""

# Start HTTPS server
cd "$(dirname "$0")/.." && ws --https --port 8000
