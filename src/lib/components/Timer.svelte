<script lang="ts">
	let time = $state(0);
	let interval: ReturnType<typeof setInterval> | null = null;
	let { start, pause = $bindable(false), show = true } = $props();

	function formatTime(seconds: number): string {
		const minutes = Math.floor((seconds % 3600) / 60);
		const secs = seconds % 60;
		return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
	}

	$effect(() => {
		if (!interval && start) {
			setTimeout(() => {
				interval = setInterval(() => {
					if (!pause) {
						time++;
					}
				}, 1000);
			}, 3200);
		}
	});
</script>

<div class="chronometer">
	{#if show}
		{formatTime(time)}
	{/if}
</div>

<style lang="scss">
	.chronometer {
		top: 2.5%;
		right: 2rem;
		position: absolute;
		font-family: 'Condate', system-ui;
		font-weight: 200;
		font-style: normal;
		font-size: 3rem;
		margin: 1rem 0;
		z-index: 2;
	}
</style>
