<script lang="ts">
	import type { HeroData } from '$lib/types';
	let { hero = $bindable() }: { hero: HeroData } = $props();
</script>

<section class="editor-section">
	<h2>Hero</h2>
	<div class="fields">
		<label>Name<input bind:value={hero.name} /></label>
		<label>Title<input bind:value={hero.title} /></label>
		<label>Subtitle<input bind:value={hero.subtitle} /></label>
		<label class="full">Description<textarea rows="3" bind:value={hero.description}></textarea></label>
		<label>Email<input type="email" bind:value={hero.email} /></label>
		<label>LinkedIn URL<input bind:value={hero.linkedin} /></label>
		<label>GitHub URL<input bind:value={hero.github} /></label>
	</div>
</section>
