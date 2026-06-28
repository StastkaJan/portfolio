import { fail, redirect } from '@sveltejs/kit';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const CONTENT_PATH = join(process.cwd(), 'content', 'data.json');

function readData() {
	return JSON.parse(readFileSync(CONTENT_PATH, 'utf-8'));
}

export const load = ({ cookies }: { cookies: import('@sveltejs/kit').Cookies }) => {
	if (cookies.get('admin_session') !== 'ok') {
		return { authenticated: false, data: null };
	}
	return { authenticated: true, data: readData() };
};

export const actions = {
	login: async ({ request, cookies }: { request: Request; cookies: import('@sveltejs/kit').Cookies }) => {
		const form = await request.formData();
		const password = form.get('password') as string;

		if (password !== (process.env.ADMIN_PASSWORD ?? 'changeme')) {
			return fail(401, { error: 'Invalid password' });
		}

		cookies.set('admin_session', 'ok', {
			path: '/',
			maxAge: 60 * 60 * 24,
			httpOnly: true,
			secure: false,
			sameSite: 'strict'
		});

		redirect(303, '/admin');
	},

	logout: async ({ cookies }: { cookies: import('@sveltejs/kit').Cookies }) => {
		cookies.delete('admin_session', { path: '/' });
		redirect(303, '/admin');
	},

	save: async ({ request, cookies }: { request: Request; cookies: import('@sveltejs/kit').Cookies }) => {
		if (cookies.get('admin_session') !== 'ok') {
			return fail(401, { error: 'Unauthorized' });
		}

		const form = await request.formData();
		const raw = form.get('content') as string;

		try {
			const parsed = JSON.parse(raw);
			writeFileSync(CONTENT_PATH, JSON.stringify(parsed, null, 2));
			return { success: true };
		} catch {
			return fail(400, { error: 'Invalid JSON — check the editor and try again.' });
		}
	}
};
