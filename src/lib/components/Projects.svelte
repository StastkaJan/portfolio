<script lang="ts">
	import type { ProjectItem } from '$lib/types';
	import { intersect } from '$lib/actions/intersect';
	let { projects }: { projects: ProjectItem[] } = $props();
</script>

<section id="projects" class="reveal" use:intersect>
	<div class="container">
		<div class="section-header">
			<h2>Featured <span>Projects</span></h2>
			<p>Things I've built</p>
		</div>

		<div class="grid">
			{#each projects as project}
				<div class="card">
					{#if project.image}
						<a
							href={project.url || undefined}
							target="_blank"
							rel="noopener noreferrer"
							class="thumb"
							aria-label="Visit {project.title}"
						>
							<img src={project.image} alt={project.title} />
						</a>
					{/if}

					<div class="body">
						<div class="top">
							<div class="title-row">
								<h3>{project.title}</h3>
								{#if project.date}
									<span class="date">{project.date}</span>
								{/if}
							</div>
							<div class="links">
								{#if project.github}
									<a href={project.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
										<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
											<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
										</svg>
									</a>
								{/if}
								{#if project.url}
									<a href={project.url} target="_blank" rel="noopener noreferrer" aria-label="Live site">
										<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
											<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
										</svg>
									</a>
								{/if}
							</div>
						</div>

						<p>{project.description}</p>

						<div class="tech">
							{#each project.tech as t}
								<span class="tag">{t}</span>
							{/each}
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style lang="scss">
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
		gap: 1.5rem;
	}

	.card {
		background: var(--bg-card);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		overflow: hidden;
		display: flex;
		flex-direction: column;
		transition: all var(--transition);

		&:hover {
			border-color: var(--accent);
			transform: translateY(-3px);
			box-shadow: 0 8px 30px rgba(99, 102, 241, 0.12);

			.thumb img {
				transform: scale(1.04);
			}
		}
	}

	.thumb {
		display: block;
		width: 100%;
		aspect-ratio: 16 / 9;
		overflow: hidden;

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			object-position: top;
			transition: transform 0.4s ease;
		}
	}

	.body {
		padding: 1.25rem;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		flex: 1;
	}

	.top {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 0.75rem;
	}

	.title-row {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
	}

	h3 {
		font-size: 1rem;
		font-weight: 600;
	}

	.date {
		font-size: 0.75rem;
		color: var(--text-muted);
	}

	.links {
		display: flex;
		gap: 0.6rem;
		flex-shrink: 0;

		a {
			color: var(--text-muted);
			display: flex;
			transition: color var(--transition);
			&:hover { color: var(--accent); }
		}
	}

	p {
		color: var(--text-muted);
		font-size: 0.875rem;
		line-height: 1.7;
		flex: 1;
	}

	.tech {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
	}
</style>
