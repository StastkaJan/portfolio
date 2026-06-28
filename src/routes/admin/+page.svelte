<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PortfolioData } from '$lib/types';
	import HeroEditor from '$lib/components/admin/HeroEditor.svelte';
	import AboutEditor from '$lib/components/admin/AboutEditor.svelte';
	import ExperienceEditor from '$lib/components/admin/ExperienceEditor.svelte';
	import ProjectsEditor from '$lib/components/admin/ProjectsEditor.svelte';
	import SkillsEditor from '$lib/components/admin/SkillsEditor.svelte';

	type PageData = { authenticated: boolean; data: PortfolioData };
	type ActionData = { error?: string; success?: boolean } | null;

	let { data, form }: { data: PageData; form: ActionData } = $props();

	type Tab = 'hero' | 'about' | 'experience' | 'projects' | 'skills';
	let activeTab: Tab = $state('hero');
	// svelte-ignore state_referenced_locally
	let portfolio: PortfolioData = $state(data.data);

	const tabs: { id: Tab; label: string }[] = [
		{ id: 'hero', label: 'Hero' },
		{ id: 'about', label: 'About' },
		{ id: 'experience', label: 'Experience' },
		{ id: 'projects', label: 'Projects' },
		{ id: 'skills', label: 'Skills' }
	];
</script>

<svelte:head><title>CMS — Admin</title></svelte:head>

