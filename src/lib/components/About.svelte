<script lang="ts">
	import type { AboutData } from '$lib/types';
	let { about }: { about: AboutData } = $props();
</script>

<div class="grid">
	<p class="text">{about.text}</p>

	<div class="facts">
		{#each about.facts as fact}
			<div class="fact">
				<span class="num">{fact.num}</span>
				<span class="label">{fact.label}</span>
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.grid {
		display: grid;
		grid-template-columns: 1.2fr 1fr;
		gap: 4rem;
		align-items: start;
	}

	.text {
		color: var(--text-muted);
		font-size: 1.15rem;
		line-height: 1.85;
	}

	.facts {
		display: grid;
		grid-template-columns: 1fr 1fr;
		border-top: 1px solid var(--border);
		border-left: 1px solid var(--border);
	}

	.fact {
		border-bottom: 1px solid var(--border);
		border-right: 1px solid var(--border);
		padding: 1.75rem 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.num {
		font-family: var(--font-display);
		font-weight: 600;
		font-size: 2.4rem;
		letter-spacing: -0.03em;
		color: var(--accent);
		line-height: 1;
	}

	.label {
		font-size: 0.82rem;
		color: var(--text-muted);
	}

	@media (max-width: 768px) {
		.grid { grid-template-columns: 1fr; gap: 2.5rem; }
	}
</style>
