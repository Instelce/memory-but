<script lang="ts">
	import '../app.css';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<div class="w-full h-[100vh] bg-black text-white">
	<slot></slot>
</div>
