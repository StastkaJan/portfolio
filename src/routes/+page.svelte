<script lang="ts">
	import type { PortfolioData } from '$lib/types';
	import Header from '$lib/components/Header.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import Section from '$lib/components/Section.svelte';
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

	<Section id="about" index="01" label="About" title="A bit of context">
		<About about={portfolio.about} />
	</Section>

	<Section id="experience" index="02" label="Experience" title="Where I've been">
		<Experience experience={portfolio.experience} />
	</Section>

	<Section id="projects" index="03" label="Projects" title="Selected work">
		<Projects projects={portfolio.projects} />
	</Section>

	<Section id="skills" index="04" label="Skills" title="Tools of the trade">
		<Skills coreStack={portfolio.coreStack} skills={portfolio.skills} />
	</Section>

	<Section id="languages" index="05" label="Languages" title="Across borders">
		<Languages languages={portfolio.languages} />
	</Section>

	<Section id="contact" index="06" label="Contact" title="Let's build something together." large>
		<Contact hero={portfolio.hero} />
	</Section>
</main>
<Footer name={portfolio.hero.name} />
