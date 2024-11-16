<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = HTMLAttributes<HTMLHeadingElement> & { children: Snippet };
	let { children, ...restProps }: Props = $props();
</script>

<h1
	class="mt-10 scroll-m-20 pb-10 text-4xl font-semibold tracking-tight transition-colors first:mt-0"
	{...restProps}
>
	{@render children()}
</h1>

<style lang="scss">
	h1 {
		font-family: 'Condate', sans-serif;
	}
</style>
