<script lang="ts">
	import type { SkillGroup, CoreSkill } from '$lib/types';

	let { coreStack, skills }: { coreStack: CoreSkill[]; skills: SkillGroup[] } = $props();
</script>

<div class="skills">
	<div class="core">
		<p class="col-label">Core stack</p>
		<div class="core-list">
			{#each coreStack as skill}
				<div class="core-item">
					<span class="core-name">{skill.name}</span>
					<span class="bar" aria-label="{skill.level} out of 5">
						<span class="fill" style="width: {(skill.level / 5) * 100}%"></span>
					</span>
				</div>
			{/each}
		</div>
	</div>

	<div class="groups">
		{#each skills as group}
			<div class="group">
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

<style lang="scss">
	.core {
		margin-bottom: 3.5rem;
	}

	.col-label,
	h3 {
		font-family: var(--font-mono);
		font-size: 0.72rem;
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		color: var(--accent);
		margin-bottom: 1.5rem;
	}

	.core-list {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
		gap: 1.1rem 2.5rem;
	}

	.core-item {
		display: grid;
		grid-template-columns: 1fr 110px;
		align-items: center;
		gap: 1rem;
	}

	.core-name {
		font-size: 0.9rem;
		font-weight: 500;
	}

	.bar {
		height: 4px;
		background: var(--border);
		border-radius: 2px;
		overflow: hidden;
	}

	.fill {
		display: block;
		height: 100%;
		background: var(--accent);
		border-radius: 2px;
	}

	.groups {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2.5rem 3rem;
	}

	h3 {
		color: var(--text-muted);
	}

	.items {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	@media (max-width: 768px) {
		.groups { grid-template-columns: 1fr; gap: 2rem; }
	}
</style>
