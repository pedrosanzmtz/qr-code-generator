<script lang="ts">
	import { t } from '$lib/stores/language';
	import type { VCardData } from '$lib/stores/qrTemplate';

	interface Props {
		data: VCardData;
		onUpdate: (data: Partial<VCardData>) => void;
	}

	let { data, onUpdate }: Props = $props();
</script>

<div class="template-form">
	<div class="form-row">
		<div class="form-group">
			<label for="vcard-firstname">{$t.vcardFirstName}</label>
			<input
				type="text"
				id="vcard-firstname"
				value={data.firstName}
				oninput={(e) => onUpdate({ firstName: e.currentTarget.value })}
				placeholder={$t.vcardFirstNamePlaceholder}
				class="form-input"
			/>
		</div>
		<div class="form-group">
			<label for="vcard-lastname">{$t.vcardLastName}</label>
			<input
				type="text"
				id="vcard-lastname"
				value={data.lastName}
				oninput={(e) => onUpdate({ lastName: e.currentTarget.value })}
				placeholder={$t.vcardLastNamePlaceholder}
				class="form-input"
			/>
		</div>
	</div>

	<div class="form-group">
		<label for="vcard-organization">{$t.vcardOrganization}</label>
		<input
			type="text"
			id="vcard-organization"
			value={data.organization}
			oninput={(e) => onUpdate({ organization: e.currentTarget.value })}
			placeholder={$t.vcardOrganizationPlaceholder}
			class="form-input"
		/>
	</div>

	<div class="form-row">
		<div class="form-group">
			<label for="vcard-phone">{$t.vcardPhone}</label>
			<input
				type="tel"
				id="vcard-phone"
				value={data.phone}
				oninput={(e) => onUpdate({ phone: e.currentTarget.value })}
				placeholder={$t.vcardPhonePlaceholder}
				class="form-input"
			/>
		</div>
		<div class="form-group">
			<label for="vcard-email">{$t.vcardEmail}</label>
			<input
				type="email"
				id="vcard-email"
				value={data.email}
				oninput={(e) => onUpdate({ email: e.currentTarget.value })}
				placeholder={$t.vcardEmailPlaceholder}
				class="form-input"
			/>
		</div>
	</div>

	<div class="form-group">
		<label for="vcard-website">{$t.vcardWebsite}</label>
		<input
			type="url"
			id="vcard-website"
			value={data.website}
			oninput={(e) => onUpdate({ website: e.currentTarget.value })}
			placeholder={$t.vcardWebsitePlaceholder}
			class="form-input"
		/>
	</div>

	<div class="form-group">
		<label for="vcard-address">{$t.vcardAddress}</label>
		<input
			type="text"
			id="vcard-address"
			value={data.address}
			oninput={(e) => onUpdate({ address: e.currentTarget.value })}
			placeholder={$t.vcardAddressPlaceholder}
			class="form-input"
		/>
	</div>

	<div class="form-row">
		<div class="form-group">
			<label for="vcard-city">{$t.vcardCity}</label>
			<input
				type="text"
				id="vcard-city"
				value={data.city}
				oninput={(e) => onUpdate({ city: e.currentTarget.value })}
				placeholder={$t.vcardCityPlaceholder}
				class="form-input"
			/>
		</div>
		<div class="form-group">
			<label for="vcard-state">{$t.vcardState}</label>
			<input
				type="text"
				id="vcard-state"
				value={data.state}
				oninput={(e) => onUpdate({ state: e.currentTarget.value })}
				placeholder={$t.vcardStatePlaceholder}
				class="form-input"
			/>
		</div>
	</div>

	<div class="form-row">
		<div class="form-group">
			<label for="vcard-zip">{$t.vcardZip}</label>
			<input
				type="text"
				id="vcard-zip"
				value={data.zip}
				oninput={(e) => onUpdate({ zip: e.currentTarget.value })}
				placeholder={$t.vcardZipPlaceholder}
				class="form-input"
			/>
		</div>
		<div class="form-group">
			<label for="vcard-country">{$t.vcardCountry}</label>
			<input
				type="text"
				id="vcard-country"
				value={data.country}
				oninput={(e) => onUpdate({ country: e.currentTarget.value })}
				placeholder={$t.vcardCountryPlaceholder}
				class="form-input"
			/>
		</div>
	</div>
</div>

<style>
	.template-form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.form-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
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

	@media (max-width: 768px) {
		.form-row {
			grid-template-columns: 1fr;
		}
	}
</style>
