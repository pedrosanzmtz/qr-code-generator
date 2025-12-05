const urlInput = document.getElementById('urlInput');
const generateBtn = document.getElementById('generateBtn');
const qrContainer = document.getElementById('qrContainer');
const qrcodeDiv = document.getElementById('qrcode');
const urlDisplay = document.getElementById('urlDisplay');
const downloadBtn = document.getElementById('downloadBtn');
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

function downloadQRCode() {
    const canvas = qrcodeDiv.querySelector('canvas');
    if (canvas) {
        const link = document.createElement('a');
        link.download = 'qrcode.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    }
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

downloadBtn.addEventListener('click', downloadQRCode);

// Auto-add https:// if missing when input loses focus
urlInput.addEventListener('blur', () => {
    const value = urlInput.value.trim();
    if (value && !value.match(/^https?:\/\//i)) {
        urlInput.value = 'https://' + value;
    }
});
