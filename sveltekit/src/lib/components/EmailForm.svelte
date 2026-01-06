<script lang="ts">
	import { t } from '$lib/stores/language';
	import type { EmailData } from '$lib/stores/qrTemplate';

	interface Props {
		data: EmailData;
		onUpdate: (data: Partial<EmailData>) => void;
	}

	let { data, onUpdate }: Props = $props();
</script>

<div class="template-form">
	<div class="form-group">
		<label for="email-address">{$t.emailAddress}</label>
		<input
			type="email"
			id="email-address"
			value={data.email}
			oninput={(e) => onUpdate({ email: e.currentTarget.value })}
			placeholder={$t.emailAddressPlaceholder}
			class="form-input"
		/>
	</div>

	<div class="form-group">
		<label for="email-subject">{$t.emailSubject}</label>
		<input
			type="text"
			id="email-subject"
			value={data.subject}
			oninput={(e) => onUpdate({ subject: e.currentTarget.value })}
			placeholder={$t.emailSubjectPlaceholder}
			class="form-input"
		/>
	</div>

	<div class="form-group">
		<label for="email-body">{$t.emailBody}</label>
		<textarea
			id="email-body"
			value={data.body}
			oninput={(e) => onUpdate({ body: e.currentTarget.value })}
			placeholder={$t.emailBodyPlaceholder}
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
