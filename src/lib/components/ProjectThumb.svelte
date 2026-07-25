<script lang="ts">
	let { src, alt, href }: { src: string; alt: string; href?: string } = $props();
</script>

<a {href} target="_blank" rel="noopener noreferrer" class="thumb" aria-label="Visit {alt}">
	<picture>
		<source srcset="{src}.webp" type="image/webp" />
		<img src="{src}.jpg" {alt} />
	</picture>
</a>

<style lang="scss">
	.thumb {
		display: block;
		overflow: hidden;
		aspect-ratio: 16 / 10;
		border-bottom: 1px solid var(--border);

		img {
			display: block;
			width: 100%;
			height: 100%;
			object-fit: cover;
			object-position: top;
			filter: grayscale(0.3);
			transition: transform 0.5s ease, filter var(--transition);
		}
	}
</style>
