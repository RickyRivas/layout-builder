<script>
	import { iframeState } from '../../routes/shared.svelte';

	let resizeObserver;
	let overlay = $state({
		top: 0,
		left: 0,
		width: 0,
		height: 0,
		visible: false
	});

	function updatePosition(element) {
		const rect = element.getBoundingClientRect();
		overlay = {
			top: rect.top,
			left: rect.left,
			width: rect.width,
			height: rect.height,
			visible: true
		};
	}

	$effect(() => {
		if (iframeState.selected && iframeState.document) {
			// initial position
			updatePosition(iframeState.selected);

			// cleanup prev observer
			if (resizeObserver) resizeObserver.disconnect();

			// setup new observer
			resizeObserver = new ResizeObserver((entries) => {
				for (const entry of entries) {
					updatePosition(entry.target);
				}
			});

			resizeObserver.observe(iframeState.selected);
		} else {
			overlay.visible = false;
			if (resizeObserver) resizeObserver.disconnect();
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

<style>
	.ghost-selector {
		display: block;
		position: absolute;
		border: 2px solid #0099ff;
		pointer-events: none;
		z-index: 1;
	}
</style>
