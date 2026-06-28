<script lang="ts">
	let { about = $bindable() }: { about: string } = $props();
</script>

<section class="editor-section">
	<h2>About</h2>
	<div class="fields">
		<label class="full">
			About text
			<textarea rows="12" bind:value={about}></textarea>
		</label>
	</div>
</section>
