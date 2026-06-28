<script lang="ts">
	import { intersect } from '$lib/actions/intersect';
	let { about }: { about: string } = $props();
</script>

<section id="about" class="reveal" use:intersect>
	<div class="container">
		<div class="section-header">
			<h2>About <span>Me</span></h2>
			<p>A bit of context</p>
		</div>

		<div class="grid">
			<p class="text">{about}</p>

			<div class="facts">
				<div class="fact">
					<span class="num">4+</span>
					<span class="label">Years of experience</span>
				</div>
				<div class="fact">
					<span class="num">2</span>
					<span class="label">Companies worked at</span>
				</div>
				<div class="fact">
					<span class="num">2</span>
					<span class="label">Languages spoken</span>
				</div>
				<div class="fact">
					<span class="num">BSc</span>
					<span class="label">Information Technology</span>
				</div>
			</div>
		</div>
	</div>
</section>

<style lang="scss">
	.grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 4rem;
		align-items: start;
	}

	.text {
		color: var(--text-muted);
		font-size: 1.05rem;
		line-height: 1.8;
	}

	.facts {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.5rem;
	}

	.fact {
		background: var(--bg-card);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
		transition: all var(--transition);

		&:hover {
			border-color: var(--accent);
			transform: translateY(-2px);
		}
	}

	.num {
		font-size: 2rem;
		font-weight: 800;
		color: var(--accent);
		line-height: 1;
	}

	.label {
		font-size: 0.8rem;
		color: var(--text-muted);
		font-weight: 500;
	}

	@media (max-width: 768px) {
		.grid { grid-template-columns: 1fr; gap: 2rem; }
	}
</style>
