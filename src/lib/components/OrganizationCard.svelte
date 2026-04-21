<script lang="ts">
	import type { Pengurus } from '$lib/types';

	interface Props {
		person: Pengurus;
		category?: 'pengurus' | 'pengawas';
	}

	let { person, category = 'pengurus' }: Props = $props();

	const initials = person.nama
		.split(' ')
		.slice(0, 2)
		.map((w) => w.charAt(0))
		.join('')
		.toUpperCase();
</script>

<div class="org-card" class:pengawas={category === 'pengawas'}>
	<div class="org-card__avatar">
		{#if person.foto}
			<img src={person.foto} alt={person.nama} class="org-card__photo" />
		{:else}
			<span class="org-card__initials">{initials}</span>
		{/if}
	</div>
	<div class="org-card__info">
		<h4 class="org-card__name">{person.nama}</h4>
		<span class="org-card__role">{person.jabatan}</span>
	</div>
</div>

<style>
	.org-card {
		background: var(--color-surface);
		border-radius: var(--radius-xl);
		padding: var(--space-6);
		border: 1px solid var(--color-border);
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: var(--space-4);
		transition:
			transform var(--transition-base),
			box-shadow var(--transition-base);
	}

	.org-card:hover {
		transform: translateY(-4px);
		box-shadow: var(--shadow-lg);
	}

	.org-card__avatar {
		width: 80px;
		height: 80px;
		border-radius: 50%;
		background: linear-gradient(135deg, var(--red-600), var(--red-800));
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		box-shadow: 0 4px 14px rgba(185, 28, 28, 0.2);
		transition: transform var(--transition-spring);
	}

	.org-card:hover .org-card__avatar {
		transform: scale(1.08);
	}

	.pengawas .org-card__avatar {
		background: linear-gradient(135deg, var(--green-600), var(--green-800));
		box-shadow: 0 4px 14px rgba(4, 120, 87, 0.2);
	}

	.org-card__initials {
		font-family: var(--font-display);
		font-size: var(--text-xl);
		color: white;
	}

	.org-card__photo {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.org-card__name {
		font-family: var(--font-body);
		font-size: var(--text-sm);
		font-weight: 700;
		color: var(--color-text);
		line-height: 1.3;
	}

	.org-card__role {
		font-size: var(--text-xs);
		color: var(--color-primary);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.pengawas .org-card__role {
		color: var(--color-secondary);
	}
</style>
