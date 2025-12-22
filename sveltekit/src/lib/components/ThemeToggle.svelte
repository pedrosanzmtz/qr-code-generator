<script lang="ts">
	import { theme } from '$lib/stores/theme';
	import { t } from '$lib/stores/language';
</script>

<button class="theme-toggle" onclick={() => theme.toggle()} aria-label={$t.themeToggleAria}>
	{$theme === 'dark' ? '☀️' : '🌙'}
</button>

<style>
	.theme-toggle {
		background: none;
		border: none;
		font-size: 1.5rem;
		cursor: pointer;
		padding: 5px;
		border-radius: 50%;
		transition: transform 0.3s ease;
	}

	.theme-toggle:hover {
		transform: scale(1.1);
		background-color: rgba(0, 0, 0, 0.05);
	}

	:global(.dark-mode) .theme-toggle:hover {
		background-color: rgba(255, 255, 255, 0.1);
	}
</style>
