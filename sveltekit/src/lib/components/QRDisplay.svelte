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
		margin-top: 30px;
		text-align: center;
	}

	.qr-container.active {
		display: block;
	}

	.qr-code {
		display: inline-block;
		padding: 20px;
		background: white;
		border-radius: 12px;
		border: 2px solid var(--qr-border);
	}

	.qr-code :global(canvas) {
		display: block;
	}

	.url-display {
		margin-top: 15px;
		padding: 10px 15px;
		background: var(--url-bg);
		border-radius: 8px;
		font-size: 0.85rem;
		color: var(--text-secondary);
		word-break: break-all;
	}

	.download-options {
		margin-top: 20px;
	}

	.download-label {
		display: block;
		text-align: center;
		margin-bottom: 10px;
		color: var(--text-secondary);
		font-size: 0.9rem;
	}

	.download-buttons {
		display: flex;
		gap: 10px;
		justify-content: center;
	}

	.btn {
		width: auto;
		padding: 10px 20px;
		border: none;
		border-radius: 10px;
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		transition:
			transform 0.2s,
			box-shadow 0.2s,
			background-color 0.3s,
			color 0.3s;
	}

	.btn-secondary {
		background: var(--btn-secondary-bg);
		color: var(--btn-secondary-text);
	}

	.btn-secondary:hover {
		background: var(--btn-secondary-hover);
	}
</style>
