<script lang="ts">
	import { t } from '$lib/stores/language';
	import { qrSettings } from '$lib/stores/qrSettings';
	import { canvasToSvg, downloadCanvas, downloadSvg } from '$lib/utils/qrcode';
	import { onMount } from 'svelte';
	import type QRCodeType from 'qrcodejs';

	interface Props {
		url: string;
		visible: boolean;
	}

	let { url, visible }: Props = $props();

	let qrContainer: HTMLDivElement | undefined = $state();
	let canvas: HTMLCanvasElement | null = $state(null);
	let QRCode: typeof QRCodeType | null = null;

	onMount(async () => {
		const module = await import('qrcodejs');
		QRCode = module.default;
	});

	$effect(() => {
		if (url && visible && QRCode && qrContainer) {
			generateQR();
		}
	});

	function generateQR() {
		if (!QRCode || !qrContainer) return;

		const container = qrContainer;
		const size = $qrSettings.size;
		const color = qrSettings.getColor($qrSettings);
		const logoDataUrl = $qrSettings.logoDataUrl;

		container.innerHTML = '';

		new QRCode(container, {
			text: url,
			width: size,
			height: size,
			colorDark: color,
			colorLight: '#ffffff',
			correctLevel: QRCode.CorrectLevel.H
		});

		const observer = new MutationObserver((mutations) => {
			for (const mutation of mutations) {
				if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
					const qrImg = container.querySelector('img');
					if (qrImg) {
						qrImg.onload = () => processQRImage(qrImg, size, logoDataUrl, container);
						if (qrImg.complete) processQRImage(qrImg, size, logoDataUrl, container);
						observer.disconnect();
					}
				}
			}
		});

		observer.observe(container, { childList: true });
	}

	function processQRImage(
		qrImg: HTMLImageElement,
		size: number,
		logoDataUrl: string | null,
		container: HTMLDivElement
	) {
		const newCanvas = document.createElement('canvas');
		newCanvas.width = size;
		newCanvas.height = size;
		const ctx = newCanvas.getContext('2d');
		if (!ctx) return;

		ctx.drawImage(qrImg, 0, 0, size, size);

		if (logoDataUrl) {
			const logoImg = new Image();
			logoImg.onload = () => {
				const logoSize = size * 0.25;
				const logoX = (size - logoSize) / 2;
				const logoY = (size - logoSize) / 2;

				ctx.fillStyle = '#ffffff';
				ctx.fillRect(logoX - 5, logoY - 5, logoSize + 10, logoSize + 10);
				ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize);

				container.innerHTML = '';
				container.appendChild(newCanvas);
				canvas = newCanvas;
			};
			logoImg.src = logoDataUrl;
		} else {
			container.innerHTML = '';
			container.appendChild(newCanvas);
			canvas = newCanvas;
		}
	}

	function handleDownload(format: 'png' | 'jpeg' | 'svg') {
		if (format === 'svg') {
			if (!canvas) return;
			const size = $qrSettings.size;
			const color = qrSettings.getColor($qrSettings);
			const svgContent = canvasToSvg(canvas, size, color, $qrSettings.logoDataUrl);
			downloadSvg(svgContent);
		} else {
			if (!canvas) return;
			downloadCanvas(canvas, format);
		}
	}
</script>

{#if visible}
	<div class="qr-container active">
		<div class="qr-code" bind:this={qrContainer}></div>
		<p class="url-display">{url}</p>
		<div class="download-options">
			<span class="download-label">{$t.downloadLabel}</span>
			<div class="download-buttons">
				<button class="btn btn-secondary" onclick={() => handleDownload('png')}>
					{$t.downloadPng}
				</button>
				<button class="btn btn-secondary" onclick={() => handleDownload('jpeg')}>
					{$t.downloadJpeg}
				</button>
				<button class="btn btn-secondary" onclick={() => handleDownload('svg')}>
					{$t.downloadSvg}
				</button>
			</div>
		</div>
	</div>
{/if}

<style>
	.qr-container {
		display: none;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		padding: 1.5rem;
		background: #f8f9fa;
		border-radius: 8px;
		margin-top: 1.5rem;
	}

	.qr-container.active {
		display: flex;
	}

	:global(.dark-mode) .qr-container {
		background: #2d3748;
	}

	.qr-code {
		background: white;
		padding: 1rem;
		border-radius: 4px;
	}

	.url-display {
		font-size: 0.85rem;
		color: #666;
		word-break: break-all;
		text-align: center;
		max-width: 100%;
	}

	:global(.dark-mode) .url-display {
		color: #a0aec0;
	}

	.download-options {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.75rem;
	}

	.download-label {
		font-weight: 500;
		font-size: 0.9rem;
	}

	.download-buttons {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
		justify-content: center;
	}

	.btn {
		padding: 0.5rem 1rem;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		font-size: 0.9rem;
		transition: background-color 0.2s;
	}

	.btn-secondary {
		background: #6c757d;
		color: white;
	}

	.btn-secondary:hover {
		background: #5a6268;
	}
</style>
