<script lang="ts">
	import { onMount } from 'svelte';
	import { tick } from 'svelte';
	import { fade, fly } from 'svelte/transition';

	let countdown: number = $state(3);
	let containerHidden: boolean = $state(false);

	async function startCountdown(): Promise<void> {
		while (countdown > 0) {
			await tick();
			await new Promise((resolve) => setTimeout(resolve, 1000));
			countdown -= 1;
		}
		await tick(); // Wait for DOM to update with "GO!"
		await new Promise((resolve) => setTimeout(resolve, 1000)); // Sleep for 1 second
		containerHidden = true; // Hide the container
	}

	onMount(startCountdown);
</script>

{#if !containerHidden}
<div class="countdown" out:fade={{duration: 200}}>
		{#if countdown == 0}
			<p>GO!</p>
		{:else}
			<p>{countdown}</p>
		{/if}
    </div>
{/if}

<style>
	.countdown {
        width: 100%;
        height: 100vh;
		position: absolute;
        top: 0;
        left: 0;

		z-index: 20;
		font-family: 'Condate', system-ui;
		font-weight: 700;
		font-size: 15rem;
		text-align: center;

        display: flex;
        align-items: center;
        justify-content: center;

        background: radial-gradient(
            circle,
            rgba(0, 0, 0, 1) 0%,
            rgba(0, 0, 0, 0.4) 60%,
            rgba(0, 0, 0, 0) 100%
        );
	}
</style>
