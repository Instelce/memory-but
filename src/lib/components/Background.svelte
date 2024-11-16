<script lang="ts">
	let diamonds = Array.from(Array(30).keys());
</script>

<div class="diamonds-container">
	{#each diamonds as diamond}
		<span style:--i={diamond}></span>
	{/each}
	<div class="radial"></div>
</div>

<style lang="scss">
	.diamonds-container {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		z-index: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;

		span {
			position: absolute;
			width: calc(var(--i) * 5rem);
			height: calc(var(--i) * 5rem);
			// clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
			border: .4rem solid rgb(var(--color-gray));
			border-radius: 10rem;
		}

		.radial {
			position: absolute;
			width: 100%;
			height: 100%;
			background: radial-gradient(circle, rgba(0, 0, 0, 0) 0% rgba(0, 0, 0, 1) 100%);
		}
	}
</style>
