<script>
	let { value = '', onUpdate } = $props();
	let colors = ['#BBFF00', '#06F586', '#ff3e00', '#8D462E', '#FF0037'];

	function toHex(color) {
		if (!color) return '#000000';

		const div = document.createElement('div');
		div.style.color = color;
		document.body.appendChild(div);

		const computed = getComputedStyle(div).color;
		document.body.removeChild(div);

		const [r, g, b] = computed.match(/\d+/g).map(Number);

		return (
			'#' +
			[r, g, b]
				.map((x) => {
					const hex = x.toString(16);
					return hex.length === 1 ? '0' + hex : hex;
				})
				.join('')
		);
	}

	$effect(() => {
		value = toHex(value);
	});

	function setColor(newColor) {
		const hexColor = toHex(newColor);
		value = hexColor;
		onUpdate(hexColor);
	}
</script>

<div class="color-picker">
	<div class="colors">
		{#each colors as presetColor}
			<button onclick={() => setColor(presetColor)} style:background={presetColor}> preset </button>
		{/each}
	</div>

	<div class="form-control">
		<input type="color" name="color" {value} oninput={(e) => setColor(e.target.value)} />
		<span>{value}</span>
	</div>
</div>
