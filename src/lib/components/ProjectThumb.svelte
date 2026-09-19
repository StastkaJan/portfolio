<script lang="ts">
	let { src, alt }: { src: string; alt: string } = $props();
</script>

<picture>
	<source
		srcset="{src}-640.webp 640w, {src}-960.webp 960w, {src}.webp 1280w"
		sizes="(max-width: 855px) max(378px, calc(100vw - 66px)), (max-width: 1120px) calc((100vw - 100px) / 2), 510px"
		type="image/webp"
	/>
	<img src="{src}.jpg" {alt} width="1280" height="800" loading="lazy" decoding="async" />
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
