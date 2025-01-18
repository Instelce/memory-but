<script lang="ts">
    import { onMount } from 'svelte';
    import { tick } from 'svelte';

    let countdown: number = 3;
    let isCounting: boolean = true;
    let containerHidden: boolean = false;

    async function startCountdown(): Promise<void> {
        while (countdown > 0) {
            await tick(); 
            await new Promise(resolve => setTimeout(resolve, 1000)); 
            countdown -= 1;
        }
        isCounting = false;
        await tick();  // Wait for DOM to update with "GO!"
        await new Promise(resolve => setTimeout(resolve, 1000));  // Sleep for 1 second
        containerHidden = true;  // Hide the container
    }

    onMount(startCountdown);
</script>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Mogra&display=swap" rel="stylesheet">

<style>
    .container {
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.425);
        z-index: 10;
        position: relative;
        top: 0;
        left: 0;
    }

    .hidden {
        display: none;
    }

    .countdown {
        font-family: "Mogra", system-ui;
        font-weight: 400;
        font-style: normal;
        font-size: 15rem;
        text-align: center;
        margin: 20px;
    }
</style>

<div class="container" class:hidden={containerHidden}>
    <div class="countdown">
        {#if isCounting}
            <p>{countdown}</p>
        {:else}
            <p>GO!</p>
        {/if}
    </div>
</div>
