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
</style>
