<script lang="ts">
	import type { ExperienceItem } from '$lib/types';
	import { intersect } from '$lib/actions/intersect';
	let { experience }: { experience: ExperienceItem[] } = $props();
</script>

<section id="experience" class="reveal" use:intersect>
	<div class="container">
		<div class="section-header">
			<h2>Work <span>Experience</span></h2>
			<p>Where I've been and what I've built</p>
		</div>

		<div class="timeline">
			{#each experience as item}
				<div class="item">
					<div class="card">
						<div class="top">
							<div>
								<h3>{item.role}</h3>
								<span class="company">{item.company}</span>
							</div>
							<div class="meta">
								<span class="period">{item.period}</span>
								<span class="location">
									<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
										<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
									</svg>
									{item.location}
								</span>
							</div>
						</div>
						{#each item.description.split('\n\n') as para}
							<p>{@html para.replace(/^(Responsibilities|Achievements):/, '<strong>$1:</strong>')}</p>
						{/each}
						<div class="skills">
							{#each item.skills as skill}
								<span class="tag">{skill}</span>
							{/each}
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style lang="scss">
	.timeline {
		position: relative;
		padding-left: 2rem;

		&::before {
			content: '';
			position: absolute;
			left: 7px;
			top: 0;
			bottom: 0;
			width: 2px;
			background: linear-gradient(to bottom, var(--accent), transparent);
		}
	}

	.item {
		margin-bottom: 2rem;
		&:last-child { margin-bottom: 0; }
	}

	.card {
		position: relative;
		background: var(--bg-card);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		padding: 1.5rem;
		transition: all var(--transition);

		&::before {
			content: '';
			position: absolute;
			left: -2rem;
			top: 50%;
			transform: translateY(-50%);
			width: 14px;
			height: 14px;
			border-radius: 50%;
			background: var(--accent);
			border: 2px solid var(--bg);
			box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
		}

		&:hover {
			border-color: var(--accent);
			transform: translateX(4px);
			box-shadow: 0 4px 20px rgba(99, 102, 241, 0.1);
		}
	}

	.top {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 1rem;
		margin-bottom: 0.75rem;
		flex-wrap: wrap;
	}

	h3 {
		font-size: 1.05rem;
		font-weight: 600;
		margin-bottom: 0.2rem;
	}

	.company {
		color: var(--accent);
		font-size: 0.875rem;
		font-weight: 500;
	}

	.meta {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 0.25rem;
		flex-shrink: 0;
	}

	.period {
		font-size: 0.8rem;
		color: var(--text-muted);
		font-weight: 500;
	}

	.location {
		font-size: 0.75rem;
		color: var(--text-muted);
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}

	p {
		color: var(--text-muted);
		font-size: 0.9rem;
		line-height: 1.7;
		margin-bottom: 1rem;
	}

	.skills {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
	}
</style>
