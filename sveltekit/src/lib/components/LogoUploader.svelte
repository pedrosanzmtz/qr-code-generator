<script lang="ts">
	import { qrSettings } from '$lib/stores/qrSettings';
	import { t } from '$lib/stores/language';

	let fileInput: HTMLInputElement;
	let fileName = $state('');

	function handleFileChange(event: Event) {
		const target = event.target as HTMLInputElement;
		const file = target.files?.[0];

		if (file) {
			fileName = file.name;
			const reader = new FileReader();
			reader.onload = (e) => {
				const result = e.target?.result;
				if (typeof result === 'string') {
					qrSettings.setLogo(result);
				}
			};
			reader.readAsDataURL(file);
		}
	}

	function clearLogo() {
		qrSettings.clearLogo();
		fileName = '';
		if (fileInput) {
			fileInput.value = '';
		}
	}

	function triggerFileInput() {
		fileInput?.click();
	}
</script>

<div class="option-group">
	<label for="logoInput">{$t.logoLabel}</label>
	<div class="logo-controls">
		<input
			type="file"
			id="logoInput"
			accept="image/png, image/jpeg, image/svg+xml"
			bind:this={fileInput}
			onchange={handleFileChange}
			class="hidden-input"
		/>
		<button type="button" class="btn btn-file" onclick={triggerFileInput}>
			{$t.chooseFile}
		</button>
		<span class="file-name">{fileName || $t.noFileChosen}</span>
		{#if $qrSettings.logoDataUrl}
			<button class="btn btn-secondary btn-sm" onclick={clearLogo}>
				{$t.clearLogoBtn}
			</button>
		{/if}
	</div>
</div>

<style>
	.option-group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	label {
		font-weight: 500;
		font-size: 0.9rem;
	}

	.logo-controls {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.hidden-input {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}

	.btn {
		padding: 0.25rem 0.75rem;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		font-size: 0.85rem;
		transition: background-color 0.2s;
	}

	.btn-file {
		background: #e2e8f0;
		color: #4a5568;
		border: 1px solid #cbd5e0;
	}

	.btn-file:hover {
		background: #cbd5e0;
	}

	:global(.dark-mode) .btn-file {
		background: #4a5568;
		color: #e2e8f0;
		border-color: #718096;
	}

	:global(.dark-mode) .btn-file:hover {
		background: #718096;
	}

	.file-name {
		font-size: 0.85rem;
		color: #718096;
		max-width: 150px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	:global(.dark-mode) .file-name {
		color: #a0aec0;
	}

	.btn-secondary {
		background: #6c757d;
		color: white;
	}

	.btn-secondary:hover {
		background: #5a6268;
	}

	.btn-sm {
		padding: 0.25rem 0.5rem;
	}
</style>
