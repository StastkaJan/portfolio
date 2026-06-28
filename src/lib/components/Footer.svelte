<script lang="ts">
	let { name }: { name: string } = $props();
	const year = new Date().getFullYear();
</script>

<footer>
	<div class="container">
		<span>© {year} {name}</span>
	</div>
</footer>

<style lang="scss">
	footer {
		border-top: 1px solid var(--border);
		padding: 1.5rem 0;
	}

	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 0.8rem;
		color: var(--text-muted);
	}

	@media (max-width: 480px) {
		.container { flex-direction: column; gap: 0.5rem; text-align: center; }
	}
</style>
