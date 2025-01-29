<script lang="ts">
	let time = $state(0); 
	let interval: ReturnType<typeof setInterval> | null = null;
	let {start}=$props();

	function formatTime(seconds: number): string {
		const minutes = Math.floor((seconds % 3600) / 60);
		const secs = seconds % 60;
		return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
	}

	$effect(()=>{
		if (!interval && start) {
			setTimeout(()=>{
				interval = setInterval(() => {
					time++;
				}, 1000);
			}, 4200);
		}
	})	

</script>

<div class="chronometer">
	{formatTime(time)}
</div>

<style lang="scss">
	.chronometer {
		top: 1.5rem;
		right: 2rem;
		position: absolute;
		font-family: "Condate", system-ui;
		font-weight: 200;
		font-style: normal;
		font-size: 3rem;
		margin: 1rem 0;
		z-index: 2;
	}
</style>
