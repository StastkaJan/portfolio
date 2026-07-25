<script lang="ts">
	import { intersect } from '$lib/actions/intersect';
	import type { Snippet } from 'svelte';

	let {
		id,
		index,
		label,
		title,
		large = false,
		children
	}: {
		id: string;
		index: string;
		label: string;
		title: string;
		large?: boolean;
		children: Snippet;
	} = $props();
</script>

<section {id} class="reveal" use:intersect>
	<div class="container">
		<div class="section-header" class:large>
			<span class="section-label">{index} — {label}</span>
			<h2 class="section-title">{title}</h2>
		</div>

		{@render children()}
	</div>
</section>

<style lang="scss">
	.section-header.large .section-title {
		font-size: clamp(2.2rem, 5vw, 3.4rem);
		max-width: 640px;
	}
</style>
