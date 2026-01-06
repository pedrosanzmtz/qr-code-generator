<script lang="ts">
	import { t } from '$lib/stores/language';
	import { qrTemplate } from '$lib/stores/qrTemplate';
	import type { TemplateType } from '$lib/stores/qrTemplate';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import LanguageToggle from '$lib/components/LanguageToggle.svelte';
	import TemplateSelector from '$lib/components/TemplateSelector.svelte';
	import URLInput from '$lib/components/URLInput.svelte';
	import WiFiForm from '$lib/components/WiFiForm.svelte';
	import VCardForm from '$lib/components/VCardForm.svelte';
	import EmailForm from '$lib/components/EmailForm.svelte';
	import SMSForm from '$lib/components/SMSForm.svelte';
	import PhoneForm from '$lib/components/PhoneForm.svelte';
	import TextForm from '$lib/components/TextForm.svelte';
	import GenerateButton from '$lib/components/GenerateButton.svelte';
	import QRDisplay from '$lib/components/QRDisplay.svelte';
	import SizeSelector from '$lib/components/SizeSelector.svelte';
	import ColorSelector from '$lib/components/ColorSelector.svelte';
	import LogoUploader from '$lib/components/LogoUploader.svelte';
	import {
		encodeWiFi,
		encodeVCard,
		encodeEmail,
		encodeSMS,
		encodePhone,
		encodeText,
		encodeURL
	} from '$lib/utils/templateEncoder';

	let url = $state('');
	let errorMessage = $state('');
	let generatedData = $state('');
	let showQR = $state(false);

	function handleGenerate() {
		try {
			errorMessage = '';
			const state = $state.snapshot($qrTemplate);

			let data = '';
			switch (state.selectedTemplate) {
				case 'url':
					data = encodeURL({ url });
					break;
				case 'wifi':
					data = encodeWiFi(state.wifi);
					break;
				case 'vcard':
					data = encodeVCard(state.vcard);
					break;
				case 'email':
					data = encodeEmail(state.email);
					break;
				case 'sms':
					data = encodeSMS(state.sms);
					break;
				case 'phone':
					data = encodePhone(state.phone);
					break;
				case 'text':
					data = encodeText(state.text);
					break;
			}

			generatedData = data;
			showQR = true;
		} catch (error) {
			errorMessage = error instanceof Error ? error.message : 'An error occurred';
			showQR = false;
		}
	}

	function handleUrlChange(newUrl: string) {
		url = newUrl;
	}

	function handleErrorClear() {
		errorMessage = '';
	}

	function handleTemplateChange(template: TemplateType) {
		qrTemplate.setTemplate(template);
		errorMessage = '';
		showQR = false;
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

	<TemplateSelector
		selectedTemplate={$qrTemplate.selectedTemplate}
		onTemplateChange={handleTemplateChange}
	/>

	{#if $qrTemplate.selectedTemplate === 'url'}
		<URLInput
			{url}
			{errorMessage}
			onUrlChange={handleUrlChange}
			onErrorClear={handleErrorClear}
			onGenerate={handleGenerate}
		/>
	{:else if $qrTemplate.selectedTemplate === 'wifi'}
		<WiFiForm data={$qrTemplate.wifi} onUpdate={qrTemplate.updateWiFi} />
	{:else if $qrTemplate.selectedTemplate === 'vcard'}
		<VCardForm data={$qrTemplate.vcard} onUpdate={qrTemplate.updateVCard} />
	{:else if $qrTemplate.selectedTemplate === 'email'}
		<EmailForm data={$qrTemplate.email} onUpdate={qrTemplate.updateEmail} />
	{:else if $qrTemplate.selectedTemplate === 'sms'}
		<SMSForm data={$qrTemplate.sms} onUpdate={qrTemplate.updateSMS} />
	{:else if $qrTemplate.selectedTemplate === 'phone'}
		<PhoneForm data={$qrTemplate.phone} onUpdate={qrTemplate.updatePhone} />
	{:else if $qrTemplate.selectedTemplate === 'text'}
		<TextForm data={$qrTemplate.text} onUpdate={qrTemplate.updateText} />
	{/if}

	{#if errorMessage}
		<p class="error-message">{errorMessage}</p>
	{/if}

	<div class="customization-section">
		<h3>{$t.customizeTitle}</h3>
		<div class="options">
			<SizeSelector />
			<ColorSelector />
			<LogoUploader />
		</div>
	</div>

	<GenerateButton onGenerate={handleGenerate} />

	<QRDisplay url={generatedData} visible={showQR} />
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

<style>
	.error-message {
		color: var(--error-color);
		font-size: 0.9rem;
		margin: 1rem 0;
		padding: 0.75rem;
		background-color: rgba(231, 76, 60, 0.1);
		border: 1px solid var(--error-color);
		border-radius: 8px;
		text-align: center;
	}
</style>
