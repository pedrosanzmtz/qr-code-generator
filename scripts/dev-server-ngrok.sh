#!/bin/bash

# Ngrok tunnel for remote testing with real HTTPS
# Requires: brew install ngrok

# Check if ngrok is installed
if ! command -v ngrok &> /dev/null; then
    echo "⚠️  ngrok not found"
    echo ""
    echo "Install with Homebrew:"
    echo "  brew install ngrok"
    echo ""
    echo "Or download from:"
    echo "  https://ngrok.com/download"
    exit 1
fi

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

echo "=========================================="
echo "  QR Code Generator - Ngrok Tunnel"
echo "=========================================="
echo ""
echo "Starting local server on port 8000..."

# Start Python server in background
cd "$(dirname "$0")/.." && python3 -m http.server 8000 > /dev/null 2>&1 &
SERVER_PID=$!

# Give server time to start
sleep 2

echo "✅ Local server started"
echo ""
echo "Starting ngrok tunnel..."
echo "You'll get a public HTTPS URL to test from anywhere"
echo ""
echo "Press Ctrl+C to stop both server and tunnel"
echo "=========================================="
echo ""

# Cleanup function
cleanup() {
    echo ""
    echo "Stopping server and tunnel..."
    kill $SERVER_PID 2>/dev/null
    exit 0
}

trap cleanup EXIT INT TERM

# Start ngrok tunnel (this blocks until stopped)
ngrok http 8000
