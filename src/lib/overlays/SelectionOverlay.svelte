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
>
	<span></span><span></span><span></span><span></span>
</div>

<style lang="less">
	.ghost-selector {
		display: block;
		position: absolute;
		outline: 2px solid #0099ff;
		pointer-events: none;
		z-index: 1;
		outline-offset: -1px;

		span {
			position: absolute;
			width: 15px;
			height: 15px;
			background-color: #fff;
			border: 2px solid #0099ff;
			border-radius: 50%;

			&:nth-child(1) {
				top: -7.5px;
				left: -7.5px;
			}
			&:nth-child(2) {
				top: -7.5px;
				right: -7.5px;
			}
			&:nth-child(3) {
				bottom: -7.5px;
				left: -7.5px;
			}
			&:nth-child(4) {
				bottom: -7.5px;
				right: -7.5px;
			}
		}
	}
</style>
