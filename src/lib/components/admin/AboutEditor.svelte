<script lang="ts">
	let { about = $bindable() }: { about: string } = $props();
</script>

<section class="editor-section">
	<h2>About</h2>
	<label class="full">
		About text
		<textarea rows="8" bind:value={about}></textarea>
	</label>
</section>
