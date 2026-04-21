<script lang="ts">
	import type { DokumenLegalitas } from '$lib/types';

	interface Props {
		dokumen: DokumenLegalitas;
	}

	let { dokumen }: Props = $props();

	const statusConfig = {
		aktif: { label: 'Aktif', class: 'badge--green' },
		terverifikasi: { label: 'Terverifikasi', class: 'badge--gold' },
		terdaftar: { label: 'Terdaftar & Sah', class: 'badge--green' }
	};
</script>

<div class="legality">
	<div class="legality__header">
		<span class="legality__icon">{dokumen.icon}</span>
		<div>
			<h4 class="legality__name">{dokumen.nama}</h4>
			<p class="legality__desc">{dokumen.deskripsi}</p>
		</div>
	</div>
	<span class="badge {statusConfig[dokumen.status].class}">
		✓ {statusConfig[dokumen.status].label}
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

	.legality__icon {
		font-size: var(--text-2xl);
		flex-shrink: 0;
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
