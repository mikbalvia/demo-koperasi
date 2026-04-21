<script lang="ts">
	import { berita } from '$lib/data/content';
	import NewsCard from '$lib/components/NewsCard.svelte';
	import SectionHeading from '$lib/components/SectionHeading.svelte';
	import { onMount } from 'svelte';

	let activeFilter = $state('Semua');
	const categories = ['Semua', ...new Set(berita.map((b) => b.kategori))];

	let filtered = $derived(
		activeFilter === 'Semua' ? berita : berita.filter((b) => b.kategori === activeFilter)
	);

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => { entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('in-view'); }); },
			{ threshold: 0.1 }
		);
		document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el));
		return () => observer.disconnect();
	});
</script>

<svelte:head>
	<title>Berita & Informasi — KKMP Awirarangan</title>
</svelte:head>

<section class="page-header">
	<div class="page-header__bg"></div>
	<div class="container page-header__content">
		<span class="badge badge--gold">📰 Warta Koperasi</span>
		<h1 class="page-header__title">Berita & Informasi</h1>
		<p class="page-header__subtitle">Ikuti kegiatan dan pengumuman terbaru dari Koperasi Merah Putih Awirarangan.</p>
	</div>
</section>

<section class="section">
	<div class="container">
		<!-- Filter -->
		<div class="filter-bar">
			{#each categories as cat}
				<button
					class="filter-btn"
					class:active={activeFilter === cat}
					onclick={() => (activeFilter = cat)}
				>
					{cat}
				</button>
			{/each}
		</div>

		<!-- Grid -->
		{#if filtered.length > 0}
			<div class="news-grid">
				{#each filtered as item (item.id)}
					<div class="animate-on-scroll">
						<NewsCard berita={item} />
					</div>
				{/each}
			</div>
		{:else}
			<div class="empty">
				<p>Belum ada berita dalam kategori ini.</p>
			</div>
		{/if}
	</div>
</section>

<style>
	.page-header { position: relative; padding: 140px 0 var(--space-16); overflow: hidden; }
	.page-header__bg { position: absolute; inset: 0; background: linear-gradient(150deg, var(--red-800), var(--red-900), var(--warm-900)); }
	.page-header__content { position: relative; z-index: 1; text-align: center; }
	.page-header__title { font-size: var(--text-5xl); color: white; margin: var(--space-4) 0; }
	.page-header__subtitle { font-size: var(--text-lg); color: rgba(255,255,255,0.7); max-width: 500px; margin: 0 auto; }

	.filter-bar { display: flex; gap: var(--space-2); justify-content: center; margin-bottom: var(--space-10); flex-wrap: wrap; }
	.filter-btn { padding: var(--space-2) var(--space-5); border-radius: var(--radius-full); font-size: var(--text-sm); font-weight: 600; color: var(--color-text-secondary); background: var(--color-bg-alt); border: 1px solid var(--color-border); transition: all var(--transition-fast); }
	.filter-btn:hover { border-color: var(--color-primary); color: var(--color-primary); }
	.filter-btn.active { background: var(--color-primary); color: white; border-color: var(--color-primary); }

	.news-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-6); }
	.empty { text-align: center; padding: var(--space-16); color: var(--color-text-muted); }

	@media (max-width: 960px) { .news-grid { grid-template-columns: repeat(2, 1fr); } }
	@media (max-width: 600px) { .news-grid { grid-template-columns: 1fr; } }
</style>
