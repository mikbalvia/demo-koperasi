<script lang="ts">
	import type { DokumenLegalitas } from '$lib/types';
	import { ScrollText, BadgeCheck, Building2, Check } from '@lucide/svelte';

	interface Props {
		dokumen: DokumenLegalitas;
	}

	let { dokumen }: Props = $props();

	const iconMap: Record<string, typeof ScrollText> = {
		'scroll-text': ScrollText,
		'badge-check': BadgeCheck,
		'building-2': Building2
	};

	const statusConfig = {
		aktif: { label: 'Aktif', class: 'badge--green' },
		terverifikasi: { label: 'Terverifikasi', class: 'badge--gold' },
		terdaftar: { label: 'Terdaftar & Sah', class: 'badge--green' }
	};

	const IconComponent = $derived(iconMap[dokumen.icon]);
</script>

<div class="legality">
	<div class="legality__header">
		<div class="legality__icon-wrap">
			{#if IconComponent}
				<IconComponent size={22} strokeWidth={1.5} />
			{/if}
		</div>
		<div>
			<h4 class="legality__name">{dokumen.nama}</h4>
			<p class="legality__desc">{dokumen.deskripsi}</p>
		</div>
	</div>
	<span class="badge {statusConfig[dokumen.status].class}">
		<Check size={12} strokeWidth={3} />
		{statusConfig[dokumen.status].label}
	</span>
</div>

<style>
	.legality {
		background: var(--color-surface);
		border-radius: var(--radius-lg);
		padding: var(--space-5);
		border: 1px solid var(--color-border);
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-4);
		transition:
			transform var(--transition-fast),
			box-shadow var(--transition-fast);
	}

	.legality:hover {
		transform: translateX(4px);
		box-shadow: var(--shadow-md);
	}

	.legality__header {
		display: flex;
		align-items: flex-start;
		gap: var(--space-3);
	}

	.legality__icon-wrap {
		width: 44px;
		height: 44px;
		min-width: 44px;
		border-radius: var(--radius-md);
		background: linear-gradient(135deg, var(--red-50), var(--gold-50));
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--color-primary);
	}

	.legality__name {
		font-family: var(--font-body);
		font-size: var(--text-sm);
		font-weight: 700;
		color: var(--color-text);
		margin-bottom: var(--space-1);
	}

	.legality__desc {
		font-size: var(--text-xs);
		color: var(--color-text-secondary);
		line-height: 1.5;
	}

	@media (max-width: 600px) {
		.legality {
			flex-direction: column;
			align-items: flex-start;
		}
	}
</style>
