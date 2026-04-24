<script lang="ts">
	import type { Berita } from '$lib/types';
	import { ArrowRight, Calendar } from '@lucide/svelte';
	import { Newspaper } from '@lucide/svelte';

	interface Props {
		berita: Berita;
	}

	let { berita }: Props = $props();

	const dateFormatted = $derived(
		new Date(berita.tanggal).toLocaleDateString('id-ID', {
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		})
	);

	const categoryColors: Record<string, string> = {
		Kegiatan: 'badge--red',
		Program: 'badge--green',
		Pelatihan: 'badge--gold',
		Kerjasama: 'badge--green',
		Usaha: 'badge--gold'
	};
</script>

<article class="news-card">
	<div class="news-card__thumb">
		{#if berita.thumbnail}
			<img src={berita.thumbnail} alt={berita.judul} class="news-card__img" loading="lazy" />
		{:else}
			<div class="news-card__thumb-placeholder">
				<Newspaper size={32} strokeWidth={1.5} />
			</div>
		{/if}
	</div>
	<div class="news-card__body">
		<div class="news-card__meta">
			<span class="badge {categoryColors[berita.kategori] || 'badge--red'}">{berita.kategori}</span>
			<span class="news-card__date">
				<Calendar size={12} strokeWidth={2} />
				<time>{dateFormatted}</time>
			</span>
		</div>
		<h3 class="news-card__title">{berita.judul}</h3>
		<p class="news-card__excerpt">{berita.ringkasan}</p>
		<a href="/berita/{berita.id}" class="news-card__read-more">
			Baca Selengkapnya
			<ArrowRight size={16} strokeWidth={2} />
		</a>
	</div>
</article>

<style>
	.news-card {
		width: 100%;
		background: rgba(255, 250, 240, 0.94);
		border-radius: var(--radius-xl);
		border: 1px solid rgba(74, 13, 13, 0.1);
		overflow: hidden;
		display: flex;
		flex-direction: column;
		transition:
			transform var(--transition-base),
			box-shadow var(--transition-base),
			border-color var(--transition-base);
	}

	.news-card:hover {
		transform: translateY(-4px);
		box-shadow: var(--shadow-xl);
		border-color: rgba(216, 168, 78, 0.36);
	}

	.news-card__thumb {
		aspect-ratio: 16 / 9;
		overflow: hidden;
		background: var(--stage);
	}

	.news-card__img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		filter: saturate(0.9) contrast(1.04);
		transition:
			transform 0.7s cubic-bezier(0.16, 1, 0.3, 1),
			filter 0.7s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.news-card:hover .news-card__img {
		transform: scale(1.06);
		filter: saturate(1) contrast(1.08);
	}

	.news-card__thumb-placeholder {
		width: 100%;
		height: 100%;
		background: linear-gradient(135deg, var(--warm-100), var(--warm-200));
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--color-text-muted);
	}

	.news-card__body {
		padding: var(--space-5) var(--space-5) var(--space-6);
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		flex: 1;
	}

	.news-card__meta {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		flex-wrap: wrap;
	}

	.news-card__date {
		display: inline-flex;
		align-items: center;
		gap: var(--space-1);
		font-size: var(--text-xs);
		color: var(--color-text-muted);
	}

	.news-card__title {
		font-family: var(--font-display);
		font-size: var(--text-lg);
		color: var(--color-text);
		line-height: 1.2;
		display: -webkit-box;
		line-clamp: 2;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.news-card__excerpt {
		font-size: var(--text-sm);
		color: var(--color-text-secondary);
		line-height: 1.65;
		display: -webkit-box;
		line-clamp: 3;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
		flex: 1;
	}

	.news-card__read-more {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		font-size: var(--text-sm);
		font-weight: 600;
		color: var(--color-primary);
		transition:
			gap var(--transition-fast),
			color var(--transition-fast);
		margin-top: auto;
	}

	.news-card__read-more:hover {
		gap: var(--space-3);
		color: var(--red-800);
	}

	@media (max-width: 768px) {
		.news-card__body {
			padding: var(--space-4);
		}
	}

	@media (max-width: 480px) {
		.news-card__title {
			font-size: var(--text-base);
		}

		.news-card__excerpt {
			font-size: var(--text-xs);
		}
	}
</style>
