<script lang="ts">
	import { profil, statistik, layanan, pengawas, pengurus, berita, dokumenLegalitas } from '$lib/data/content';
	import SectionHeading from '$lib/components/SectionHeading.svelte';
	import StatCard from '$lib/components/StatCard.svelte';
	import ServiceCard from '$lib/components/ServiceCard.svelte';
	import OrganizationCard from '$lib/components/OrganizationCard.svelte';
	import NewsCard from '$lib/components/NewsCard.svelte';
	import LegalityBadge from '$lib/components/LegalityBadge.svelte';
	import { onMount } from 'svelte';
	import { ArrowRight, Target, Rocket, BookOpen, Sparkles, Mail, ChevronDown } from '@lucide/svelte';

	let heroVisible = $state(false);

	const beritaTerbaru = [...berita]
		.sort((a, b) => new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime())
		.slice(0, 4);

	onMount(() => {
		heroVisible = true;

		// Animate elements on scroll
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('in-view');
					}
				});
			},
			{ threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
		);

		const elements = document.querySelectorAll('.animate-on-scroll');
		elements.forEach((el) => observer.observe(el));

		return () => observer.disconnect();
	});
</script>

<svelte:head>
	<title>Koperasi Kelurahan Merah Putih Karang Tengah</title>
	<meta
		name="description"
		content="Koperasi Kelurahan Merah Putih Karang Tengah — Membangun Ekonomi Kerakyatan Berbasis Gotong Royong"
	/>
</svelte:head>

