<script lang="ts">
	import { qrSettings, sizeOptions, type QRSize } from '$lib/stores/qrSettings';
	import { t } from '$lib/stores/language';

	function handleChange(event: Event) {
		const target = event.target as HTMLSelectElement;
		qrSettings.setSize(parseInt(target.value) as QRSize);
	}
</script>

<div class="option-group">
	<label for="sizeSelect">{$t.sizeLabel}</label>
	<select id="sizeSelect" onchange={handleChange}>
		{#each sizeOptions as option (option.value)}
			<option value={option.value} selected={$qrSettings.size === option.value}>
				{$t[option.labelKey]}
			</option>
		{/each}
	</select>
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
</style>
