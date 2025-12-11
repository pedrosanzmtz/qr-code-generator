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

# Get local IP address (macOS)
IP=$(ifconfig | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}' | head -n 1)

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
