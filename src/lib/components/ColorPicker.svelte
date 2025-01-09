<script>
	let { value = '', onUpdate, label = 'Color Picker' } = $props();
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

	let id = crypto.randomUUID();

	function setColor(newColor) {
		const hexColor = toHex(newColor);
		value = hexColor;
		onUpdate(hexColor);
	}
</script>

<div class="form-control">
	<label for="color-input-{id}">{label}</label>
	<input
		id="color-input-{id}"
		type="color"
		name="color"
		{value}
		oninput={(e) => setColor(e.target.value)}
	/>
</div>

<style lang="less">
	.color-presets {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		align-items: center;
		.preset-btn {
			display: block;
			width: 44px;
			height: 44px;
			border: 0px;
			border-radius: 50%;
			border: 2px solid var(--border-color);
		}
	}
	input[type='color'] {
		display: block;
		width: 100%;
	}
</style>
