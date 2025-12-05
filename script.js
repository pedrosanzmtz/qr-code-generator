const urlInput = document.getElementById('urlInput');
const generateBtn = document.getElementById('generateBtn');
const qrContainer = document.getElementById('qrContainer');
const qrcodeDiv = document.getElementById('qrcode');
const urlDisplay = document.getElementById('urlDisplay');
const downloadPng = document.getElementById('downloadPng');
const downloadJpeg = document.getElementById('downloadJpeg');
const downloadSvg = document.getElementById('downloadSvg');
const sizeSelect = document.getElementById('sizeSelect');
const colorSelect = document.getElementById('colorSelect');
const errorMsg = document.getElementById('errorMsg');

let qrcode = null;

function isValidURL(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

function generateQRCode() {
    const url = urlInput.value.trim();

    if (!url) {
        errorMsg.textContent = 'Please enter a URL';
        errorMsg.classList.add('active');
        return;
    }

    if (!isValidURL(url)) {
        errorMsg.textContent = 'Please enter a valid URL (e.g., https://example.com)';
        errorMsg.classList.add('active');
        return;
    }

    errorMsg.classList.remove('active');

    const size = parseInt(sizeSelect.value);
    const color = colorSelect.value;

    // Clear previous QR code
    qrcodeDiv.innerHTML = '';

    // Generate new QR code
    qrcode = new QRCode(qrcodeDiv, {
        text: url,
        width: size,
        height: size,
        colorDark: color,
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
    });

    urlDisplay.textContent = url;
    qrContainer.classList.add('active');
}

function downloadAs(format) {
    const canvas = qrcodeDiv.querySelector('canvas');
    if (!canvas) return;

    const link = document.createElement('a');

    if (format === 'png') {
        link.download = 'qrcode.png';
        link.href = canvas.toDataURL('image/png');
    } else if (format === 'jpeg') {
        link.download = 'qrcode.jpg';
        link.href = canvas.toDataURL('image/jpeg', 0.9);
    } else if (format === 'svg') {
        const size = parseInt(sizeSelect.value);
        const color = colorSelect.value;
        const svg = canvasToSvg(canvas, size, color);
        const blob = new Blob([svg], { type: 'image/svg+xml' });
        link.download = 'qrcode.svg';
        link.href = URL.createObjectURL(blob);
    }

    link.click();
}

function canvasToSvg(canvas, size, color) {
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const moduleCount = Math.sqrt(data.length / 4);
    const moduleSize = size / moduleCount;

    let rects = '';
    for (let y = 0; y < moduleCount; y++) {
        for (let x = 0; x < moduleCount; x++) {
            const idx = (y * moduleCount + x) * 4;
            // Check if pixel is dark (part of QR code)
            if (data[idx] < 128) {
                rects += `<rect x="${x * moduleSize}" y="${y * moduleSize}" width="${moduleSize}" height="${moduleSize}" fill="${color}"/>`;
            }
        }
    }

    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
<rect width="100%" height="100%" fill="white"/>
${rects}
</svg>`;
}

// Event listeners
generateBtn.addEventListener('click', generateQRCode);

urlInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        generateQRCode();
    }
});

urlInput.addEventListener('input', () => {
    errorMsg.classList.remove('active');
});

downloadPng.addEventListener('click', () => downloadAs('png'));
downloadJpeg.addEventListener('click', () => downloadAs('jpeg'));
downloadSvg.addEventListener('click', () => downloadAs('svg'));

// Auto-add https:// if missing when input loses focus
urlInput.addEventListener('blur', () => {
    const value = urlInput.value.trim();
    if (value && !value.match(/^https?:\/\//i)) {
        urlInput.value = 'https://' + value;
    }
});