<!-- ===== HERO ===== -->
<section class="hero" id="hero">
	<div class="hero__bg">
		<img src="/images/hero-bg.png" alt="" class="hero__bg-img" />
		<div class="hero__wash"></div>
		<div class="hero__pattern"></div>
		<div class="hero__frame-lines"></div>
		<div class="hero__matte"></div>
	</div>

	<div class="container hero__content" class:visible={heroVisible}>
		<div class="hero__copy">
			<div class="hero__badge">
				<span class="badge badge--gold"><Sparkles size={12} strokeWidth={2} /> Program Kementerian Koperasi RI</span>
			</div>
			<h1 class="hero__title">
				<span>Koperasi Kelurahan</span>
				<span class="hero__title-accent">Merah Putih</span>
				<span>Karang Tengah</span>
			</h1>
			<p class="hero__subtitle">
				Membangun ekonomi kerakyatan berbasis gotong royong untuk kesejahteraan anggota dan masyarakat Kelurahan Karang Tengah.
			</p>
			<div class="hero__actions">
				<a href="/register" class="btn btn--primary btn--lg">
					Daftar Menjadi Anggota
					<ArrowRight size={18} strokeWidth={2} />
				</a>
				<a href="#profil" class="btn btn--secondary btn--lg">
					Pelajari Lebih Lanjut
					<ChevronDown size={18} strokeWidth={2} />
				</a>
			</div>
		</div>

		<aside class="hero__scene" aria-label="Cuplikan visual Koperasi Karang Tengah">
			<div class="hero__scene-image">
				<img src="/images/about-koperasi.png" alt="Kegiatan dan layanan Koperasi Karang Tengah" />
			</div>
			<div class="hero__scene-caption">
				<span class="hero__scene-kicker">Dokumenter warga</span>
				<strong>Gotong royong yang bergerak menjadi layanan nyata.</strong>
			</div>
			<div class="hero__scene-meta">
				<span>Karang Tengah</span>
				<span>2026</span>
			</div>
		</aside>
	</div>

	<!-- Stats floating overlapping hero and next section -->
	<div class="hero__stats-wrapper container">
		<div class="hero__stats-grid">
			{#each statistik as stat, i}
				<StatCard {stat} delay={i * 150} />
			{/each}
		</div>
	</div>
</section>

<!-- ===== PROFIL ===== -->
<section class="section pattern-bg" id="profil">
	<div class="container">
		<div class="animate-on-scroll">
			<SectionHeading title="Profil Koperasi" subtitle="Visi, Misi, dan Sejarah singkat Koperasi Kelurahan Merah Putih Karang Tengah." />
		</div>

		<div class="bento-grid profil-bento">
			<!-- Sejarah -->
			<div class="bento-item bento-item--glow profil-sejarah animate-on-scroll delay-1">
				<div class="bento-image-bg">
					<img src="/images/about-koperasi.png" alt="Toko Koperasi" loading="lazy" />
					<div class="bento-image-overlay"></div>
				</div>
				<div class="bento-content profil-sejarah__content">
					<div class="profil-card__icon-wrap glass"><BookOpen size={24} strokeWidth={1.5} /></div>
					<div class="profil-card__story">
						<span class="profil-card__eyebrow text-white-70">Tentang koperasi</span>
						<h3 class="profil-card__title text-white">Sejarah Singkat</h3>
						<p class="profil-card__text text-white-70">{profil.sejarah}</p>
					</div>
				</div>
			</div>

			<!-- Visi -->
			<div class="bento-item bento-item--glow profil-visi animate-on-scroll delay-2">
				<div class="profil-card__icon-wrap"><Target size={24} strokeWidth={1.5} /></div>
				<h3 class="profil-card__title">Visi</h3>
				<p class="profil-card__text">{profil.visi}</p>
			</div>

			<!-- Misi -->
			<div class="bento-item bento-item--glow profil-misi animate-on-scroll delay-3">
				<div class="profil-card__icon-wrap"><Rocket size={24} strokeWidth={1.5} /></div>
				<h3 class="profil-card__title">Misi</h3>
				<ol class="profil-card__list">
					{#each profil.misi as item}
						<li>{item}</li>
					{/each}
				</ol>
			</div>
		</div>
	</div>
</section>

<!-- ===== LAYANAN ===== -->
<section class="section section--alt" id="layanan">
	<div class="container">
		<div class="animate-on-scroll">
			<SectionHeading
				title="Pilar Layanan Koperasi"
				subtitle="Tiga pilar utama yang memberikan manfaat strategis bagi seluruh anggota dan masyarakat."
			/>
		</div>

		<div class="layanan-grid">
			{#each layanan as item, i}
				<div class="animate-on-scroll delay-{i + 1}">
					<ServiceCard index={i} layanan={item} />
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ===== ORGANISASI ===== -->
<section class="section pattern-bg" id="organisasi">
	<div class="container">
		<div class="animate-on-scroll">
			<SectionHeading
				title="Struktur Organisasi"
				subtitle="Tim yang berdedikasi untuk memajukan koperasi dan kesejahteraan anggota."
			/>
		</div>

		<!-- Pengawas -->
		<div class="org-section animate-on-scroll">
			<h3 class="org-section__title">
				<span class="org-section__badge org-section__badge--green">Badan Pengawas</span>
			</h3>
			<div class="org-grid org-grid--3">
				{#each pengawas as person}
					<OrganizationCard {person} category="pengawas" />
				{/each}
			</div>
		</div>

		<!-- Pengurus -->
		<div class="org-section animate-on-scroll">
			<h3 class="org-section__title">
				<span class="org-section__badge org-section__badge--red">Badan Pengurus</span>
			</h3>
			<div class="org-grid org-grid--5">
				{#each pengurus as person}
					<OrganizationCard {person} category="pengurus" />
				{/each}
			</div>
		</div>
	</div>
</section>

<!-- ===== BERITA ===== -->
<section class="section section--alt" id="berita-home">
	<div class="container">
		<div class="animate-on-scroll">
			<SectionHeading
				title="Berita Terbaru"
				subtitle="Ikuti kabar terbaru kegiatan, program, dan perkembangan koperasi untuk menambah konteks informasi anggota."
			/>
		</div>

		<div class="berita-grid">
			{#each beritaTerbaru as item, i}
				<div class="animate-on-scroll delay-{i + 1}">
					<NewsCard berita={item} />
				</div>
			{/each}
		</div>

		<div class="berita-more animate-on-scroll">
			<a href="/berita" class="btn btn--outline btn--lg">
				Lihat Semua Berita
				<ArrowRight size={18} strokeWidth={2} />
			</a>
		</div>
	</div>
</section>

<!-- ===== KEPERCAYAAN & LEGALITAS ===== -->
<section class="section section--dark trust-section" id="legalitas">
	<div class="trust-section__pattern"></div>
	<div class="container relative-z">
		<div class="animate-on-scroll">
			<SectionHeading
				title="Kepercayaan & Legalitas"
				subtitle="Informasi resmi badan hukum dan dokumen legalitas Koperasi Kelurahan Merah Putih Karang Tengah."
				light
			/>
		</div>

		<div class="trust-grid">
			<div class="trust-identitas animate-on-scroll delay-1">
				<div class="glass-dark trust-card">
					<h3 class="trust-card__title">Identitas Resmi</h3>
					<div class="identitas-list">
						<div class="identitas-item">
							<span class="identitas-label">Nama Resmi</span>
							<span class="identitas-value">{profil.namaResmi}</span>
						</div>
						<div class="identitas-item">
							<span class="identitas-label">Bentuk Usaha</span>
							<span class="identitas-value">{profil.bentukUsaha}</span>
						</div>
						<div class="identitas-item">
							<span class="identitas-label">Jenis Koperasi</span>
							<span class="identitas-value">{profil.jenisKoperasi}</span>
						</div>
						<div class="identitas-item">
							<span class="identitas-label">Nomor Induk Koperasi (NIK)</span>
							<span class="identitas-value identitas-value--mono">{profil.nik}</span>
						</div>
						<div class="identitas-item identitas-item--full">
							<span class="identitas-label">Alamat Lengkap</span>
							<span class="identitas-value">{profil.alamat}</span>
						</div>
					</div>
				</div>
			</div>

			<div class="trust-legalitas animate-on-scroll delay-2">
				<h3 class="trust-card__title text-center mb-6">Dokumen Legalitas</h3>
				<div class="legalitas-list">
					{#each dokumenLegalitas as doc}
						<LegalityBadge dokumen={doc} />
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>

<!-- ===== CTA ===== -->
<section class="cta-section">
	<div class="cta-section__bg">
		<div class="cta-section__gradient"></div>
		<div class="cta-section__pattern"></div>
	</div>
	<div class="container cta-section__content animate-on-scroll">
		<h2 class="cta-section__title">Bergabunglah Bersama Kami</h2>
		<p class="cta-section__text">
			Jadilah bagian dari gerakan ekonomi kerakyatan. Daftar menjadi anggota koperasi dan nikmati berbagai manfaat untuk kesejahteraan keluarga Anda.
		</p>
		<div class="cta-section__actions">
			<a href="/register" class="btn btn--primary btn--lg">
				Daftar Sekarang
				<ArrowRight size={18} strokeWidth={2} />
			</a>
			<a href="mailto:{profil.email}" class="btn btn--secondary btn--lg">
				<Mail size={18} strokeWidth={2} />
				Hubungi Kami
			</a>
		</div>
	</div>
</section>

<style>
	/* ===== HERO ===== */
	.hero {
		position: relative;
		min-height: min(860px, 92dvh);
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding-top: 144px;
		padding-bottom: var(--space-24);
		margin-bottom: var(--space-20);
		background: var(--stage);
		isolation: isolate;
	}

	.hero__bg {
		position: absolute;
		inset: 0 0 -72px;
		z-index: 0;
		overflow: hidden;
		background: var(--stage);
		box-shadow: 0 40px 90px rgba(18, 15, 13, 0.35);
	}

	.hero__bg-img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		z-index: 0;
		opacity: 0.82;
		filter: saturate(0.82) contrast(1.08);
		transform: scale(1.04);
		animation: cinematicPush 18s ease-in-out infinite alternate;
	}

	.hero__wash {
		position: absolute;
		inset: 0;
		background:
			linear-gradient(90deg, rgba(18, 15, 13, 0.96) 0%, rgba(74, 13, 13, 0.9) 42%, rgba(18, 15, 13, 0.42) 72%, rgba(18, 15, 13, 0.8) 100%),
			linear-gradient(180deg, rgba(18, 15, 13, 0.72) 0%, rgba(18, 15, 13, 0.1) 44%, rgba(18, 15, 13, 0.9) 100%);
		z-index: 1;
	}

	.hero__pattern {
		position: absolute;
		inset: 0;
		z-index: 2;
		opacity: 0.18;
		background-image:
			linear-gradient(rgba(255, 248, 234, 0.08) 1px, rgba(255, 248, 234, 0) 1px),
			linear-gradient(90deg, rgba(255, 248, 234, 0.08) 1px, rgba(255, 248, 234, 0) 1px);
		background-size: 96px 96px;
		mask-image: linear-gradient(90deg, black, transparent 78%);
	}

	.hero__frame-lines {
		position: absolute;
		inset: 0;
		z-index: 3;
		pointer-events: none;
	}

	.hero__frame-lines::before,
	.hero__frame-lines::after {
		content: '';
		position: absolute;
		left: var(--container-padding);
		right: var(--container-padding);
		height: 1px;
		background: linear-gradient(90deg, rgba(216, 168, 78, 0), rgba(216, 168, 78, 0.52), rgba(216, 168, 78, 0));
	}

	.hero__frame-lines::before {
		top: 112px;
	}

	.hero__frame-lines::after {
		bottom: 112px;
	}

	.hero__matte {
		position: absolute;
		inset: 0;
		z-index: 4;
		pointer-events: none;
		background:
			linear-gradient(180deg, rgba(18, 15, 13, 0.92) 0 34px, rgba(18, 15, 13, 0) 34px calc(100% - 34px), rgba(18, 15, 13, 0.9) calc(100% - 34px)),
			linear-gradient(90deg, rgba(18, 15, 13, 0.58), rgba(18, 15, 13, 0) 14%, rgba(18, 15, 13, 0) 86%, rgba(18, 15, 13, 0.58));
	}

	.hero__content {
		position: relative;
		z-index: 5;
		display: grid;
		grid-template-columns: minmax(0, 1.05fr) minmax(320px, 0.68fr);
		align-items: center;
		gap: var(--space-16);
	}

	.hero__copy {
		max-width: 760px;
	}

	.hero__badge {
		margin-bottom: var(--space-6);
		opacity: 0;
		transform: translateX(-24px);
		transition:
			opacity 0.72s cubic-bezier(0.16, 1, 0.3, 1) 0.18s,
			transform 0.72s cubic-bezier(0.16, 1, 0.3, 1) 0.18s;
	}

	.hero__content.visible .hero__badge {
		opacity: 1;
		transform: translateX(0);
	}

	.hero__title {
		font-size: 4.6rem;
		color: var(--paper-warm);
		margin-bottom: var(--space-6);
		line-height: 0.98;
		text-shadow: 0 18px 48px rgba(0, 0, 0, 0.28);
	}

	.hero__title span {
		display: block;
		opacity: 0;
		transform: translateY(34px);
		transition:
			opacity 0.86s cubic-bezier(0.16, 1, 0.3, 1),
			transform 0.86s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.hero__title span:nth-child(1) {
		transition-delay: 0.28s;
	}

	.hero__title span:nth-child(2) {
		transition-delay: 0.4s;
	}

	.hero__title span:nth-child(3) {
		transition-delay: 0.52s;
	}

	.hero__content.visible .hero__title span {
		opacity: 1;
		transform: translateY(0);
	}

	.hero__title-accent {
		color: var(--gold-300);
		font-style: italic;
	}

	.hero__subtitle {
		font-size: var(--text-lg);
		color: rgba(255, 248, 234, 0.8);
		max-width: 620px;
		margin: 0 0 var(--space-8);
		line-height: 1.75;
		opacity: 0;
		transform: translateY(22px);
		text-wrap: pretty;
		transition:
			opacity 0.78s cubic-bezier(0.2, 0, 0.2, 1) 0.68s,
			transform 0.78s cubic-bezier(0.2, 0, 0.2, 1) 0.68s;
	}

	.hero__content.visible .hero__subtitle {
		opacity: 1;
		transform: translateY(0);
	}

	.hero__actions {
		display: flex;
		gap: var(--space-4);
		flex-wrap: wrap;
		opacity: 0;
		transform: translateY(18px);
		transition:
			opacity 0.72s cubic-bezier(0.16, 1, 0.3, 1) 0.82s,
			transform 0.72s cubic-bezier(0.16, 1, 0.3, 1) 0.82s;
	}

	.hero__content.visible .hero__actions {
		opacity: 1;
		transform: translateY(0);
	}

	.hero__scene {
		position: relative;
		min-height: 500px;
		border: 1px solid rgba(255, 248, 234, 0.22);
		border-radius: var(--radius-xl);
		overflow: hidden;
		background: rgba(18, 15, 13, 0.72);
		box-shadow: 0 30px 70px rgba(0, 0, 0, 0.38);
		opacity: 0;
		transform: translateX(36px) scale(0.985);
		transition:
			opacity 0.86s cubic-bezier(0.16, 1, 0.3, 1) 0.58s,
			transform 0.86s cubic-bezier(0.16, 1, 0.3, 1) 0.58s;
	}

	.hero__content.visible .hero__scene {
		opacity: 1;
		transform: translateX(0) scale(1);
	}

	.hero__scene::before {
		content: '';
		position: absolute;
		inset: 16px;
		z-index: 2;
		border: 1px solid rgba(255, 248, 234, 0.24);
		pointer-events: none;
	}

	.hero__scene-image {
		position: absolute;
		inset: 0;
	}

	.hero__scene-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		filter: saturate(0.78) contrast(1.05);
		transform: scale(1.02);
	}

	.hero__scene-image::after {
		content: '';
		position: absolute;
		inset: 0;
		background:
			linear-gradient(180deg, rgba(18, 15, 13, 0.16), rgba(18, 15, 13, 0.88)),
			linear-gradient(90deg, rgba(74, 13, 13, 0.44), rgba(74, 13, 13, 0));
	}

	.hero__scene-caption {
		position: absolute;
		left: var(--space-8);
		right: var(--space-8);
		bottom: var(--space-8);
		z-index: 3;
		color: var(--paper-warm);
	}

	.hero__scene-kicker,
	.hero__scene-meta {
		font-family: var(--font-body);
		font-size: var(--text-xs);
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0;
		color: var(--gold-300);
	}

	.hero__scene-caption strong {
		display: block;
		margin-top: var(--space-3);
		max-width: 26rem;
		font-family: var(--font-display);
		font-size: var(--text-3xl);
		font-weight: 650;
		line-height: 1.08;
	}

	.hero__scene-meta {
		position: absolute;
		top: var(--space-8);
		left: var(--space-8);
		right: var(--space-8);
		z-index: 3;
		display: flex;
		justify-content: space-between;
		color: rgba(255, 248, 234, 0.78);
	}

	.hero__stats-wrapper {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 10;
		transform: translateY(58%);
	}

	.hero__stats-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: var(--space-4);
	}

	@keyframes cinematicPush {
		from {
			transform: scale(1.04) translate3d(0, 0, 0);
		}
		to {
			transform: scale(1.09) translate3d(-1.5%, -1%, 0);
		}
	}

	/* ===== PROFIL (BENTO) ===== */
	.profil-bento {
		margin-top: var(--space-8);
	}

	.profil-sejarah {
		grid-column: span 7;
		grid-row: span 2;
		padding: 0;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		min-height: 450px;
	}

	.profil-visi {
		grid-column: span 5;
	}

	.profil-misi {
		grid-column: span 5;
	}

	.bento-image-bg {
		position: absolute;
		inset: 0;
		z-index: 0;
	}

	.bento-image-bg img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.bento-image-overlay {
		position: absolute;
		inset: 0;
		background:
			linear-gradient(180deg, rgba(18, 15, 13, 0.1) 0%, rgba(18, 15, 13, 0.48) 46%, rgba(18, 15, 13, 0.94) 100%),
			linear-gradient(120deg, rgba(179, 32, 37, 0.34), rgba(179, 32, 37, 0) 48%);
	}

	.bento-content {
		position: relative;
		z-index: 1;
		padding: var(--space-8);
	}

	.profil-sejarah__content {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		gap: var(--space-4);
		height: 100%;
	}

	.profil-card__story {
		max-width: 34rem;
		padding: var(--space-5);
		border-radius: var(--radius-xl);
		background: linear-gradient(180deg, rgba(18, 15, 13, 0.42), rgba(18, 15, 13, 0.72));
		border: 1px solid rgba(255, 248, 234, 0.14);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		box-shadow: 0 18px 48px rgba(18, 15, 13, 0.22);
	}

	.profil-card__eyebrow {
		display: inline-flex;
		align-items: center;
		font-size: var(--text-xs);
		font-weight: 700;
		letter-spacing: 0;
		text-transform: uppercase;
		margin-bottom: var(--space-2);
	}

	.text-white { color: white !important; }
	.text-white-70 { color: rgba(255, 255, 255, 0.78) !important; }

	.profil-card__icon-wrap {
		width: 52px;
		height: 52px;
		border-radius: var(--radius-lg);
		background: var(--paper-warm);
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--color-primary);
		margin-bottom: var(--space-4);
		border: 1px solid rgba(74, 13, 13, 0.12);
	}

	.profil-card__title {
		font-size: var(--text-2xl);
		margin-bottom: var(--space-3);
		color: var(--color-text);
	}

	.profil-card__text {
		font-size: var(--text-sm);
		color: var(--color-text-secondary);
		line-height: 1.8;
	}

	.profil-card__list {
		counter-reset: misi;
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
	}

	.profil-card__list li {
		counter-increment: misi;
		font-size: var(--text-sm);
		color: var(--color-text-secondary);
		line-height: 1.7;
		padding-left: var(--space-8);
		position: relative;
	}

	.profil-card__list li::before {
		content: counter(misi);
		position: absolute;
		left: 0;
		top: 0;
		width: 24px;
		height: 24px;
		border-radius: 50%;
		background: linear-gradient(135deg, var(--red-600), var(--red-700));
		color: white;
		font-size: var(--text-xs);
		font-weight: 700;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	/* ===== LAYANAN ===== */
	.layanan-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--space-6);
	}

	/* ===== ORGANISASI ===== */
	.org-section {
		margin-bottom: var(--space-12);
	}

	.org-section:last-child {
		margin-bottom: 0;
	}

	.org-section__title {
		text-align: center;
		margin-bottom: var(--space-8);
	}

	.org-section__badge {
		display: inline-block;
		font-family: var(--font-body);
		font-size: var(--text-sm);
		font-weight: 700;
		padding: var(--space-2) var(--space-5);
		border-radius: var(--radius-md);
		letter-spacing: 0;
		text-transform: uppercase;
	}

	.org-section__badge--green {
		background: var(--green-100);
		color: var(--green-800);
	}

	.org-section__badge--red {
		background: var(--red-100);
		color: var(--red-800);
	}

	.org-grid {
		display: grid;
		gap: var(--space-4);
		justify-items: center;
	}

	.org-grid--3 {
		grid-template-columns: repeat(3, 1fr);
		max-width: 700px;
		margin: 0 auto;
	}

	.org-grid--5 {
		grid-template-columns: repeat(5, 1fr);
	}

	/* ===== KEPERCAYAAN & LEGALITAS (Dark Section) ===== */
	.section--dark {
		background:
			linear-gradient(120deg, rgba(74, 13, 13, 0.38), rgba(74, 13, 13, 0) 48%),
			linear-gradient(180deg, var(--warm-800), var(--warm-900));
		color: white;
		position: relative;
		overflow: hidden;
	}

	.trust-section__pattern {
		position: absolute;
		inset: 0;
		opacity: 0.05;
		background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
	}

	.relative-z {
		position: relative;
		z-index: 1;
	}

	.trust-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--space-8);
		align-items: flex-start;
	}

	.trust-card {
		padding: var(--space-8);
		border-radius: var(--radius-2xl);
	}

	.trust-card__title {
		font-size: var(--text-2xl);
		margin-bottom: var(--space-6);
		color: var(--gold-300);
	}

	.mb-6 { margin-bottom: var(--space-6); }
	.text-center { text-align: center; }

	.identitas-list {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
	}

	.identitas-item {
		display: flex;
		flex-direction: column;
		padding-bottom: var(--space-4);
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	}

	.identitas-item:last-child {
		border-bottom: none;
		padding-bottom: 0;
	}

	.identitas-label {
		display: block;
		font-size: var(--text-xs);
		color: rgba(255, 255, 255, 0.5);
		text-transform: uppercase;
		letter-spacing: 0;
		font-weight: 600;
		margin-bottom: var(--space-1);
	}

	.identitas-value {
		font-size: var(--text-base);
		color: white;
		font-weight: 500;
	}

	.identitas-value--mono {
		font-family: 'SF Mono', 'Fira Code', monospace;
		font-size: var(--text-lg);
		letter-spacing: 0;
		color: var(--gold-400);
	}

	.legalitas-list {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
	}

	/* ===== BERITA ===== */
	.berita-grid {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: var(--space-6);
	}

	.berita-more {
		text-align: center;
		margin-top: var(--space-10);
	}

	/* ===== CTA ===== */
	.cta-section {
		position: relative;
		padding: var(--space-32) 0;
		overflow: hidden;
		background: var(--stage);
	}

	.cta-section__bg {
		position: absolute;
		inset: 0;
	}

	.cta-section__gradient {
		position: absolute;
		inset: 0;
		background:
			linear-gradient(90deg, rgba(18, 15, 13, 0.98), rgba(74, 13, 13, 0.88) 48%, rgba(18, 15, 13, 0.96)),
			linear-gradient(180deg, rgba(216, 168, 78, 0.12), rgba(216, 168, 78, 0));
	}

	.cta-section__pattern {
		position: absolute;
		inset: 0;
		opacity: 0.04;
		background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
	}

	.cta-section__content {
		position: relative;
		z-index: 1;
		text-align: center;
		max-width: 920px;
	}

	.cta-section__title {
		font-size: var(--text-4xl);
		color: white;
		margin-bottom: var(--space-4);
	}

	.cta-section__text {
		font-size: var(--text-lg);
		color: rgba(255, 248, 234, 0.76);
		max-width: 550px;
		margin: 0 auto var(--space-8);
		line-height: 1.7;
	}

	.cta-section__actions {
		display: flex;
		gap: var(--space-4);
		justify-content: center;
		flex-wrap: wrap;
	}

	/* ===== RESPONSIVE ===== */
	@media (max-width: 1100px) {
		.hero {
			padding-top: 130px;
		}

		.hero__content {
			gap: var(--space-10);
			grid-template-columns: minmax(0, 1fr) minmax(300px, 0.62fr);
		}

		.hero__title {
			font-size: 4rem;
		}

		.hero__stats-grid {
			gap: var(--space-3);
		}

		.profil-sejarah {
			grid-column: span 12;
			min-height: 420px;
		}

		.profil-visi,
		.profil-misi {
			grid-column: span 6;
		}

		.layanan-grid {
			gap: var(--space-4);
		}

		.berita-grid {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}

		.org-grid--5 {
			grid-template-columns: repeat(4, 1fr);
		}
	}

	@media (max-width: 960px) {
		.hero {
			min-height: auto;
			padding-top: 112px;
			padding-bottom: var(--space-16);
			margin-bottom: 0;
		}

		.hero__bg {
			inset: 0;
		}

		.hero__frame-lines::before {
			top: 92px;
		}

		.hero__frame-lines::after {
			bottom: 80px;
		}

		.hero__content {
			grid-template-columns: 1fr;
			gap: var(--space-8);
		}

		.hero__title {
			font-size: 3.5rem;
		}

		.hero__scene {
			min-height: 360px;
			max-width: 620px;
		}

		.hero__stats-wrapper {
			position: relative;
			transform: none;
			margin-top: var(--space-8);
		}

		.hero__stats-grid {
			grid-template-columns: repeat(2, 1fr);
		}

		.profil-sejarah {
			grid-column: span 12;
			grid-row: auto;
		}

		.profil-visi,
		.profil-misi {
			grid-column: span 6;
			grid-row: auto;
		}

		.layanan-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			max-width: 780px;
			margin: 0 auto;
		}

		.org-grid--5 {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	@media (max-width: 860px) {
		.trust-grid {
			grid-template-columns: 1fr;
		}

		.berita-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (max-width: 768px) {
		.hero {
			padding-top: 104px;
			padding-bottom: var(--space-10);
		}

		.hero__badge {
			margin-bottom: var(--space-4);
		}

		.hero__title {
			margin-bottom: var(--space-4);
			font-size: 3rem;
		}

		.hero__subtitle {
			font-size: var(--text-base);
			max-width: 520px;
			margin-bottom: var(--space-6);
		}

		.hero__stats-wrapper {
			margin-top: var(--space-6);
		}

		.hero__actions,
		.cta-section__actions {
			flex-direction: column;
			align-items: stretch;
			max-width: 360px;
			margin: 0;
		}

		.cta-section__actions {
			margin: 0 auto;
		}

		.hero__scene {
			min-height: 320px;
		}

		.hero__actions :global(.btn),
		.cta-section__actions :global(.btn) {
			width: 100%;
		}

		.profil-sejarah {
			min-height: unset;
			display: grid;
			grid-template-rows: minmax(220px, 44vw) auto;
		}

		.profil-sejarah .bento-image-bg {
			position: relative;
			min-height: 220px;
		}

		.profil-sejarah .bento-content {
			padding: var(--space-5);
			background: linear-gradient(180deg, rgba(255, 252, 246, 0.98), rgba(255, 248, 240, 0.96));
		}

		.profil-sejarah .profil-card__icon-wrap {
			margin-bottom: 0;
		}

		.profil-sejarah .profil-card__story {
			max-width: none;
			padding: 0;
			background: transparent;
			border: 0;
			box-shadow: none;
			backdrop-filter: none;
			-webkit-backdrop-filter: none;
		}

		.profil-sejarah .profil-card__eyebrow,
		.profil-sejarah .profil-card__title,
		.profil-sejarah .profil-card__text {
			color: var(--color-text) !important;
		}

		.profil-sejarah .profil-card__text {
			color: var(--color-text-secondary) !important;
		}

		.profil-visi,
		.profil-misi {
			grid-column: span 12;
		}

		.layanan-grid {
			grid-template-columns: 1fr;
			max-width: 560px;
		}

		.org-grid--3 {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			max-width: 460px;
		}

		.org-grid--5 {
			grid-template-columns: repeat(2, 1fr);
		}

		.trust-card {
			padding: var(--space-6);
		}

		.cta-section {
			padding: var(--space-16) 0;
		}
	}

	@media (max-width: 600px) {
		.hero {
			padding-top: 92px;
			padding-bottom: var(--space-8);
		}

		.hero__title {
			font-size: var(--text-5xl);
			line-height: 1.08;
		}

		.hero__subtitle {
			font-size: var(--text-sm);
			line-height: 1.55;
			margin-bottom: var(--space-5);
		}

		.hero__stats-wrapper {
			margin-top: var(--space-5);
		}

		.hero__scene {
			min-height: 280px;
		}

		.hero__scene::before {
			inset: 10px;
		}

		.hero__scene-caption {
			left: var(--space-5);
			right: var(--space-5);
			bottom: var(--space-5);
		}

		.hero__scene-caption strong {
			font-size: var(--text-2xl);
		}

		.hero__scene-meta {
			top: var(--space-5);
			left: var(--space-5);
			right: var(--space-5);
		}

		.hero__stats-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: var(--space-2);
		}

		.bento-content {
			padding: var(--space-6);
		}

		.profil-sejarah {
			grid-template-rows: minmax(200px, 48vw) auto;
			border-radius: calc(var(--radius-2xl) - 2px);
		}

		.profil-sejarah .bento-content {
			padding: var(--space-5);
		}

		.profil-sejarah .bento-image-bg {
			min-height: 200px;
		}

		.org-grid--3,
		.org-grid--5 {
			grid-template-columns: 1fr;
			max-width: 320px;
			margin: 0 auto;
		}

		.identitas-value--mono {
			font-size: var(--text-base);
			letter-spacing: 0;
		}

		.berita-grid {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 420px) {
		.hero {
			padding-top: 84px;
		}

		.hero__stats-grid {
			max-width: 100%;
		}
	}

	@media (max-width: 360px) {
		.hero__stats-grid {
			grid-template-columns: 1fr;
			max-width: 280px;
			margin: 0 auto;
		}
	}

	@media (max-width: 900px) and (orientation: landscape) and (max-height: 560px) {
		.hero {
			padding-top: 96px;
			padding-bottom: var(--space-10);
			min-height: auto;
		}

		.hero__subtitle {
			max-width: 760px;
		}

		.hero__actions,
		.cta-section__actions {
			flex-direction: row;
			max-width: none;
		}

		.hero__scene {
			display: none;
		}

		.hero__actions :global(.btn),
		.cta-section__actions :global(.btn) {
			width: auto;
		}

		.hero__stats-wrapper {
			margin-top: var(--space-8);
		}
	}
</style>
