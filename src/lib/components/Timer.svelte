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
			}, 3000);
		}
	})	

</script>
<div class="container">
	<div class="chronometer">
		{formatTime(time)}
	</div>
</div>

<style lang="scss">
	.container{
		position: relative;
		bottom: 20px;
		right: 20px;
	}

	.chronometer {
		font-family: "Mogra", system-ui;
		font-weight: 200;
		font-style: normal;
		font-size: 3rem;
		margin: 1rem 0;
	}
</style>
