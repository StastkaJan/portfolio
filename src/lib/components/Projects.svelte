<script lang="ts">
	import type { ProjectItem } from '$lib/types';
	import ProjectThumb from './ProjectThumb.svelte';
	import GitHub from './icons/GitHub.svelte';
	import ExternalLink from './icons/ExternalLink.svelte';
	let { projects }: { projects: ProjectItem[] } = $props();
</script>

<div class="grid">
	{#each projects as project}
		<article class="project">
			{#if project.image}
				<a
					href={project.url || undefined}
					target="_blank"
					rel="noopener noreferrer"
					class="thumb"
					aria-label="Visit {project.title}"
				>
					<ProjectThumb src={project.image} alt={project.title} />
				</a>
			{/if}

			<div class="body">
				<div class="top">
					<h3>{project.title}</h3>
					<div class="links">
						{#if project.github}
							<a href={project.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
								<GitHub />
							</a>
						{/if}
						{#if project.url}
							<a href={project.url} target="_blank" rel="noopener noreferrer" aria-label="Live site">
								<ExternalLink />
							</a>
						{/if}
					</div>
				</div>

				<span class="date">{project.date}</span>

				<p>{project.description}</p>

				<div class="tech">
					{#each project.tech as t}
						<span class="tag">{t}</span>
					{/each}
				</div>
			</div>
		</article>
	{/each}
</div>

<style lang="scss">
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
		gap: 2rem;
	}

	.project {
		display: flex;
		flex-direction: column;
		border: 1px solid var(--border);
		border-radius: var(--radius);
		overflow: hidden;
		transition: border-color var(--transition);

		&:hover {
			border-color: var(--border-strong);
			.thumb :global(img) { transform: scale(1.03); filter: grayscale(0); }
		}
	}

	.thumb {
		display: block;
		overflow: hidden;
		aspect-ratio: 16 / 10;
		border-bottom: 1px solid var(--border);
	}

	.body {
		padding: 1.75rem;
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
	}

	.top {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 1rem;
	}

	h3 {
		font-family: var(--font-display);
		font-weight: 600;
		font-size: 1.35rem;
		letter-spacing: -0.02em;
	}

	.date {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: var(--text-muted);
		letter-spacing: 0.02em;
	}

	.links {
		display: flex;
		gap: 0.7rem;
		flex-shrink: 0;

		a {
			color: var(--text-muted);
			display: flex;
			&:hover { color: var(--accent); }
		}
	}

	p {
		color: var(--text-muted);
		font-size: 0.92rem;
		line-height: 1.75;
	}

	.tech {
		display: flex;
		flex-wrap: wrap;
		gap: 0.45rem;
		margin-top: 0.25rem;
	}
</style>
