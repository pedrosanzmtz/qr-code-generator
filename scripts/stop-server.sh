#!/bin/bash

echo "Stopping all development servers..."

# Kill Python HTTP server
pkill -f "python3 -m http.server 8000" 2>/dev/null && echo "✓ Stopped Python HTTP server"

# Kill local-web-server (ws)
pkill -f "ws --https --port 8000" 2>/dev/null && echo "✓ Stopped HTTPS server"

# Kill ngrok
pkill -f "ngrok http 8000" 2>/dev/null && echo "✓ Stopped ngrok tunnel"

# Kill any process using port 8000
lsof -ti:8000 | xargs kill -9 2>/dev/null && echo "✓ Freed port 8000"

echo ""
echo "All servers stopped!"
