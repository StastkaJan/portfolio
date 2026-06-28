<script lang="ts">
	import type { PortfolioData } from '$lib/types';
	import Header from '$lib/components/Header.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import About from '$lib/components/About.svelte';
	import Experience from '$lib/components/Experience.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import Skills from '$lib/components/Skills.svelte';
	import Languages from '$lib/components/Languages.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { data }: { data: { portfolio: PortfolioData } } = $props();
	const { portfolio } = $derived(data);
</script>

<svelte:head>
	<title>{portfolio.hero.name} — {portfolio.hero.title}</title>
	<meta name="description" content={portfolio.hero.description} />
</svelte:head>

<Header />
<main>
	<Hero hero={portfolio.hero} />
	<About about={portfolio.about} />
	<Experience experience={portfolio.experience} />
	<Projects projects={portfolio.projects} />
	<Skills coreStack={portfolio.coreStack ?? []} skills={portfolio.skills} />
	<Languages languages={portfolio.languages ?? []} />
	<Contact hero={portfolio.hero} />
</main>
<Footer name={portfolio.hero.name} />
