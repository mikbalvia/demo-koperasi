<script lang="ts">
	import type { Berita } from '$lib/types';

	interface Props {
		berita: Berita;
	}

	let { berita }: Props = $props();

	const dateFormatted = new Date(berita.tanggal).toLocaleDateString('id-ID', {
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	});

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
		<div class="news-card__thumb-placeholder">
			<span>📰</span>
		</div>
	</div>
	<div class="news-card__body">
		<div class="news-card__meta">
			<span class="badge {categoryColors[berita.kategori] || 'badge--red'}">{berita.kategori}</span>
			<time class="news-card__date">{dateFormatted}</time>
		</div>
		<h3 class="news-card__title">{berita.judul}</h3>
		<p class="news-card__excerpt">{berita.ringkasan}</p>
		<a href="/berita/{berita.id}" class="news-card__read-more">
			Baca Selengkapnya
			<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
				<path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
			</svg>
		</a>
	</div>
</article>

<style>
	.news-card {
		background: var(--color-surface);
		border-radius: var(--radius-xl);
		border: 1px solid var(--color-border);
		overflow: hidden;
		display: flex;
		flex-direction: column;
		transition:
			transform var(--transition-base),
			box-shadow var(--transition-base);
	}

	.news-card:hover {
		transform: translateY(-4px);
		box-shadow: var(--shadow-xl);
	}

	.news-card__thumb {
		aspect-ratio: 16 / 9;
		overflow: hidden;
	}

	.news-card__thumb-placeholder {
		width: 100%;
		height: 100%;
		background: linear-gradient(135deg, var(--warm-100), var(--warm-200));
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: var(--text-3xl);
	}

	.news-card__body {
		padding: var(--space-5);
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		flex: 1;
	}

	.news-card__meta {
		display: flex;
		align-items: center;
		gap: var(--space-3);
	}

	.news-card__date {
		font-size: var(--text-xs);
		color: var(--color-text-muted);
	}

	.news-card__title {
		font-family: var(--font-display);
		font-size: var(--text-lg);
		color: var(--color-text);
		line-height: 1.3;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.news-card__excerpt {
		font-size: var(--text-sm);
		color: var(--color-text-secondary);
		line-height: 1.6;
		display: -webkit-box;
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
		transition: gap var(--transition-fast);
		margin-top: auto;
	}

	.news-card__read-more:hover {
		gap: var(--space-3);
	}
</style>
