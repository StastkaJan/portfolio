<script lang="ts">
	let { src, alt }: { src: string; alt: string } = $props();
</script>

<picture>
	<source srcset="{src}.webp" type="image/webp" />
	<img src="{src}.jpg" {alt} />
</picture>

<style lang="scss">
	picture {
		display: block;
		width: 100%;
		height: 100%;
	}

	img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: top;
		filter: grayscale(0.3);
		transition: transform 0.5s ease, filter var(--transition);
	}
</style>
