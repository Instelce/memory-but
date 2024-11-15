<script lang="ts">
	import '../app.css';
	import '../condate.scss';
	import type { LayoutData } from './$types';

	interface Props {
		data: LayoutData;
		children?: import('svelte').Snippet;
	}

	let { data, children }: Props = $props();
</script>

<div class="w-full h-[100vh] bg-black text-white">
	{@render children?.()}
</div>
