<script lang="ts">
	import type { Language } from '$lib/types';
	let { languages }: { languages: Language[] } = $props();
</script>

<div class="grid">
	{#each languages as lang}
		<div class="item">
			<span class="name">{lang.name}</span>
			<span class="level">{lang.level}</span>
		</div>
	{/each}
</div>

<style lang="scss">
	.grid {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}

	.item {
		flex: 1 1 240px;
		max-width: 340px;
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 1.5rem;
		padding: 1.5rem;
		border: 1px solid var(--border);
		border-radius: var(--radius);
	}

	.name {
		font-family: var(--font-display);
		font-weight: 600;
		font-size: 1.2rem;
		letter-spacing: -0.02em;
	}

	.level {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		letter-spacing: 0.04em;
		color: var(--accent);
	}
</style>
