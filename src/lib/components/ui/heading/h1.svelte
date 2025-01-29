<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = HTMLAttributes<HTMLHeadingElement> & { children: Snippet };
	let { children, class: className, ...restProps }: Props = $props();
</script>

<h1
	class={cn("mt-10 scroll-m-20 pb-10 text-4xl font-semibold tracking-tight transition-colors first:mt-0", className)}
	{...restProps}
>
	{@render children()}
</h1>

<style lang="scss">
	h1 {
		font-family: 'Condate', sans-serif;
	}
</style>
