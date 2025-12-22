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
		padding: 0.5rem;
		border-radius: 50%;
		transition: background-color 0.2s;
	}

	.theme-toggle:hover {
		background-color: rgba(0, 0, 0, 0.1);
	}

	:global(.dark-mode) .theme-toggle:hover {
		background-color: rgba(255, 255, 255, 0.1);
	}
</style>
