<script>
	import './styles.less';
	let { children } = $props();
</script>

<header id="mainnav">
	<h1>Layout Builder</h1>
</header>
<main>
	{@render children()}
</main>
