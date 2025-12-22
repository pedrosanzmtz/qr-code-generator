<script lang="ts">
	import { t } from '$lib/stores/language';

	interface Props {
		onGenerate: () => void;
	}

	let { onGenerate }: Props = $props();
</script>

<button class="btn btn-primary" onclick={onGenerate}>
	{$t.generateBtn}
</button>

<style>
	.btn {
		width: 100%;
		padding: 14px;
		border: none;
		border-radius: 10px;
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		transition:
			transform 0.2s,
			box-shadow 0.2s,
			background-color 0.3s,
			color 0.3s;
	}

	.btn-primary {
		background: var(--btn-primary-bg);
		color: var(--btn-primary-text);
	}

	.btn-primary:hover {
		transform: translateY(-2px);
		box-shadow: 0 10px 20px rgba(15, 52, 96, 0.3);
	}
</style>
