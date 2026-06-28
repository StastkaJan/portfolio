export function getInitials(name: string): string {
	return name
		.split(' ')
		.map((n) => n[0])
		.join('')
		.toUpperCase();
}

export function formatSkills(skills: string[]): string {
	return skills.join(' · ');
}
