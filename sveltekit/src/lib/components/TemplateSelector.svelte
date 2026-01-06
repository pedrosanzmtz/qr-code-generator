<script lang="ts">
	import { t } from '$lib/stores/language';
	import type { TemplateType } from '$lib/stores/qrTemplate';
	import type { TranslationKey } from '$lib/stores/language';

	interface Props {
		selectedTemplate: TemplateType;
		onTemplateChange: (template: TemplateType) => void;
	}

	let { selectedTemplate, onTemplateChange }: Props = $props();

	const templates: { value: TemplateType; iconPath: string; labelKey: TranslationKey }[] = [
		{
			value: 'url',
			labelKey: 'templateUrl',
			iconPath:
				'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1'
		},
		{
			value: 'wifi',
			labelKey: 'templateWifi',
			iconPath:
				'M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0'
		},
		{
			value: 'vcard',
			labelKey: 'templateVcard',
			iconPath:
				'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
		},
		{
			value: 'email',
			labelKey: 'templateEmail',
			iconPath:
				'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
		},
		{
			value: 'sms',
			labelKey: 'templateSms',
			iconPath:
				'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z'
		},
		{
			value: 'phone',
			labelKey: 'templatePhone',
			iconPath:
				'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
		},
		{
			value: 'text',
			labelKey: 'templateText',
			iconPath:
				'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
		}
	];

	function handleTemplateChange(template: TemplateType) {
		onTemplateChange(template);
	}
</script>

<div class="template-selector">
	<div class="template-label">{$t.templateLabel}</div>
	<div class="template-grid">
		{#each templates as template (template.value)}
			<button
				type="button"
				class="template-btn"
				class:active={selectedTemplate === template.value}
				onclick={() => handleTemplateChange(template.value)}
				aria-label={$t[template.labelKey]}
			>
				<svg
					class="template-icon"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					aria-hidden="true"
				>
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={template.iconPath} />
				</svg>
				<span class="template-name">
					{$t[template.labelKey]}
				</span>
			</button>
		{/each}
	</div>
</div>

<style>
	.template-selector {
		margin-bottom: 1.5rem;
	}

	.template-label {
		display: block;
		font-size: 1rem;
		font-weight: 600;
		margin-bottom: 0.75rem;
		color: var(--text-primary);
	}

	.template-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
		gap: 0.75rem;
	}

	.template-btn {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 1rem;
		background-color: var(--input-bg);
		border: 2px solid var(--border-color);
		border-radius: 8px;
		cursor: pointer;
		transition: all 0.2s ease;
		color: var(--text-primary);
	}

	.template-btn:hover {
		border-color: #0f3460;
		transform: translateY(-2px);
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	}

	.template-btn.active {
		border-color: #0f3460;
		background: var(--btn-secondary-bg);
	}

	.template-icon {
		width: 32px;
		height: 32px;
		margin-bottom: 0.5rem;
	}

	.template-name {
		font-size: 0.875rem;
		font-weight: 500;
		text-align: center;
	}

	@media (max-width: 768px) {
		.template-grid {
			grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
		}

		.template-btn {
			padding: 0.75rem;
		}

		.template-icon {
			width: 24px;
			height: 24px;
		}

		.template-name {
			font-size: 0.75rem;
		}
	}
</style>
