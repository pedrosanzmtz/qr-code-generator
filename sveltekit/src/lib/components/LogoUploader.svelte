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
		flex: 1;
	}

	label {
		display: block;
		font-size: 0.85rem;
		color: var(--text-secondary);
		margin-bottom: 6px;
	}

	.logo-controls {
		display: flex;
		align-items: center;
		gap: 10px;
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
		padding: 6px 12px;
		border: none;
		border-radius: 6px;
		cursor: pointer;
		font-size: 0.85rem;
		font-weight: 500;
		transition:
			background-color 0.2s,
			border-color 0.2s;
	}

	.btn-file {
		border: 1px solid var(--border-color);
		background-color: var(--input-bg);
		color: var(--input-text);
	}

	.btn-file:hover {
		background-color: var(--btn-secondary-hover);
	}

	.file-name {
		font-size: 0.85rem;
		color: var(--text-secondary);
		min-width: 0;
		max-width: 150px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.btn-secondary {
		background: var(--btn-secondary-bg);
		color: var(--btn-secondary-text);
	}

	.btn-secondary:hover {
		background: var(--btn-secondary-hover);
	}

	.btn-sm {
		padding: 6px 12px;
		font-size: 0.8rem;
	}
</style>
