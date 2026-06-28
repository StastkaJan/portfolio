<script lang="ts">
	import { theme } from '$lib/stores/theme';

	let menuOpen = $state(false);

	const links = [
		{ href: '#about', label: 'About' },
		{ href: '#experience', label: 'Experience' },
		{ href: '#projects', label: 'Projects' },
		{ href: '#skills', label: 'Skills' },
		{ href: '#languages', label: 'Languages' },
		{ href: '#contact', label: 'Contact' }
	];

	function toggleTheme() {
		theme.update((t) => (t === 'dark' ? 'light' : 'dark'));
	}
</script>

<header>
	<nav class="container">
		<a href="#hero" class="logo">JS</a>

		<ul class="nav-links" class:open={menuOpen}>
			{#each links as link}
				<li>
					<a href={link.href} onclick={() => (menuOpen = false)}>{link.label}</a>
				</li>
			{/each}
			<li><a href="/admin" class="cms-link">CMS</a></li>
		</ul>

		<div class="actions">
			<button class="theme-btn" onclick={toggleTheme} aria-label="Toggle theme">
				{#if $theme === 'dark'}
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
					</svg>
				{:else}
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
					</svg>
				{/if}
			</button>

			<button class="burger" onclick={() => (menuOpen = !menuOpen)} aria-label="Toggle menu">
				<span></span>
				<span></span>
				<span></span>
			</button>
		</div>
	</nav>
</header>

<style lang="scss">
	header {
		position: fixed;
		inset: 0 0 auto;
		z-index: 100;
		background: var(--bg-nav);
		backdrop-filter: blur(16px);
		border-bottom: 1px solid var(--border);
	}

	nav {
		display: flex;
		align-items: center;
		height: var(--nav-height);
		gap: 1rem;
	}

	.logo {
		font-size: 1.2rem;
		font-weight: 800;
		color: var(--accent);
		letter-spacing: -0.5px;
		margin-right: auto;
		&:hover { color: var(--accent-light); }
	}

	.nav-links {
		display: flex;
		list-style: none;
		gap: 0.15rem;

		a {
			color: var(--text-muted);
			font-size: 0.875rem;
			font-weight: 500;
			padding: 0.4rem 0.7rem;
			border-radius: var(--radius-sm);
			transition: all var(--transition);
			&:hover { color: var(--text); background: var(--bg-card); }
		}

		.cms-link {
			color: var(--accent);
			&:hover { background: rgba(99, 102, 241, 0.1); }
		}
	}

	.actions {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.theme-btn {
		background: var(--bg-card);
		border: 1px solid var(--border);
		border-radius: var(--radius-sm);
		padding: 0.45rem;
		color: var(--text);
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all var(--transition);
		&:hover { border-color: var(--accent); color: var(--accent); }
	}

	.burger {
		display: none;
		flex-direction: column;
		gap: 5px;
		background: none;
		padding: 0.45rem;

		span {
			display: block;
			width: 20px;
			height: 2px;
			background: var(--text);
			border-radius: 2px;
			transition: all var(--transition);
		}
	}

	@media (max-width: 768px) {
		.burger { display: flex; }

		.nav-links {
			position: fixed;
			top: var(--nav-height);
			inset-inline: 0;
			background: var(--bg-nav);
			backdrop-filter: blur(16px);
			border-bottom: 1px solid var(--border);
			flex-direction: column;
			padding: 1rem;
			gap: 0.25rem;
			display: none;

			&.open { display: flex; }
			a { padding: 0.7rem 1rem; display: block; }
		}
	}
</style>
