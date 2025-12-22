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
		display: flex;
		justify-content: center;
		align-items: center;
		width: 48px;
		height: 48px;
		background: var(--bg-card);
		color: var(--text-secondary);
		border-radius: 50%;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
		border: 1px solid var(--border-color);
		transition:
			transform 0.3s,
			box-shadow 0.3s,
			background-color 0.3s,
			color 0.3s;
		cursor: pointer;
		font-size: 0.85rem;
		font-weight: 700;
		letter-spacing: 0.5px;
	}

	.language-toggle:hover {
		transform: translateY(-3px);
		box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
		color: var(--text-primary);
		background-color: var(--input-bg);
	}

	.language-toggle:focus {
		outline: 2px solid var(--text-primary);
		outline-offset: 2px;
	}

	.current-lang {
		font-size: 0.85rem;
	}

	@media (max-width: 480px) {
		.language-toggle {
			width: 44px;
			height: 44px;
			font-size: 0.75rem;
		}

		.current-lang {
			font-size: 0.75rem;
		}
	}
</style>
