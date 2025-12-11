# QR Code Generator

A simple, elegant QR code generator built with vanilla HTML, CSS, and JavaScript. Enter any URL and instantly create customizable QR codes with size and color options.

**Live Demo:** https://pedrosanzmtz.github.io/qr-code-generator/

## Why This Project?

Most "free" QR code generators online are actually marketing funnels designed to force you into a subscription. They often bait you with a free code but then restrict it with limitations.

| **Common Online Generators** ❌ | **This Project** ✅ |
|-------------------------------|------------------|
| **Sign-up often required** to download | **No sign-up** ever |
| **Expires** after a few days/scans | **Forever free** (Static QR) |
| **Watermarks** on the image | **No watermarks** |
| **Ads** show up when scanning | **Direct link** to your URL |
| **Data tracking** & privacy concerns | **Respects privacy** (Runs locally) |

**This project was created to bridge that gap:**
- **100% Free & Open Source**: No hidden costs, no subscriptions, no sign-ups.
- **User-Friendly**: A simple interface that anyone can use, regardless of technical skill.
- **Empowering for All**: Allows anyone to create professional QR codes independently without needing to ask a developer or write a script.

## Features

- **Instant QR Generation** - Generate QR codes from any valid URL
- **Customizable Size** - Choose from Small (128px), Medium (200px), or Large (300px)
- **Color Options** - Select from 6 color presets or choose a **Custom Color** using the picker
- **Add Your Logo** - Upload a custom logo to be centered on the QR code.
- **Multiple Formats** - Download as PNG, JPEG, or SVG
- **URL Validation** - Automatic validation with helpful error messages
- **Auto HTTPS** - Automatically adds `https://` prefix when missing
- **Keyboard Support** - Press Enter to generate
- **Version Display** - The current app version is displayed in the footer for easy reference.

## Usage

1. Open `index.html` in any modern web browser
2. Enter a URL in the input field
3. Select your preferred size and color
4. Click "Generate QR Code" or press Enter
5. Download the QR code as PNG, JPEG, or SVG

## Tech Stack

- HTML5
- CSS3 (with modern features like CSS Grid, Flexbox, and gradients)
- Vanilla JavaScript
- [qrcode.js](https://github.com/davidshimjs/qrcodejs) - QR code generation library

## No Build Required

This is a zero-dependency, static HTML application. Simply open the HTML file in a browser - no server, build tools, or installation needed.

## Local Development & Testing on iPhone

Test changes on your iPhone before deploying to GitHub Pages:

### Quick Start (Basic Testing)
```bash
./scripts/dev-server.sh
```
Then visit `http://YOUR_MAC_IP:8000` from your iPhone (replace with IP shown in terminal).

### Full PWA Testing (Recommended)
For service worker, offline mode, and PWA installation testing:

1. **Install local-web-server** (one-time):
   ```bash
   npm install -g local-web-server
   ```

2. **Start HTTPS server**:
   ```bash
   ./scripts/dev-server-https.sh
   ```

3. **On iPhone**:
   - Connect to same WiFi as your Mac
   - Visit `https://YOUR_MAC_IP:8000` (shown in terminal)
   - Accept certificate warning (Advanced → Proceed)
   - Install PWA and test all features!

### Remote Testing with Ngrok
Test from anywhere with a public HTTPS URL:

1. **Install ngrok** (one-time):
   ```bash
   brew install ngrok
   ```

2. **Start tunnel**:
   ```bash
   ./scripts/dev-server-ngrok.sh
   ```

3. **Access from any device** using the ngrok URL shown

## For AI Code Assistants

If you're an AI assistant working on this project, please read [`AI_CONTEXT.md`](AI_CONTEXT.md) for comprehensive guidelines on:
- Project structure and philosophy
- Development workflow and best practices
- Feature implementation patterns
- Testing procedures
- Common tasks and troubleshooting

This will help you understand the codebase and make changes that align with the project's goals.

## License

MIT License - feel free to use, modify, and distribute this project for any purpose.
