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
		flex: 1;
	}

	label {
		display: block;
		font-size: 0.85rem;
		color: var(--text-secondary);
		margin-bottom: 6px;
	}

	select {
		width: 100%;
		padding: 10px 12px;
		border: 2px solid var(--border-color);
		border-radius: 8px;
		font-size: 0.9rem;
		background: var(--input-bg);
		color: var(--input-text);
		cursor: pointer;
		transition:
			border-color 0.2s,
			background-color 0.3s,
			color 0.3s;
	}

	select:focus {
		outline: none;
		border-color: #0f3460;
	}

	.color-picker-container {
		margin-top: 15px;
		display: flex;
		align-items: center;
		gap: 10px;
		background: var(--picker-bg);
		padding: 10px;
		border-radius: 8px;
		border: 1px solid var(--border-color);
	}

	.color-picker-container label {
		margin-bottom: 0;
		color: var(--text-primary);
	}

	input[type='color'] {
		width: 50px;
		height: 40px;
		border: none;
		cursor: pointer;
		background: none;
	}
</style>
