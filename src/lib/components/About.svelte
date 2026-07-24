<script lang="ts">
	import { intersect } from '$lib/actions/intersect';
	let { about }: { about: string } = $props();

	const facts = [
		{ num: '4+', label: 'Years of experience' },
		{ num: '2', label: 'Companies worked at' },
		{ num: '2', label: 'Languages spoken' },
		{ num: 'BSc', label: 'Information Technology' }
	];
</script>

<section id="about" class="reveal" use:intersect>
	<div class="container">
		<div class="section-header">
			<span class="section-label">01 — About</span>
			<h2 class="section-title">A bit of context</h2>
		</div>

		<div class="grid">
			<p class="text">{about}</p>

			<div class="facts">
				{#each facts as fact}
					<div class="fact">
						<span class="num">{fact.num}</span>
						<span class="label">{fact.label}</span>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

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
