<script>
	import { iframeState } from '$lib/shared.svelte';

	let overlay = $state({
		top: 0,
		left: 0,
		width: 0,
		height: 0,
		visible: false
	});

	function updatePosition() {
		const rect = iframeState.selected.getBoundingClientRect();
		overlay = {
			top: rect.top,
			left: rect.left,
			width: rect.width,
			height: rect.height,
			visible: true
		};
	}

	$effect(() => {
		if (iframeState.selected) {
			updatePosition();
			window.addEventListener('update-selection-overlay', updatePosition);
			return () => {
				window.removeEventListener('update-selection-overlay', updatePosition);
			};
		}
	});
</script>

<div
	class="ghost-selector"
	style:top={overlay.top + 'px'}
	style:left={overlay.left + 'px'}
	style:width={overlay.width + 'px'}
	style:height={overlay.height + 'px'}
	style:opacity={overlay.visible ? 1 : 0}
></div>

<style lang="less">
	.ghost-selector {
		display: block;
		position: absolute;
		outline: 2px solid #0099ff;
		pointer-events: none;
		z-index: 1;
		outline-offset: -1px;
	}
</style>
