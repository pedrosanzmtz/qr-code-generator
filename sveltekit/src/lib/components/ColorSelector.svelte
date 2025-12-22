<script lang="ts">
	import { qrSettings, colorOptions } from '$lib/stores/qrSettings';
	import { t } from '$lib/stores/language';

	function handlePresetChange(event: Event) {
		const target = event.target as HTMLSelectElement;
		qrSettings.setColorPreset(target.value);
	}

	function handleCustomColorChange(event: Event) {
		const target = event.target as HTMLInputElement;
		qrSettings.setCustomColor(target.value);
	}
</script>

<div class="option-group">
	<label for="colorSelect">{$t.colorLabel}</label>
	<select id="colorSelect" onchange={handlePresetChange}>
		{#each colorOptions as option (option.value)}
			<option value={option.value} selected={$qrSettings.colorPreset === option.value}>
				{$t[option.labelKey]}
			</option>
		{/each}
	</select>
</div>

{#if $qrSettings.colorPreset === 'custom'}
	<div class="color-picker-container">
		<label for="customColorInput">{$t.selectColor}</label>
		<input
			type="color"
			id="customColorInput"
			value={$qrSettings.customColor}
			onchange={handleCustomColorChange}
		/>
	</div>
{/if}

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

	select {
		padding: 0.5rem;
		border: 1px solid #ddd;
		border-radius: 4px;
		font-size: 1rem;
		background: white;
		cursor: pointer;
	}

	:global(.dark-mode) select {
		background: #2d3748;
		border-color: #4a5568;
		color: #e2e8f0;
	}

	.color-picker-container {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-top: 0.5rem;
	}

	input[type='color'] {
		width: 50px;
		height: 35px;
		border: none;
		border-radius: 4px;
		cursor: pointer;
	}
</style>
