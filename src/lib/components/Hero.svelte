<script lang="ts">
	import type { HeroData } from '$lib/types';
	import { getInitials } from '$lib/utils';

	let { hero }: { hero: HeroData } = $props();
	let imgFailed = $state(false);
</script>

<section id="hero">
	<div class="blob blob-1"></div>
	<div class="blob blob-2"></div>

	<div class="container">
		<div class="content">
			<span class="greeting">Hello, I'm</span>
			<h1>{hero.name}</h1>
			<h2>{hero.title}</h2>
			<p class="subtitle">{hero.subtitle}</p>
			<p class="desc">{hero.description}</p>

			<div class="ctas">
				<a href="#contact" class="btn btn-primary">Get in touch</a>
				<a href={hero.linkedin} target="_blank" rel="noopener noreferrer" class="btn btn-outline">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
						<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
						<rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
					</svg>
					LinkedIn
				</a>
				{#if hero.github}
					<a href={hero.github} target="_blank" rel="noopener noreferrer" class="btn btn-outline">GitHub</a>
				{/if}
			</div>
		</div>

		<div class="avatar" class:initials={imgFailed}>
			{#if !imgFailed}
				<img src="/avatar.jpg" alt={hero.name} onerror={() => (imgFailed = true)} />
			{:else}
				{getInitials(hero.name)}
			{/if}
		</div>
	</div>
</section>

<style lang="scss">
	section {
		min-height: 100vh;
		display: flex;
		align-items: center;
		padding-top: calc(var(--nav-height) + 2rem);
		position: relative;
		overflow: hidden;
	}

	.blob {
		position: absolute;
		border-radius: 50%;
		filter: blur(80px);
		opacity: 0.15;
		pointer-events: none;

		&-1 { width: 500px; height: 500px; background: var(--accent); top: -100px; right: -100px; }
		&-2 { width: 350px; height: 350px; background: #a855f7; bottom: 0; left: -80px; }
	}

	.container {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 3rem;
		position: relative;
		z-index: 1;
	}

	.content { max-width: 600px; }

	.greeting {
		display: block;
		color: var(--accent);
		font-size: 1rem;
		font-weight: 500;
		margin-bottom: 0.5rem;
		letter-spacing: 0.05em;
	}

	h1 {
		font-size: clamp(2.5rem, 6vw, 4rem);
		font-weight: 800;
		background: linear-gradient(135deg, var(--text) 40%, var(--accent-light));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		margin-bottom: 0.25rem;
	}

	h2 {
		font-size: clamp(1.1rem, 2.5vw, 1.4rem);
		font-weight: 500;
		color: var(--text-muted);
		margin-bottom: 0.25rem;
	}

	.subtitle {
		color: var(--accent-light);
		font-size: 0.95rem;
		font-weight: 500;
		margin-bottom: 1.25rem;
	}

	.desc {
		color: var(--text-muted);
		font-size: 1rem;
		line-height: 1.7;
		max-width: 480px;
		margin-bottom: 2rem;
	}

	.ctas { display: flex; gap: 0.75rem; flex-wrap: wrap; }

	.avatar {
		width: 220px;
		height: 220px;
		border-radius: 50%;
		flex-shrink: 0;
		box-shadow: 0 0 60px rgba(99, 102, 241, 0.3);
		border: 3px solid rgba(99, 102, 241, 0.3);
		overflow: hidden;

		img { width: 100%; height: 100%; object-fit: cover; object-position: center top; }

		&.initials {
			background: linear-gradient(135deg, var(--accent), #a855f7);
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 4rem;
			font-weight: 800;
			color: white;
		}
	}

	@media (max-width: 768px) {
		.container { flex-direction: column-reverse; text-align: center; }
		.ctas { justify-content: center; }
		.desc { margin-inline: auto; }
		.avatar { width: 150px; height: 150px; font-size: 2.5rem; }
	}
</style>
