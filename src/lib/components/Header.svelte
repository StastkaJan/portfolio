<script lang="ts">
	import Menu from './icons/Menu.svelte';

	let menuOpen = $state(false);

	const links = [
		{ href: '#about', label: 'About' },
		{ href: '#experience', label: 'Experience' },
		{ href: '#projects', label: 'Projects' },
		{ href: '#skills', label: 'Skills' },
		{ href: '#languages', label: 'Languages' },
		{ href: '#contact', label: 'Contact' }
	];
</script>

<header>
	<nav class="container">
		<a href="#hero" class="logo">Jan Šťástka<span class="dot">.</span></a>

		<ul class="nav-links" class:open={menuOpen}>
			{#each links as link}
				<li>
					<a href={link.href} onclick={() => (menuOpen = false)}>{link.label}</a>
				</li>
			{/each}
		</ul>

		<button class="burger" onclick={() => (menuOpen = !menuOpen)} aria-label="Toggle menu">
			<Menu />
		</button>
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
		font-family: var(--font-display);
		font-size: 1.2rem;
		font-weight: 600;
		color: var(--text);
		letter-spacing: -0.03em;
		margin-right: auto;
		transition: color var(--transition);

		.dot { color: var(--accent); }
		&:hover { color: var(--accent); }
	}

	.nav-links {
		display: flex;
		list-style: none;
		gap: 0.15rem;

		a {
			color: var(--text-muted);
			font-size: 0.85rem;
			font-weight: 500;
			padding: 0.4rem 0.7rem;
			border-radius: var(--radius-sm);
			transition: color var(--transition);
			&:hover { color: var(--text); }
		}
	}

	.burger {
		display: none;
		align-items: center;
		justify-content: center;
		background: none;
		padding: 0.45rem;
		color: var(--text);
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
