<script lang="ts">
	import { t } from '$lib/stores/language';
	import type { WiFiData } from '$lib/stores/qrTemplate';

	interface Props {
		data: WiFiData;
		onUpdate: (data: Partial<WiFiData>) => void;
	}

	let { data, onUpdate }: Props = $props();
</script>

<div class="template-form">
	<div class="form-group">
		<label for="wifi-ssid">{$t.wifiSSID}</label>
		<input
			type="text"
			id="wifi-ssid"
			value={data.ssid}
			oninput={(e) => onUpdate({ ssid: e.currentTarget.value })}
			placeholder={$t.wifiSSIDPlaceholder}
			class="form-input"
		/>
	</div>

	<div class="form-group">
		<label for="wifi-password">{$t.wifiPassword}</label>
		<input
			type="text"
			id="wifi-password"
			value={data.password}
			oninput={(e) => onUpdate({ password: e.currentTarget.value })}
			placeholder={$t.wifiPasswordPlaceholder}
			class="form-input"
		/>
	</div>

	<div class="form-group">
		<label for="wifi-security">{$t.wifiSecurity}</label>
		<select
			id="wifi-security"
			value={data.security}
			onchange={(e) => onUpdate({ security: e.currentTarget.value as 'WPA' | 'WEP' | 'nopass' })}
			class="form-input"
		>
			<option value="WPA">WPA/WPA2</option>
			<option value="WEP">WEP</option>
			<option value="nopass">{$t.wifiNoPassword}</option>
		</select>
	</div>

	<div class="form-group-checkbox">
		<input
			type="checkbox"
			id="wifi-hidden"
			checked={data.hidden}
			onchange={(e) => onUpdate({ hidden: e.currentTarget.checked })}
			class="form-checkbox"
		/>
		<label for="wifi-hidden">{$t.wifiHidden}</label>
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

	.form-group-checkbox {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.form-checkbox {
		width: 18px;
		height: 18px;
		cursor: pointer;
	}

	.form-group-checkbox label {
		font-size: 0.9rem;
		color: var(--text-primary);
		cursor: pointer;
	}
</style>
