<script lang="ts">
	import type { HeroData } from '$lib/types';
	import { intersect } from '$lib/actions/intersect';
	let { hero }: { hero: HeroData } = $props();
</script>

<section id="contact" class="reveal" use:intersect>
	<div class="container">
		<div class="section-header">
			<h2>Get in <span>Touch</span></h2>
			<p>Let's build something together</p>
		</div>

		<div class="card inner">
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
					<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
						<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
						<rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
					</svg>
					LinkedIn
				</a>

				{#if hero.github}
					<a href={hero.github} target="_blank" rel="noopener noreferrer" class="btn btn-outline">
						<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
							<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
						</svg>
						GitHub
					</a>
				{/if}
			</div>
		</div>
	</div>
</section>

<style lang="scss">
	.inner {
		max-width: 600px;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.tagline {
		color: var(--text-muted);
		font-size: 1.05rem;
		line-height: 1.8;
	}

	.links {
		display: flex;
		gap: 0.75rem;
		flex-wrap: wrap;
	}
</style>
