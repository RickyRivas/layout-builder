<script>
	import { elements } from '$lib/element-config';
	import { iframeState } from '$lib/shared.svelte';
	let position;

	let indicator = $state({
		top: 0,
		left: 0,
		width: 0,
		height: 0,
		borderTopWidth: 0,
		borderBottomWidth: 0,
		borderLeftWidth: 0,
		borderRightWidth: 0,
		visible: false
	});
</script>

<div
	class="drop-indicator"
	style:top={indicator.top + 'px'}
	style:left={indicator.left + 'px'}
	style:width={indicator.width + 'px'}
	style:height={indicator.height + 'px'}
	style:border-top-width={indicator.borderTopWidth}
	style:border-bottom-width={indicator.borderBottomWidth}
	style:border-left-width={indicator.borderLeftWidth}
	style:border-right-width={indicator.borderRightWidth}
	style:opacity={indicator.visible ? 1 : 0}
></div>

<style>
	.drop-indicator {
		position: absolute;
		pointer-events: none;
		border: 0 solid red;
		/* background-color: rgba(0, 0, 0, 0.2); */
		opacity: 0.5;
		z-index: 3;
	}
</style>
