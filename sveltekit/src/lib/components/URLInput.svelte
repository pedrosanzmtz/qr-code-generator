<script lang="ts">
	import { t } from '$lib/stores/language';

	interface Props {
		url: string;
		errorMessage: string;
		onUrlChange: (url: string) => void;
		onErrorClear: () => void;
		onGenerate: () => void;
	}

	let { url, errorMessage, onUrlChange, onErrorClear, onGenerate }: Props = $props();

	function handleKeypress(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			onGenerate();
		}
	}

	function handleInput(event: Event) {
		const target = event.target as HTMLInputElement;
		onUrlChange(target.value);
		onErrorClear();
	}

	function handleBlur() {
		const trimmed = url.trim();
		if (trimmed && !trimmed.match(/^https?:\/\//i)) {
			onUrlChange('https://' + trimmed);
		}
	}
</script>

<div class="input-group">
	<label for="urlInput">{$t.urlLabel}</label>
	<input
		type="url"
		id="urlInput"
		placeholder={$t.urlPlaceholder}
		autocomplete="off"
		value={url}
		oninput={handleInput}
		onkeypress={handleKeypress}
		onblur={handleBlur}
	/>
	{#if errorMessage}
		<p class="error-message active">{errorMessage}</p>
	{/if}
</div>

<style>
	.input-group {
		margin-bottom: 20px;
	}

	label {
		display: block;
		margin-bottom: 8px;
		color: var(--text-primary);
		font-weight: 500;
	}

	input[type='url'] {
		width: 100%;
		padding: 14px 16px;
		border: 2px solid var(--border-color);
		background-color: var(--input-bg);
		color: var(--input-text);
		border-radius: 10px;
		font-size: 1rem;
		transition:
			border-color 0.3s,
			box-shadow 0.3s,
			background-color 0.3s,
			color 0.3s;
	}

	input[type='url']:focus {
		outline: none;
		border-color: #0f3460;
		box-shadow: 0 0 0 3px rgba(15, 52, 96, 0.1);
	}

	input[type='url']::placeholder {
		color: #aaa;
	}

	.error-message {
		color: var(--error-color);
		font-size: 0.85rem;
		margin-top: 8px;
		display: none;
	}

	.error-message.active {
		display: block;
	}
</style>
