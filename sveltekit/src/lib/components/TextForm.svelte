<script lang="ts">
	import { t } from '$lib/stores/language';
	import type { TextData } from '$lib/stores/qrTemplate';

	interface Props {
		data: TextData;
		onUpdate: (data: Partial<TextData>) => void;
	}

	let { data, onUpdate }: Props = $props();
</script>

<div class="template-form">
	<div class="form-group">
		<label for="text-content">{$t.textContent}</label>
		<textarea
			id="text-content"
			value={data.text}
			oninput={(e) => onUpdate({ text: e.currentTarget.value })}
			placeholder={$t.textContentPlaceholder}
			class="form-textarea"
			rows="6"
		></textarea>
	</div>
</div>

<style>
	.template-form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.form-group label {
		font-size: 0.9rem;
		font-weight: 500;
		color: var(--text-primary);
	}

	.form-textarea {
		padding: 0.75rem;
		font-size: 1rem;
		border: 2px solid var(--border-color);
		border-radius: 8px;
		background-color: var(--input-bg);
		color: var(--input-text);
		transition: border-color 0.2s ease;
		font-family: inherit;
		resize: vertical;
		min-height: 150px;
	}

	.form-textarea:focus {
		outline: none;
		border-color: #0f3460;
	}
</style>