<div class="page">
	{#if !data.authenticated}
		<div class="login-wrap">
			<div class="login-card">
				<h1>CMS Login</h1>
				<form method="POST" action="?/login" use:enhance>
					{#if form?.error}<p class="error">{form.error}</p>{/if}
					<label>
						Password
						<input type="password" name="password" autocomplete="current-password" required />
					</label>
					<button type="submit" class="btn btn-primary">Sign in</button>
				</form>
			</div>
		</div>
	{:else}
		<aside>
			<a href="/" class="back">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<polyline points="15 18 9 12 15 6"/>
				</svg>
				Portfolio
			</a>
			<h2>Content Editor</h2>
			<nav>
				{#each tabs as tab}
					<button class:active={activeTab === tab.id} onclick={() => (activeTab = tab.id)}>
						{tab.label}
					</button>
				{/each}
			</nav>
			<form method="POST" action="?/logout" use:enhance class="logout-form">
				<button type="submit">Sign out</button>
			</form>
		</aside>

		<main>
			{#if form?.success}<div class="toast">Saved successfully!</div>{/if}
			{#if form?.error}<div class="toast error">{form.error}</div>{/if}

			<form
				method="POST"
				action="?/save"
				use:enhance={() => async ({ update }) => update({ reset: false })}
			>
				<input type="hidden" name="content" value={JSON.stringify(portfolio)} />

				{#if activeTab === 'hero'}
					<HeroEditor bind:hero={portfolio.hero} />
				{:else if activeTab === 'about'}
					<AboutEditor bind:about={portfolio.about} />
				{:else if activeTab === 'experience'}
					<ExperienceEditor bind:experience={portfolio.experience} />
				{:else if activeTab === 'projects'}
					<ProjectsEditor bind:projects={portfolio.projects} />
				{:else if activeTab === 'skills'}
					<SkillsEditor bind:skills={portfolio.skills} />
				{/if}

				<div class="save-bar">
					<button type="submit" class="btn btn-primary">Save changes</button>
				</div>
			</form>
		</main>
	{/if}
</div>

<style lang="scss">
	:global(body) { background: var(--bg); color: var(--text); }

	.page { min-height: 100vh; display: flex; }

	.login-wrap { flex: 1; display: flex; align-items: center; justify-content: center; }

	.login-card {
		background: var(--bg-card);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		padding: 2.5rem;
		width: 100%;
		max-width: 360px;

		h1 { font-size: 1.4rem; font-weight: 700; margin-bottom: 1.5rem; }

		form { display: flex; flex-direction: column; gap: 1rem; }

		label {
			display: flex;
			flex-direction: column;
			gap: 0.4rem;
			font-size: 0.8rem;
			font-weight: 500;
			color: var(--text-muted);
		}

		input {
			background: var(--bg);
			border: 1px solid var(--border);
			border-radius: var(--radius-sm);
			padding: 0.6rem 0.75rem;
			color: var(--text);
			font-size: 0.875rem;
			transition: border-color var(--transition);
			width: 100%;

			&:focus { outline: none; border-color: var(--accent); }
		}
	}

	aside {
		width: 220px;
		flex-shrink: 0;
		background: var(--bg-card);
		border-right: 1px solid var(--border);
		padding: 1.5rem 1rem;
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		position: sticky;
		top: 0;
		height: 100vh;
		overflow-y: auto;

		h2 {
			font-size: 0.75rem;
			font-weight: 600;
			text-transform: uppercase;
			letter-spacing: 0.1em;
			color: var(--text-muted);
		}

		nav {
			display: flex;
			flex-direction: column;
			gap: 0.2rem;
			flex: 1;

			button {
				text-align: left;
				padding: 0.6rem 0.75rem;
				border-radius: var(--radius-sm);
				background: none;
				color: var(--text-muted);
				font-size: 0.875rem;
				font-weight: 500;
				transition: all var(--transition);
				width: 100%;

				&:hover { background: var(--bg-card-hover); color: var(--text); }
				&.active { background: rgba(99, 102, 241, 0.12); color: var(--accent); }
			}
		}
	}

	.back {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		font-size: 0.8rem;
		color: var(--text-muted);
		&:hover { color: var(--text); }
	}

	.logout-form button {
		background: none;
		color: var(--text-muted);
		font-size: 0.8rem;
		padding: 0.4rem 0.75rem;
		border-radius: var(--radius-sm);
		width: 100%;
		text-align: left;
		transition: all var(--transition);
		&:hover { color: #ef4444; background: rgba(239, 68, 68, 0.08); }
	}

	main { flex: 1; padding: 2rem; max-width: 800px; overflow-y: auto; }

	/* Shared editor styles used by child components */
	:global(.editor-section) { display: flex; flex-direction: column; gap: 1.25rem; }
	:global(.section-top) { display: flex; justify-content: space-between; align-items: center; }
	:global(.editor-section h2) { font-size: 1.2rem; font-weight: 700; }

	:global(.fields) {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}

	:global(.fields label) {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
		font-size: 0.8rem;
		font-weight: 500;
		color: var(--text-muted);

		&:global(.full) { grid-column: 1 / -1; }

		:global(small) { font-weight: 400; }

		:global(input),
		:global(textarea) {
			background: var(--bg);
			border: 1px solid var(--border);
			border-radius: var(--radius-sm);
			padding: 0.55rem 0.75rem;
			color: var(--text);
			font-size: 0.875rem;
			transition: border-color var(--transition);
			resize: vertical;

			&:focus { outline: none; border-color: var(--accent); }
		}
	}

	:global(.item-card) {
		background: var(--bg-card);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		padding: 1.25rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	:global(.item-top) {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 0.9rem;
	}

	:global(.remove) {
		background: none;
		color: var(--text-muted);
		font-size: 0.875rem;
		padding: 0.2rem 0.5rem;
		border-radius: var(--radius-sm);
		transition: all var(--transition);
		&:hover { color: #ef4444; background: rgba(239, 68, 68, 0.1); }
	}

	.save-bar {
		position: sticky;
		bottom: 0;
		padding: 1.25rem 0;
		background: var(--bg);
		border-top: 1px solid var(--border);
		margin-top: 2rem;
	}

	.toast {
		background: #22c55e;
		color: white;
		padding: 0.75rem 1rem;
		border-radius: var(--radius-sm);
		font-size: 0.875rem;
		margin-bottom: 1.5rem;
		&.error { background: #ef4444; }
	}

	.error { color: #ef4444; font-size: 0.875rem; }
</style>
