<script lang="ts">
	import { t } from '$lib/stores/language';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import LanguageToggle from '$lib/components/LanguageToggle.svelte';
	import URLInput from '$lib/components/URLInput.svelte';
	import GenerateButton from '$lib/components/GenerateButton.svelte';
	import QRDisplay from '$lib/components/QRDisplay.svelte';
	import SizeSelector from '$lib/components/SizeSelector.svelte';
	import ColorSelector from '$lib/components/ColorSelector.svelte';
	import LogoUploader from '$lib/components/LogoUploader.svelte';

	let url = $state('');
	let errorMessage = $state('');
	let generatedUrl = $state('');
	let showQR = $state(false);

	function isValidURL(string: string): boolean {
		try {
			new URL(string);
			return true;
		} catch {
			return false;
		}
	}

	function handleGenerate() {
		const trimmedUrl = url.trim();

		if (!trimmedUrl) {
			errorMessage = $t.errorEmpty;
			return;
		}

		if (!isValidURL(trimmedUrl)) {
			errorMessage = $t.errorInvalid;
			return;
		}

		errorMessage = '';
		generatedUrl = trimmedUrl;
		showQR = true;
	}

	function handleUrlChange(newUrl: string) {
		url = newUrl;
	}

	function handleErrorClear() {
		errorMessage = '';
	}
</script>

<svelte:head>
	<title>{$t.title}</title>
</svelte:head>

<div class="container">
	<div class="header-controls">
		<ThemeToggle />
	</div>

	<h1>
		<img src="/icon-192.png" alt="QR Code Generator Logo" class="header-logo" />
		<span>{$t.title}</span>
	</h1>
	<p class="subtitle">{$t.subtitle}</p>

	<URLInput
		{url}
		{errorMessage}
		onUrlChange={handleUrlChange}
		onErrorClear={handleErrorClear}
		onGenerate={handleGenerate}
	/>

	<div class="customization-section">
		<h3>{$t.customizeTitle}</h3>
		<div class="options">
			<SizeSelector />
			<ColorSelector />
			<LogoUploader />
		</div>
	</div>

	<GenerateButton onGenerate={handleGenerate} />

	<QRDisplay url={generatedUrl} visible={showQR} />
</div>

<footer class="footer">
	<LanguageToggle />
	<a
		href="https://github.com/pedrosanzmtz/qr-code-generator"
		target="_blank"
		rel="noopener noreferrer"
		class="footer-link"
		aria-label={$t.githubLinkAria}
	>
		<svg width="24" height="24" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
			<path
				d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
			/>
		</svg>
	</a>
</footer>
