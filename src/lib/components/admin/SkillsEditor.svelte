<script lang="ts">
	import type { SkillGroup } from '$lib/types';

	let { skills = $bindable() }: { skills: SkillGroup[] } = $props();

	function add() {
		skills = [...skills, { category: '', items: [] }];
	}

	function remove(i: number) {
		skills = skills.filter((_, idx) => idx !== i);
	}

	function itemsStr(items: string[]) {
		return items.join(', ');
	}

	function parseItems(s: string): string[] {
		return s.split(',').map((x) => x.trim()).filter(Boolean);
	}

	function inputVal(e: Event) {
		return (e.target as HTMLInputElement).value;
	}
</script>

<section class="editor-section">
	<div class="section-top">
		<h2>Skills</h2>
		<button type="button" class="btn btn-outline" onclick={add}>+ Add group</button>
	</div>

	{#each skills as group, i}
		<div class="item-card">
			<div class="item-top">
				<strong>{group.category || 'New group'}</strong>
				<button type="button" class="remove" onclick={() => remove(i)}>✕</button>
			</div>
			<div class="fields">
				<label>Category name<input bind:value={group.category} /></label>
				<label class="full">
					Skills <small>(comma-separated)</small>
					<input value={itemsStr(group.items)} oninput={(e) => (group.items = parseItems(inputVal(e)))} />
				</label>
			</div>
		</div>
	{/each}
</section>
