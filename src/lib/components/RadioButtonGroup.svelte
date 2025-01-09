<script>
	let { content, label = 'Select an option' } = $props();
</script>

<div class="form-control">
	<fieldset role="radiogroup" aria-label={label}>
		<legend>{label}</legend>
		<div class="radio-button-group">
			{@render content()}
		</div>
	</fieldset>
</div>
