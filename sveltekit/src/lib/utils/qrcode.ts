export function canvasToSvg(
	canvas: HTMLCanvasElement,
	size: number,
	color: string,
	logoDataUrl: string | null
): string {
	const ctx = canvas.getContext('2d');
	if (!ctx) return '';

	const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
	const data = imageData.data;
	const moduleCount = canvas.width;
	const moduleSize = size / moduleCount;

	let rects = '';
	for (let y = 0; y < moduleCount; y++) {
		for (let x = 0; x < moduleCount; x++) {
			const idx = (y * moduleCount + x) * 4;
			if (data[idx] < 128) {
				rects += `<rect x="${x * moduleSize}" y="${y * moduleSize}" width="${moduleSize}" height="${moduleSize}" fill="${color}"/>`;
			}
		}
	}

	let logoSvg = '';
	if (logoDataUrl) {
		const logoSize = size * 0.25;
		const logoX = (size - logoSize) / 2;
		const logoY = (size - logoSize) / 2;
		logoSvg += `<rect x="${logoX - 5}" y="${logoY - 5}" width="${logoSize + 10}" height="${logoSize + 10}" fill="#ffffff"/>`;
		logoSvg += `<image href="${logoDataUrl}" x="${logoX}" y="${logoY}" height="${logoSize}" width="${logoSize}" />`;
	}

	return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
<rect width="100%" height="100%" fill="white"/>
${rects}
${logoSvg}
</svg>`;
}

export function downloadCanvas(canvas: HTMLCanvasElement, format: 'png' | 'jpeg'): void {
	const link = document.createElement('a');

	if (format === 'png') {
		link.download = 'qrcode.png';
		link.href = canvas.toDataURL('image/png');
	} else {
		link.download = 'qrcode.jpg';
		link.href = canvas.toDataURL('image/jpeg', 0.9);
	}

	link.click();
}

export function downloadSvg(svgContent: string): void {
	const blob = new Blob([svgContent], { type: 'image/svg+xml' });
	const link = document.createElement('a');
	link.download = 'qrcode.svg';
	link.href = URL.createObjectURL(blob);
	link.click();
}
