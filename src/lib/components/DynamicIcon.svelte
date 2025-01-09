<script>
	let { path, fill } = $props();
</script>

<svg
	class="icon"
	xmlns="http://www.w3.org/2000/svg"
	width="44"
	height="44"
	fill="none"
	viewBox="0 0 44 44"
	aria-hidden="true"
	role="img"
>
	<path {fill} d={path} />
</svg>

<style>
	.icon {
		display: inline-block;
		width: 100%;
		height: auto;
	}
</style>
