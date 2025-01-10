<script>
	import Navigation from '$lib/components/Navigation.svelte';
	import './styles.less';
	let { children } = $props();
</script>

<Navigation />
<main>
	{@render children()}
</main>
