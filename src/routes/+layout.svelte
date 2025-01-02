<script>
	import './styles.less';
	let { children } = $props();
</script>

<header>
	<h1>Layout Builder</h1>
</header>

<main>
	{@render children()}
</main>
