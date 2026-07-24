<script lang="ts">
	import type { HeroData } from '$lib/types';
	import { intersect } from '$lib/actions/intersect';
	import LinkedIn from './icons/LinkedIn.svelte';
	import GitHub from './icons/GitHub.svelte';
	let { hero }: { hero: HeroData } = $props();
</script>

<section id="contact" class="reveal" use:intersect>
	<div class="container">
		<div class="inner">
			<span class="section-label">06 — Contact</span>
			<h2 class="headline">Let's build<br />something together.</h2>
			<p class="tagline">
				Whether you have a project in mind or just want to say hi — my inbox is always open.
			</p>

			<div class="links">
				<a href="mailto:{hero.email}" class="btn btn-primary">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
					</svg>
					{hero.email}
				</a>

				<a href={hero.linkedin} target="_blank" rel="noopener noreferrer" class="btn btn-outline">
					<LinkedIn />
					LinkedIn
				</a>

				{#if hero.github}
					<a href={hero.github} target="_blank" rel="noopener noreferrer" class="btn btn-outline">
						<GitHub />
						GitHub
					</a>
				{/if}
			</div>
		</div>
	</div>
</section>

<style lang="scss">
	.inner {
		max-width: 640px;
	}

	.headline {
		font-family: var(--font-display);
		font-size: clamp(2.2rem, 5vw, 3.4rem);
		font-weight: 600;
		letter-spacing: -0.03em;
		line-height: 1.02;
		margin: 1rem 0 1.5rem;
	}

	.tagline {
		color: var(--text-muted);
		font-size: 1.1rem;
		line-height: 1.8;
		margin-bottom: 2.25rem;
	}

	.links {
		display: flex;
		gap: 0.75rem;
		flex-wrap: wrap;
	}
</style>
