<script lang="ts">
	import type { ProjectItem } from '$lib/types';

	let { projects = $bindable() }: { projects: ProjectItem[] } = $props();

	function add() {
		projects = [
			...projects,
			{ id: crypto.randomUUID(), title: '', description: '', tech: [], url: '', github: '' }
		];
	}

	function remove(id: string) {
		projects = projects.filter((p) => p.id !== id);
	}

	function techStr(p: ProjectItem) {
		return p.tech.join(', ');
	}

	function parseTech(s: string): string[] {
		return s.split(',').map((x) => x.trim()).filter(Boolean);
	}

	function inputVal(e: Event) {
		return (e.target as HTMLInputElement).value;
	}
</script>

<section class="editor-section">
	<div class="section-top">
		<h2>Projects</h2>
		<button type="button" class="btn btn-outline" onclick={add}>+ Add</button>
	</div>

	{#each projects as project (project.id)}
		<div class="item-card">
			<div class="item-top">
				<strong>{project.title || 'New project'}</strong>
				<button type="button" class="remove" onclick={() => remove(project.id)}>✕</button>
			</div>
			<div class="fields">
				<label class="full">Title<input bind:value={project.title} /></label>
				<label class="full">Description<textarea rows="3" bind:value={project.description}></textarea></label>
				<label class="full">
					Tech stack <small>(comma-separated)</small>
					<input value={techStr(project)} oninput={(e) => (project.tech = parseTech(inputVal(e)))} />
				</label>
				<label>Date<input bind:value={project.date} placeholder="2024" /></label>
				<label>Live URL<input bind:value={project.url} /></label>
				<label>GitHub URL<input bind:value={project.github} /></label>
				<label>Image path<input bind:value={project.image} placeholder="/project-name.jpg" /></label>
			</div>
		</div>
	{/each}
</section>
