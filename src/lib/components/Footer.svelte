<script lang="ts">
	let { name }: { name: string } = $props();
	const year = new Date().getFullYear();
</script>

<footer>
	<div class="container">
		<span class="mark">{name}</span>
		<span class="copy">© {year} — Built with SvelteKit</span>
	</div>
</footer>

<style lang="scss">
	footer {
		border-top: 1px solid var(--border);
		padding: 2rem 0;
	}

	.container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
	}

	.mark {
		font-family: var(--font-display);
		font-weight: 600;
		font-size: 1.05rem;
		letter-spacing: -0.02em;
		color: var(--text);
	}

	.copy {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: var(--text-muted);
		letter-spacing: 0.02em;
	}

	@media (max-width: 480px) {
		.container { flex-direction: column; gap: 0.75rem; text-align: center; }
	}
</style>
