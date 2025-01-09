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

<div class="color-picker-container">
	<div class="color-presets">
		{#each colors as presetColor}
			<button
				class="preset-btn"
				onclick={() => setColor(presetColor)}
				style:background={presetColor}
				aria-label={`Click to change color to ${presetColor}`}
			>
			</button>
		{/each}
	</div>

	<div class="form-control">
		<span>{value}</span>
		<input type="color" name="color" {value} oninput={(e) => setColor(e.target.value)} />
	</div>
</div>

<style lang="less">
	.color-picker-container {
		display: block;
		width: 100%;
		text-align: center;
		span {
			display: block;
			text-transform: uppercase;
			font-family: 16px;
			line-height: 44px;
		}
	}

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
