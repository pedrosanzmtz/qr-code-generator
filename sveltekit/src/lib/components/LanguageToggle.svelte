<script lang="ts">
	import { language, t } from '$lib/stores/language';
</script>

<button
	class="language-toggle"
	onclick={() => language.toggle()}
	aria-label={$t.languageToggleAria}
>
	<span class="current-lang">{$language.toUpperCase()}</span>
</button>

<style>
	.language-toggle {
		background: none;
		border: none;
		font-size: 0.9rem;
		font-weight: 600;
		cursor: pointer;
		padding: 0.5rem 0.75rem;
		border-radius: 4px;
		color: inherit;
		transition: background-color 0.2s;
	}

	.language-toggle:hover {
		background-color: rgba(0, 0, 0, 0.1);
	}

	:global(.dark-mode) .language-toggle:hover {
		background-color: rgba(255, 255, 255, 0.1);
	}

	.current-lang {
		display: inline-block;
		min-width: 2em;
		text-align: center;
	}
</style>
