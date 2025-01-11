<script>
	import CopyButton from '$lib/components/CopyButton.svelte';
	let { snippet, onView } = $props();

	function extractContent(snippet) {
		if (snippet.type !== 'snippet') {
			throw new Error(`This function is intended for snippets of type "snippet"`);
		}

		const keys = ['html', 'css', 'javascript'];

		for (const key of keys) {
			if (snippet[key] && snippet[key].trim !== '') {
				return {
					key: key,
					value: snippet[key]
				};
			}
		}
	}

	const data = extractContent(snippet);
</script>

<div class="snippet-block">
	<span>{snippet.title}</span>
	<!-- snippets only have 1 tech & val provided-->
	<CopyButton lang={data?.key} snippet={data?.value} />
	<!-- <a class="btn" href="/manager?snippetId={snippet.id}">edit</a> -->
	<button class="btn" onclick={() => onView(snippet)}>view</button>
</div>

<style>
	.snippet-block {
		display: inline-flex;
		justify-content: center;
		align-items: center;
		gap: 0.5em;
		border: 2px solid var(--border-color);
		padding: 0.25em 0.25em 0.25em 0.5em;
	}
</style>
