<script lang="ts">
	import { t } from '$lib/stores/language';
	import { qrSettings } from '$lib/stores/qrSettings';
	import { generateQRCode } from '$lib/utils/qrGenerator';
	import { downloadQRCode, type ExportFormat } from '$lib/utils/exportFormats';

	interface Props {
		url: string;
		visible: boolean;
	}

	let { url, visible }: Props = $props();

	let qrContainer: HTMLDivElement | undefined = $state();
	let canvas: HTMLCanvasElement | null = $state(null);

	$effect(() => {
		if (url && visible && qrContainer) {
			generateQR();
		}
	});

	async function generateQR() {
		if (!qrContainer) return;

		const size = $qrSettings.size;
		const color = qrSettings.getColor($qrSettings);
		const logoDataUrl = $qrSettings.logoDataUrl;

		try {
			const newCanvas = await generateQRCode(url, {
				size,
				color,
				logoDataUrl
			});

			// Clear container and append new canvas
			qrContainer.innerHTML = '';
			qrContainer.appendChild(newCanvas);
			canvas = newCanvas;
		} catch (error) {
			console.error('Failed to generate QR code:', error);
		}
	}

	function handleDownload(format: ExportFormat) {
		if (!canvas) return;

		const size = $qrSettings.size;
		const color = qrSettings.getColor($qrSettings);
		const logoDataUrl = $qrSettings.logoDataUrl;

		downloadQRCode(canvas, format, size, color, logoDataUrl);
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
