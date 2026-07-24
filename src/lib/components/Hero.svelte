<script lang="ts">
	import type { HeroData } from '$lib/types';
	import { getInitials } from '$lib/utils';
	import LinkedIn from './icons/LinkedIn.svelte';
	import GitHub from './icons/GitHub.svelte';

	let { hero }: { hero: HeroData } = $props();
	let imgFailed = $state(false);
</script>

<section id="hero">
	<div class="container">
		<div class="grid">
			<div class="content">
				<span class="status"><span class="pulse"></span>Open to collaboration</span>

				<h1>{hero.name}</h1>
				<p class="role">{hero.title}</p>

				<p class="subtitle">{hero.subtitle}</p>
				<p class="desc">{hero.description}</p>

				<div class="ctas">
					<a href="#contact" class="btn btn-primary">Get in touch</a>
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

			<div class="portrait" class:initials={imgFailed}>
				{#if !imgFailed}
					<img src="/avatar.jpg" alt={hero.name} onerror={() => (imgFailed = true)} />
				{:else}
					{getInitials(hero.name)}
				{/if}
			</div>
		</div>
	</div>
</section>

<style lang="scss">
	section {
		min-height: 100vh;
		display: flex;
		align-items: center;
		padding-top: calc(var(--nav-height) + 3rem);
		position: relative;
	}

	.grid {
		display: grid;
		grid-template-columns: 1.4fr 0.9fr;
		align-items: center;
		gap: 4rem;
	}

	.content { max-width: 620px; }

	.status {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		font-family: var(--font-mono);
		font-size: 0.72rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--text-muted);
		margin-bottom: 1.75rem;
	}

	.pulse {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: var(--accent);
		box-shadow: 0 0 0 0 var(--accent-soft);
		animation: pulse 2.4s ease-out infinite;
	}

	@keyframes pulse {
		0% { box-shadow: 0 0 0 0 rgba(245, 177, 61, 0.4); }
		70% { box-shadow: 0 0 0 8px rgba(245, 177, 61, 0); }
		100% { box-shadow: 0 0 0 0 rgba(245, 177, 61, 0); }
	}

	h1 {
		font-family: var(--font-display);
		font-size: clamp(2.8rem, 6.5vw, 4.75rem);
		font-weight: 600;
		letter-spacing: -0.04em;
		line-height: 0.98;
		margin-bottom: 1rem;
	}

	.role {
		font-family: var(--font-mono);
		font-size: clamp(0.95rem, 2vw, 1.15rem);
		color: var(--accent);
		letter-spacing: 0.02em;
		margin-bottom: 1.5rem;
	}

	.subtitle {
		color: var(--text);
		font-size: 1.1rem;
		font-weight: 500;
		margin-bottom: 0.9rem;
	}

	.desc {
		color: var(--text-muted);
		font-size: 1.02rem;
		line-height: 1.75;
		max-width: 500px;
		margin-bottom: 2.25rem;
	}

	.ctas { display: flex; gap: 0.75rem; flex-wrap: wrap; }

	.portrait {
		position: relative;
		aspect-ratio: 4 / 5;
		width: 100%;
		border-radius: var(--radius);
		overflow: hidden;
		border: 1px solid var(--border-strong);
		filter: grayscale(0.35) contrast(1.02);

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			object-position: center top;
		}

		&.initials {
			display: flex;
			align-items: center;
			justify-content: center;
			background: var(--bg-card);
			font-family: var(--font-display);
			font-weight: 600;
			font-size: 4rem;
			color: var(--accent);
			filter: none;
		}
	}

	@media (max-width: 860px) {
		.grid {
			grid-template-columns: 1fr;
			gap: 2.5rem;
		}
		.portrait {
			max-width: 300px;
			order: -1;
		}
	}
</style>
