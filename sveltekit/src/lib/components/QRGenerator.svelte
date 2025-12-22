<script lang="ts">
	import { t } from '$lib/stores/language';

	interface Props {
		onGenerate: (url: string) => void;
	}

	let { onGenerate }: Props = $props();

	let url = $state('');
	let errorMessage = $state('');

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
		onGenerate(trimmedUrl);
	}

	function handleKeypress(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			handleGenerate();
		}
	}

	function handleInput() {
		errorMessage = '';
	}

	function handleBlur() {
		const trimmed = url.trim();
		if (trimmed && !trimmed.match(/^https?:\/\//i)) {
			url = 'https://' + trimmed;
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
		bind:value={url}
		oninput={handleInput}
		onkeypress={handleKeypress}
		onblur={handleBlur}
	/>
	{#if errorMessage}
		<p class="error-message active">{errorMessage}</p>
	{/if}
</div>

<button class="btn btn-primary" onclick={handleGenerate}>
	{$t.generateBtn}
</button>

<style>
	.input-group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin-bottom: 1.5rem;
	}

	label {
		font-weight: 500;
		font-size: 0.9rem;
	}

	input[type='url'] {
		padding: 0.75rem;
		border: 1px solid #ddd;
		border-radius: 4px;
		font-size: 1rem;
		width: 100%;
		box-sizing: border-box;
	}

	:global(.dark-mode) input[type='url'] {
		background: #2d3748;
		border-color: #4a5568;
		color: #e2e8f0;
	}

	input[type='url']:focus {
		outline: none;
		border-color: #667eea;
		box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
	}

	.error-message {
		color: #e53e3e;
		font-size: 0.85rem;
		margin: 0;
		display: none;
	}

	.error-message.active {
		display: block;
	}

	.btn {
		padding: 0.75rem 1.5rem;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		font-size: 1rem;
		font-weight: 500;
		transition: background-color 0.2s;
	}

	.btn-primary {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
	}

	.btn-primary:hover {
		background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
	}
</style>
