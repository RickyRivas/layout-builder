<script>
	let { content, label = 'Select an option', style = 'icon' } = $props();
</script>

<div class="form-control">
	<fieldset role="radiogroup" aria-label={label}>
		<legend>{label}</legend>
		<div class="radio-button-group radio-button-group-style-{style}">
			{@render content()}
		</div>
	</fieldset>
</div>
