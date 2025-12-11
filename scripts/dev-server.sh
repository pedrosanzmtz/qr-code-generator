#!/bin/bash

# Simple HTTP development server for local testing
# Note: PWA features limited without HTTPS. Use dev-server-https.sh for full PWA testing.

# Get local IP address (macOS)
IP=$(ifconfig | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}' | head -n 1)

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
