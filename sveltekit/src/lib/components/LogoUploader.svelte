<script lang="ts">
	import { qrSettings } from '$lib/stores/qrSettings';
	import { t } from '$lib/stores/language';

	let fileInput: HTMLInputElement;

	function handleFileChange(event: Event) {
		const target = event.target as HTMLInputElement;
		const file = target.files?.[0];

		if (file) {
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
		if (fileInput) {
			fileInput.value = '';
		}
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
		/>
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

	input[type='file'] {
		font-size: 0.9rem;
	}

	.btn {
		padding: 0.25rem 0.75rem;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		font-size: 0.85rem;
		transition: background-color 0.2s;
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
