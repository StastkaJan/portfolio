<script lang="ts">
	import type { ExperienceItem } from '$lib/types';

	let { experience = $bindable() }: { experience: ExperienceItem[] } = $props();

	function add() {
		experience = [
			...experience,
			{ id: crypto.randomUUID(), company: '', role: '', period: '', location: '', description: '', skills: [] }
		];
	}

	function remove(id: string) {
		experience = experience.filter((e) => e.id !== id);
	}

	function skillsStr(exp: ExperienceItem) {
		return exp.skills.join(', ');
	}

	function parseSkills(s: string): string[] {
		return s.split(',').map((x) => x.trim()).filter(Boolean);
	}

	function inputVal(e: Event) {
		return (e.target as HTMLInputElement).value;
	}
</script>

<section class="editor-section">
	<div class="section-top">
		<h2>Experience</h2>
		<button type="button" class="btn btn-outline" onclick={add}>+ Add</button>
	</div>

	{#each experience as exp (exp.id)}
		<div class="item-card">
			<div class="item-top">
				<strong>{exp.role || 'New role'} @ {exp.company || '…'}</strong>
				<button type="button" class="remove" onclick={() => remove(exp.id)}>✕</button>
			</div>
			<div class="fields">
				<label>Role<input bind:value={exp.role} /></label>
				<label>Company<input bind:value={exp.company} /></label>
				<label>Period<input bind:value={exp.period} placeholder="2023 – 2024" /></label>
				<label>Location<input bind:value={exp.location} /></label>
				<label class="full">Description<textarea rows="3" bind:value={exp.description}></textarea></label>
				<label class="full">
					Skills <small>(comma-separated)</small>
					<input value={skillsStr(exp)} oninput={(e) => (exp.skills = parseSkills(inputVal(e)))} />
				</label>
			</div>
		</div>
	{/each}
</section>
