<script lang="ts">
	import type { Pengurus } from '$lib/types';

	interface Props {
		person: Pengurus;
		category?: 'pengurus' | 'pengawas';
	}

	let { person, category = 'pengurus' }: Props = $props();

	const initials = $derived(person.nama
		.split(' ')
		.slice(0, 2)
		.map((w) => w.charAt(0))
		.join('')
		.toUpperCase());
</script>

<div class="org-card glass" class:pengawas={category === 'pengawas'}>
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
		width: 100%;
		padding: var(--space-6);
		border-radius: var(--radius-xl);
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: var(--space-4);
		transition:
			transform var(--transition-bouncy),
			box-shadow var(--transition-base),
			border-color var(--transition-base);
	}

	.org-card:hover {
		transform: translateY(-5px);
		box-shadow: var(--shadow-xl);
		border-color: rgba(179, 32, 37, 0.2);
	}

	.pengawas:hover {
		border-color: var(--color-secondary-light);
	}

	.org-card__avatar {
		width: 80px;
		height: 80px;
		border-radius: var(--radius-lg);
		background: var(--deep-red);
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		box-shadow: 0 16px 30px rgba(74, 13, 13, 0.18);
		transition: transform var(--transition-spring);
	}

	.org-card:hover .org-card__avatar {
		transform: scale(1.08);
	}

	.pengawas .org-card__avatar {
		background: var(--heritage-green);
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
		letter-spacing: 0;
	}

	.pengawas .org-card__role {
		color: var(--color-secondary);
	}

	@media (max-width: 768px) {
		.org-card {
			padding: var(--space-5);
			gap: var(--space-3);
		}

		.org-card__avatar {
			width: 72px;
			height: 72px;
		}
	}

	@media (max-width: 480px) {
		.org-card {
			padding: var(--space-4);
		}

		.org-card__avatar {
			width: 64px;
			height: 64px;
		}

		.org-card__name {
			font-size: var(--text-xs);
		}
	}
</style>
