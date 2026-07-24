<script lang="ts">
	import type { ExperienceItem } from '$lib/types';
	import { intersect } from '$lib/actions/intersect';
	let { experience }: { experience: ExperienceItem[] } = $props();
</script>

<section id="experience" class="reveal" use:intersect>
	<div class="container">
		<div class="section-header">
			<span class="section-label">02 — Experience</span>
			<h2 class="section-title">Where I've been</h2>
		</div>

		<div class="list">
			{#each experience as item}
				<article class="item">
					<div class="meta">
						<span class="period">{item.period}</span>
						<span class="company">{item.company}</span>
						<span class="location">{item.location}</span>
					</div>

					<div class="body">
						<h3>{item.role}</h3>
						{#each item.description.split('\n\n') as para}
							<p>{@html para.replace(/^(Responsibilities|Achievements):/, '<strong>$1:</strong>')}</p>
						{/each}
						<div class="skills">
							{#each item.skills as skill}
								<span class="tag">{skill}</span>
							{/each}
						</div>
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>

<style lang="scss">
	.list {
		border-top: 1px solid var(--border);
	}

	.item {
		display: grid;
		grid-template-columns: 240px 1fr;
		gap: 2.5rem;
		padding: 2.5rem 0;
		border-bottom: 1px solid var(--border);
		position: relative;

		&::before {
			content: '';
			position: absolute;
			left: 0;
			top: 2.5rem;
			width: 6px;
			height: 6px;
			border-radius: 50%;
			background: var(--accent);
		}
	}

	.meta {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
		padding-left: 1.5rem;
	}

	.period {
		font-family: var(--font-mono);
		font-size: 0.78rem;
		color: var(--text-muted);
		letter-spacing: 0.02em;
	}

	.company {
		font-size: 1rem;
		font-weight: 600;
		color: var(--text);
	}

	.location {
		font-size: 0.82rem;
		color: var(--text-muted);
	}

	.body {
		min-width: 0;
	}

	h3 {
		font-family: var(--font-display);
		font-weight: 600;
		font-size: 1.35rem;
		letter-spacing: -0.02em;
		margin-bottom: 0.9rem;
	}

	p {
		color: var(--text-muted);
		font-size: 0.95rem;
		line-height: 1.75;
		margin-bottom: 1rem;

		:global(strong) {
			color: var(--text);
			font-weight: 600;
		}
	}

	.skills {
		display: flex;
		flex-wrap: wrap;
		gap: 0.45rem;
		margin-top: 1.25rem;
	}

	@media (max-width: 768px) {
		.item {
			grid-template-columns: 1fr;
			gap: 1.25rem;
			padding-left: 1.5rem;
		}
		.meta { padding-left: 0; }
	}
</style>
