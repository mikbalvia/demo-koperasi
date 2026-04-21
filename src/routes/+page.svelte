<script lang="ts">
	import { profil, statistik, layanan, pengawas, pengurus, berita, dokumenLegalitas } from '$lib/data/content';
	import SectionHeading from '$lib/components/SectionHeading.svelte';
	import StatCard from '$lib/components/StatCard.svelte';
	import ServiceCard from '$lib/components/ServiceCard.svelte';
	import OrganizationCard from '$lib/components/OrganizationCard.svelte';
	import NewsCard from '$lib/components/NewsCard.svelte';
	import LegalityBadge from '$lib/components/LegalityBadge.svelte';
	import { onMount } from 'svelte';

	let heroVisible = $state(false);

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
	<title>Koperasi Kelurahan Merah Putih Awirarangan</title>
	<meta
		name="description"
		content="Koperasi Kelurahan Merah Putih Awirarangan — Membangun Ekonomi Kerakyatan Berbasis Gotong Royong"
	/>
</svelte:head>

<!-- ===== HERO ===== -->
<section class="hero" id="hero">
	<div class="hero__bg">
		<div class="hero__gradient"></div>
		<div class="hero__pattern"></div>
		<div class="hero__orbs">
			<div class="hero__orb hero__orb--1"></div>
			<div class="hero__orb hero__orb--2"></div>
			<div class="hero__orb hero__orb--3"></div>
		</div>
	</div>

	<div class="container hero__content" class:visible={heroVisible}>
		<div class="hero__badge">
			<span class="badge badge--gold">✦ Program Kementerian Koperasi RI</span>
		</div>
		<h1 class="hero__title">
			Koperasi Kelurahan<br />
			<span class="hero__title-accent">Merah Putih</span><br />
			Awirarangan
		</h1>
		<p class="hero__subtitle">
			Membangun Ekonomi Kerakyatan Berbasis Gotong Royong untuk Kesejahteraan Anggota dan Masyarakat Kelurahan Awirarangan
		</p>
		<div class="hero__actions">
			<a href="/info-pendaftaran" class="btn btn--primary btn--lg">
				Daftar Menjadi Anggota
				<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
					<path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
				</svg>
			</a>
			<a href="#profil" class="btn btn--secondary btn--lg">
				Pelajari Lebih Lanjut
			</a>
		</div>
	</div>

	<!-- Stats floating at bottom of hero -->
	<div class="hero__stats container">
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
			<SectionHeading title="Profil Koperasi" subtitle="Visi, Misi, dan Sejarah singkat Koperasi Kelurahan Merah Putih Awirarangan." />
		</div>

		<div class="profil-grid">
			<!-- Visi -->
			<div class="profil-card animate-on-scroll delay-1">
				<div class="profil-card__icon">🎯</div>
				<h3 class="profil-card__title">Visi</h3>
				<p class="profil-card__text">{profil.visi}</p>
			</div>

			<!-- Misi -->
			<div class="profil-card profil-card--misi animate-on-scroll delay-2">
				<div class="profil-card__icon">🚀</div>
				<h3 class="profil-card__title">Misi</h3>
				<ol class="profil-card__list">
					{#each profil.misi as item}
						<li>{item}</li>
					{/each}
				</ol>
			</div>

			<!-- Sejarah -->
			<div class="profil-card profil-card--sejarah animate-on-scroll delay-3">
				<div class="profil-card__icon">📖</div>
				<h3 class="profil-card__title">Sejarah Singkat</h3>
				<p class="profil-card__text">{profil.sejarah}</p>
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
					<ServiceCard {item} index={i} layanan={item} />
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

<!-- ===== IDENTITAS BADAN HUKUM ===== -->
<section class="section section--dark" id="identitas">
	<div class="container">
		<div class="animate-on-scroll">
			<SectionHeading
				title="Identitas Badan Hukum"
				subtitle="Informasi resmi sesuai dengan dokumen yang terdaftar."
				light
			/>
		</div>

		<div class="identitas-grid animate-on-scroll">
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
</section>

<!-- ===== BERITA ===== -->
<section class="section" id="berita">
	<div class="container">
		<div class="animate-on-scroll">
			<SectionHeading
				title="Berita & Informasi"
				subtitle="Ikuti kegiatan dan pengumuman terbaru dari Koperasi Merah Putih Awirarangan."
			/>
		</div>

		<div class="berita-grid">
			{#each berita.slice(0, 3) as item}
				<div class="animate-on-scroll">
					<NewsCard berita={item} />
				</div>
			{/each}
		</div>

		<div class="berita-more animate-on-scroll">
			<a href="/berita" class="btn btn--outline btn--lg">
				Lihat Semua Berita
				<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
					<path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
				</svg>
			</a>
		</div>
	</div>
</section>

<!-- ===== LEGALITAS ===== -->
<section class="section section--alt" id="legalitas">
	<div class="container">
		<div class="animate-on-scroll">
			<SectionHeading
				title="Dokumen Legalitas"
				subtitle="Status dokumen hukum utama yang dimiliki koperasi."
			/>
		</div>

		<div class="legalitas-list">
			{#each dokumenLegalitas as doc}
				<div class="animate-on-scroll">
					<LegalityBadge dokumen={doc} />
				</div>
			{/each}
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
			<a href="/info-pendaftaran" class="btn btn--primary btn--lg">
				Daftar Sekarang
			</a>
			<a href="mailto:{profil.email}" class="btn btn--secondary btn--lg">
				Hubungi Kami
			</a>
		</div>
	</div>
</section>

<style>
	/* ===== HERO ===== */
	.hero {
		position: relative;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding-top: 100px;
		padding-bottom: var(--space-32);
		overflow: hidden;
	}

	.hero__bg {
		position: absolute;
		inset: 0;
		z-index: 0;
	}

	.hero__gradient {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			150deg,
			#7f1d1d 0%,
			#991b1b 25%,
			#b91c1c 50%,
			#92400e 75%,
			#78350f 100%
		);
	}

	.hero__pattern {
		position: absolute;
		inset: 0;
		opacity: 0.06;
		background-image: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M40 0L44 4L40 8L36 4zM0 40L4 44L0 48L-4 44zM80 40L84 44L80 48L76 44zM40 80L44 84L40 88L36 84zM20 20L24 24L20 28L16 24zM60 20L64 24L60 28L56 24zM20 60L24 64L20 68L16 64zM60 60L64 64L60 68L56 64z'/%3E%3C/g%3E%3C/svg%3E");
	}

	.hero__orbs {
		position: absolute;
		inset: 0;
		overflow: hidden;
	}

	.hero__orb {
		position: absolute;
		border-radius: 50%;
		filter: blur(80px);
		animation: float 8s ease-in-out infinite;
	}

	.hero__orb--1 {
		width: 400px;
		height: 400px;
		background: rgba(217, 119, 6, 0.15);
		top: -100px;
		right: -100px;
		animation-delay: 0s;
	}

	.hero__orb--2 {
		width: 300px;
		height: 300px;
		background: rgba(4, 120, 87, 0.1);
		bottom: 100px;
		left: -50px;
		animation-delay: 2s;
	}

	.hero__orb--3 {
		width: 200px;
		height: 200px;
		background: rgba(251, 191, 36, 0.1);
		top: 40%;
		right: 20%;
		animation-delay: 4s;
	}

	.hero__content {
		position: relative;
		z-index: 1;
		text-align: center;
		opacity: 0;
		transform: translateY(40px);
		transition:
			opacity 1s cubic-bezier(0.4, 0, 0.2, 1),
			transform 1s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.hero__content.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.hero__badge {
		margin-bottom: var(--space-6);
	}

	.hero__title {
		font-size: var(--text-6xl);
		color: white;
		margin-bottom: var(--space-6);
		line-height: 1.1;
	}

	.hero__title-accent {
		background: linear-gradient(135deg, var(--gold-300), var(--gold-500));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.hero__subtitle {
		font-size: var(--text-lg);
		color: rgba(255, 255, 255, 0.75);
		max-width: 600px;
		margin: 0 auto var(--space-8);
		line-height: 1.7;
	}

	.hero__actions {
		display: flex;
		gap: var(--space-4);
		justify-content: center;
		flex-wrap: wrap;
	}

	.hero__stats {
		position: relative;
		z-index: 1;
		margin-top: var(--space-16);
	}

	.hero__stats-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: var(--space-4);
	}

	/* ===== PROFIL ===== */
	.profil-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--space-6);
	}

	.profil-card {
		background: var(--color-surface);
		border-radius: var(--radius-xl);
		padding: var(--space-8);
		border: 1px solid var(--color-border);
		transition:
			transform var(--transition-base),
			box-shadow var(--transition-base);
	}

	.profil-card:hover {
		transform: translateY(-4px);
		box-shadow: var(--shadow-lg);
	}

	.profil-card__icon {
		font-size: var(--text-3xl);
		margin-bottom: var(--space-4);
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

	.profil-card--misi {
		grid-row: 1 / 3;
		grid-column: 2;
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
		border-radius: var(--radius-full);
		letter-spacing: 0.04em;
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

	/* ===== IDENTITAS (Dark Section) ===== */
	.section--dark {
		background: linear-gradient(150deg, var(--warm-800), var(--warm-900));
		color: white;
		position: relative;
		overflow: hidden;
	}

	.identitas-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--space-4);
	}

	.identitas-item {
		background: rgba(255, 255, 255, 0.06);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: var(--radius-lg);
		padding: var(--space-5);
		transition: background var(--transition-fast);
	}

	.identitas-item:hover {
		background: rgba(255, 255, 255, 0.1);
	}

	.identitas-item--full {
		grid-column: 1 / -1;
	}

	.identitas-label {
		display: block;
		font-size: var(--text-xs);
		color: rgba(255, 255, 255, 0.5);
		text-transform: uppercase;
		letter-spacing: 0.06em;
		font-weight: 600;
		margin-bottom: var(--space-2);
	}

	.identitas-value {
		font-size: var(--text-base);
		color: white;
		font-weight: 500;
	}

	.identitas-value--mono {
		font-family: 'SF Mono', 'Fira Code', monospace;
		font-size: var(--text-lg);
		letter-spacing: 0.1em;
		color: var(--gold-400);
	}

	/* ===== BERITA ===== */
	.berita-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--space-6);
	}

	.berita-more {
		text-align: center;
		margin-top: var(--space-10);
	}

	/* ===== LEGALITAS ===== */
	.legalitas-list {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		max-width: 800px;
		margin: 0 auto;
	}

	/* ===== CTA ===== */
	.cta-section {
		position: relative;
		padding: var(--space-24) 0;
		overflow: hidden;
	}

	.cta-section__bg {
		position: absolute;
		inset: 0;
	}

	.cta-section__gradient {
		position: absolute;
		inset: 0;
		background: linear-gradient(135deg, var(--red-700), var(--red-900), var(--warm-900));
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
	}

	.cta-section__title {
		font-size: var(--text-4xl);
		color: white;
		margin-bottom: var(--space-4);
	}

	.cta-section__text {
		font-size: var(--text-lg);
		color: rgba(255, 255, 255, 0.75);
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
	@media (max-width: 960px) {
		.hero__stats-grid {
			grid-template-columns: repeat(2, 1fr);
		}

		.profil-grid {
			grid-template-columns: 1fr;
		}

		.profil-card--misi {
			grid-row: auto;
			grid-column: auto;
		}

		.layanan-grid {
			grid-template-columns: 1fr;
			max-width: 500px;
			margin: 0 auto;
		}

		.org-grid--5 {
			grid-template-columns: repeat(3, 1fr);
		}

		.berita-grid {
			grid-template-columns: 1fr;
			max-width: 500px;
			margin: 0 auto;
		}

		.identitas-grid {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 600px) {
		.hero {
			min-height: auto;
			padding-top: 120px;
			padding-bottom: var(--space-16);
		}

		.hero__title {
			font-size: var(--text-4xl);
		}

		.hero__stats-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: var(--space-3);
		}

		.org-grid--3 {
			grid-template-columns: 1fr;
			max-width: 250px;
		}

		.org-grid--5 {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
