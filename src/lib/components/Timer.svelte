<script lang="ts">
	let time = 0; 
	let interval: ReturnType<typeof setInterval> | null = null;

	function formatTime(seconds: number): string {
		const minutes = Math.floor((seconds % 3600) / 60);
		const secs = seconds % 60;
		return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
	}

	function start() {
		if (!interval) {
			interval = setInterval(() => {
				time++;
			}, 1000);
		}
	}

	function pause() {
		if (interval) {
			clearInterval(interval);
			interval = null;
		}
	}

	function reset() {
		pause();
		time = 0;
	}
</script>

<div class="chronometer">
	{formatTime(time)}
</div>

<style lang="scss">
	.chronometer {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-family: Arial, sans-serif;

		h1 {
			font-size: 3rem;
			margin: 1rem 0;
		}
	}
</style>
