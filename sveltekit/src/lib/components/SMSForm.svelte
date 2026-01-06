<script lang="ts">
	import { t } from '$lib/stores/language';
	import type { SMSData } from '$lib/stores/qrTemplate';

	interface Props {
		data: SMSData;
		onUpdate: (data: Partial<SMSData>) => void;
	}

	let { data, onUpdate }: Props = $props();
</script>

<div class="template-form">
	<div class="form-group">
		<label for="sms-phone">{$t.smsPhone}</label>
		<input
			type="tel"
			id="sms-phone"
			value={data.phone}
			oninput={(e) => onUpdate({ phone: e.currentTarget.value })}
			placeholder={$t.smsPhonePlaceholder}
			class="form-input"
		/>
	</div>

	<div class="form-group">
		<label for="sms-message">{$t.smsMessage}</label>
		<textarea
			id="sms-message"
			value={data.message}
			oninput={(e) => onUpdate({ message: e.currentTarget.value })}
			placeholder={$t.smsMessagePlaceholder}
			class="form-textarea"
			rows="4"
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

	.form-input,
	.form-textarea {
		padding: 0.75rem;
		font-size: 1rem;
		border: 2px solid var(--border-color);
		border-radius: 8px;
		background-color: var(--input-bg);
		color: var(--input-text);
		transition: border-color 0.2s ease;
		font-family: inherit;
	}

	.form-input:focus,
	.form-textarea:focus {
		outline: none;
		border-color: #0f3460;
	}

	.form-textarea {
		resize: vertical;
		min-height: 100px;
	}
</style>
