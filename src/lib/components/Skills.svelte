<script lang="ts">
	import type { SkillGroup, CoreSkill } from '$lib/types';
	import { intersect } from '$lib/actions/intersect';

	let { coreStack = [], skills = [] }: { coreStack: CoreSkill[]; skills: SkillGroup[] } = $props();
</script>

<section id="skills" class="reveal" use:intersect>
	<div class="container">
		<div class="section-header">
			<h2>Skills &amp; <span>Technologies</span></h2>
			<p>What I work with</p>
		</div>

		{#if coreStack.length}
			<div class="core">
				<p class="core-label">Core Stack</p>
				<div class="core-grid">
					{#each coreStack as skill}
						<div class="core-item">
							<span class="core-name">{skill.name}</span>
							<span class="dots" aria-label="{skill.level} out of 5">
								{#each { length: 5 } as _, i}
									<span class="dot" class:filled={i < skill.level}></span>
								{/each}
							</span>
						</div>
					{/each}
				</div>
			</div>
		{/if}

		<div class="grid">
			{#each skills as group}
				<div class="group card">
					<h3>{group.category}</h3>
					<div class="items">
						{#each group.items as item}
							<span class="tag">{item}</span>
						{/each}
					</div>
				</div>
			{/each}
		</div>

	</div>
</section>

<style lang="scss">
	/* Core stack */
	.core {
		background: linear-gradient(135deg, rgba(99, 102, 241, 0.08), rgba(168, 85, 247, 0.06));
		border: 1px solid rgba(99, 102, 241, 0.25);
		border-radius: var(--radius);
		padding: 2rem;
		margin-bottom: 2rem;
	}

	.core-label {
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--accent);
		margin-bottom: 1.25rem;
	}

	.core-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
		gap: 1rem;
	}

	.core-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		background: var(--bg-card);
		border: 1px solid var(--border);
		border-radius: var(--radius-sm);
		padding: 0.65rem 0.9rem;
		transition: all var(--transition);

		&:hover {
			border-color: var(--accent);
			transform: translateY(-1px);
		}
	}

	.core-name {
		font-size: 0.875rem;
		font-weight: 600;
	}

	.dots {
		display: flex;
		gap: 4px;
		flex-shrink: 0;
	}

	.dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: var(--border);
		transition: background var(--transition);

		&.filled {
			background: var(--accent);
			box-shadow: 0 0 6px rgba(99, 102, 241, 0.5);
		}
	}

	/* Other groups */
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
		gap: 1.25rem;
		margin-bottom: 1.25rem;
	}

	.group {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	h3 {
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--text-muted);
	}

	.items {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}
</style>
