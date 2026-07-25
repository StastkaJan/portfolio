export interface HeroData {
	name: string;
	title: string;
	subtitle: string;
	description: string;
	status: string;
	email: string;
	github: string;
	linkedin: string;
}

export interface AboutFact {
	num: string;
	label: string;
}

export interface AboutData {
	text: string;
	facts: AboutFact[];
}

export interface ExperienceItem {
	id: string;
	company: string;
	role: string;
	period: string;
	location: string;
	responsibilities: string;
	achievements: string;
	skills: string[];
}

export interface ProjectItem {
	id: string;
	title: string;
	description: string;
	tech: string[];
	date: string;
	url?: string;
	github?: string;
	image?: string;
}

export interface CoreSkill {
	name: string;
	level: number; // 1–5
}

export interface SkillGroup {
	category: string;
	items: string[];
}

export interface Language {
	name: string;
	level: string;
}

export interface PortfolioData {
	hero: HeroData;
	about: AboutData;
	experience: ExperienceItem[];
	projects: ProjectItem[];
	coreStack: CoreSkill[];
	skills: SkillGroup[];
	languages: Language[];
}
