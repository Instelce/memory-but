<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import type { CardData } from '$lib/types/CardData';
    import {revealedCount} from "$lib/store/revealed";

	let cards: CardData[] = [];
	for (let index = 0; index < 12; index++) {
		cards.push({ competence: 'Compétence ' + index, revealed: false });
	}

    let count = 0;
    revealedCount.store.subscribe(store => count = store);
</script>

<p>{count}</p>

<div class="w-full h-full flex justify-center items-center">
	<div class="w-[70%] h-[80%] grid grid-cols-4 gap-4">
		{#each cards as card}
			<Card data={card} />
		{/each}
	</div>
</div>
