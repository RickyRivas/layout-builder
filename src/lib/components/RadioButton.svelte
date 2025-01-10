<script>
	import DynamicIcon from './DynamicIcon.svelte';
	let { group, label, value, path = null, property, onChange, style = 'icon' } = $props();
</script>

<div class="radio-button radio-button-style-{style}">
	<input
		type="radio"
		name="radio-input-{property}-{value}"
		id="radio-input-{property}-{value}"
		{value}
		bind:group
		onchange={() => onChange(value)}
	/>
	<label for="radio-input-{property}-{value}">
		{#if style === 'icon'}
			<DynamicIcon {path} fill={'currentColor'} />
			<span class="tooltip">{label}</span>
		{:else}
			{label}
		{/if}
	</label>
</div>
