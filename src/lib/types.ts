export interface HeroData {
	name: string;
	title: string;
	subtitle: string;
	description: string;
	email: string;
	github: string;
	linkedin: string;
}

export interface ExperienceItem {
	id: string;
	company: string;
	role: string;
	period: string;
	location: string;
	description: string;
	skills: string[];
}

export interface ProjectItem {
	id: string;
	title: string;
	description: string;
	tech: string[];
	date?: string;
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
	about: string;
	experience: ExperienceItem[];
	projects: ProjectItem[];
	coreStack: CoreSkill[];
	skills: SkillGroup[];
	languages: Language[];
}
