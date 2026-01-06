<script lang="ts">
	import { t } from '$lib/stores/language';
	import type { PhoneData } from '$lib/stores/qrTemplate';

	interface Props {
		data: PhoneData;
		onUpdate: (data: Partial<PhoneData>) => void;
	}

	let { data, onUpdate }: Props = $props();
</script>

<div class="template-form">
	<div class="form-group">
		<label for="phone-number">{$t.phoneNumber}</label>
		<input
			type="tel"
			id="phone-number"
			value={data.phone}
			oninput={(e) => onUpdate({ phone: e.currentTarget.value })}
			placeholder={$t.phoneNumberPlaceholder}
			class="form-input"
		/>
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

	.form-input {
		padding: 0.75rem;
		font-size: 1rem;
		border: 2px solid var(--border-color);
		border-radius: 8px;
		background-color: var(--input-bg);
		color: var(--input-text);
		transition: border-color 0.2s ease;
	}

	.form-input:focus {
		outline: none;
		border-color: #0f3460;
	}
</style>
