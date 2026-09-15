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
	const canonical = 'https://stastka.dev/';
	const title = $derived(`${portfolio.hero.name} — ${portfolio.hero.title}`);
	const structuredData = $derived(JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'ProfilePage',
		'@id': canonical,
		url: canonical,
		name: title,
		description: portfolio.hero.description,
		mainEntity: {
			'@type': 'Person',
			'@id': `${canonical}#person`,
			name: portfolio.hero.name,
			jobTitle: portfolio.hero.title,
			description: portfolio.hero.description,
			url: canonical,
			image: `${canonical}avatar.jpg`,
			sameAs: [portfolio.hero.github, portfolio.hero.linkedin]
		}
	}).replace(/</g, '\\u003c'));
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={portfolio.hero.description} />
	<link rel="canonical" href={canonical} />
	<meta property="og:type" content="website" />
	<meta property="og:locale" content="en_US" />
	<meta property="og:site_name" content={portfolio.hero.name} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={portfolio.hero.description} />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content={`${canonical}avatar.jpg`} />
	<meta property="og:image:width" content="800" />
	<meta property="og:image:height" content="800" />
	<meta property="og:image:alt" content={`Portrait of ${portfolio.hero.name}`} />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={portfolio.hero.description} />
	<meta name="twitter:image" content={`${canonical}avatar.jpg`} />
	<meta name="twitter:image:alt" content={`Portrait of ${portfolio.hero.name}`} />
	{@html `<script type="application/ld+json">${structuredData}</script>`}
</svelte:head>

<Header />
<main>
	<Section id="hero" reveal={false}>
		<Hero hero={portfolio.hero} />
	</Section>

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
