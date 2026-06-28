<script lang="ts">
	import type { Language } from '$lib/types';
	import { intersect } from '$lib/actions/intersect';
	let { languages }: { languages: Language[] } = $props();
</script>

<section id="languages" class="reveal" use:intersect>
	<div class="container">
		<div class="section-header">
			<h2><span>Languages</span></h2>
			<p>Communication across borders</p>
		</div>

		<div class="grid">
			{#each languages as lang}
				<div class="card item">
					<span class="name">{lang.name}</span>
					<span class="level">{lang.level}</span>
				</div>
			{/each}
		</div>
	</div>
</section>

<style lang="scss">
	.grid {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 2rem;
		min-width: 220px;
	}

	.name {
		font-size: 1rem;
		font-weight: 600;
	}

	.level {
		font-size: 0.8rem;
		font-weight: 500;
		color: var(--accent);
		background: rgba(99, 102, 241, 0.1);
		padding: 0.2rem 0.6rem;
		border-radius: 99px;
	}
</style>
