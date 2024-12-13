<script lang="ts">
    import { onMount } from 'svelte';
    import { tick } from 'svelte';
  
    let countdown: number = 3;
    let isCounting: boolean = true;
  
    async function startCountdown(): Promise<void> {
        while (countdown > 0) {
            await tick(); 
            await new Promise(resolve => setTimeout(resolve, 1000)); 
            countdown -= 1;
        }
        isCounting = false;
    }
  
    onMount(startCountdown);
</script>
  
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Mogra&display=swap" rel="stylesheet">

<style>
    .countdown {
        font-family: "Mogra", system-ui;
        font-weight: 400;
        font-style: normal;
        font-size: 15rem;
        text-align: center;
        margin: 20px;
    }
</style>
  
<div class="countdown">
    {#if isCounting}
        <p>{countdown}</p>
    {:else}
        <p>GO!</p>
    {/if}
</div>