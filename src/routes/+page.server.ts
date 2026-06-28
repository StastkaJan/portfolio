import { readFileSync } from 'fs';
import { join } from 'path';
import type { PortfolioData } from '$lib/types';

export const load = () => {
	const portfolio = JSON.parse(
		readFileSync(join(process.cwd(), 'content', 'data.json'), 'utf-8')
	) as PortfolioData;
	return { portfolio };
};
