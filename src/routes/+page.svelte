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
		<img src="/images/hero-bg.png" alt="" class="hero__bg-img" />
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
			<span class="badge badge--gold"><Sparkles size={12} strokeWidth={2} /> Program Kementerian Koperasi RI</span>
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
			<SectionHeading title="Profil Koperasi" subtitle="Visi, Misi, dan Sejarah singkat Koperasi Kelurahan Merah Putih Awirarangan." />
		</div>

		<div class="bento-grid profil-bento">
			<!-- Sejarah -->
			<div class="bento-item bento-item--glow profil-sejarah animate-on-scroll delay-1">
				<div class="bento-image-bg">
					<img src="/images/about-koperasi.png" alt="Toko Koperasi" loading="lazy" />
					<div class="bento-image-overlay"></div>
				</div>
				<div class="bento-content">
					<div class="profil-card__icon-wrap glass"><BookOpen size={24} strokeWidth={1.5} /></div>
					<h3 class="profil-card__title text-white">Sejarah Singkat</h3>
					<p class="profil-card__text text-white-70">{profil.sejarah}</p>
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

<!-- ===== KEPERCAYAAN & LEGALITAS ===== -->
<section class="section section--dark trust-section" id="legalitas">
	<div class="trust-section__pattern"></div>
	<div class="container relative-z">
		<div class="animate-on-scroll">
			<SectionHeading
				title="Kepercayaan & Legalitas"
				subtitle="Informasi resmi badan hukum dan dokumen legalitas Koperasi Kelurahan Merah Putih Awirarangan."
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
		min-height: calc(100vh - 60px);
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding-top: 140px;
		padding-bottom: var(--space-20);
		margin-bottom: var(--space-12);
	}

	.hero__bg {
		position: absolute;
		inset: 0;
		z-index: 0;
		overflow: hidden;
		border-bottom-left-radius: var(--radius-2xl);
		border-bottom-right-radius: var(--radius-2xl);
		box-shadow: var(--shadow-2xl);
	}

	.hero__bg-img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		z-index: 0;
	}

	.hero__gradient {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			150deg,
			rgba(127, 29, 29, 0.92) 0%,
			rgba(153, 27, 27, 0.88) 25%,
			rgba(185, 28, 28, 0.85) 50%,
			rgba(146, 64, 14, 0.88) 75%,
			rgba(120, 53, 15, 0.92) 100%
		);
		z-index: 1;
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

	.hero__stats-wrapper {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 10;
		transform: translateY(50%);
	}

	.hero__stats-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: var(--space-4);
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
		background: linear-gradient(to top, rgba(26, 26, 22, 0.95) 0%, rgba(26, 26, 22, 0.5) 50%, transparent 100%);
	}

	.bento-content {
		position: relative;
		z-index: 1;
		padding: var(--space-8);
	}

	.text-white { color: white !important; }
	.text-white-70 { color: rgba(255, 255, 255, 0.75) !important; }

	.profil-card__icon-wrap {
		width: 52px;
		height: 52px;
		border-radius: var(--radius-lg);
		background: linear-gradient(135deg, var(--red-50), var(--gold-50));
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--color-primary);
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

	/* ===== KEPERCAYAAN & LEGALITAS (Dark Section) ===== */
	.section--dark {
		background: linear-gradient(150deg, var(--warm-800), var(--warm-900));
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
		letter-spacing: 0.06em;
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
		letter-spacing: 0.1em;
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
		grid-template-columns: repeat(3, 1fr);
		gap: var(--space-6);
	}

	.berita-more {
		text-align: center;
		margin-top: var(--space-10);
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
		.hero {
			min-height: auto;
			padding-bottom: var(--space-16);
			margin-bottom: 0;
		}

		.hero__stats-wrapper {
			position: relative;
			transform: none;
			margin-top: var(--space-10);
		}

		.hero__stats-grid {
			grid-template-columns: repeat(2, 1fr);
		}

		.profil-sejarah, .profil-visi, .profil-misi {
			grid-column: span 12;
			grid-row: auto;
		}

		.layanan-grid {
			grid-template-columns: 1fr;
			max-width: 500px;
			margin: 0 auto;
		}

		.org-grid--5 {
			grid-template-columns: repeat(3, 1fr);
		}

		.trust-grid {
			grid-template-columns: 1fr;
		}

		.berita-grid {
			grid-template-columns: 1fr;
			max-width: 500px;
			margin: 0 auto;
		}
	}

	@media (max-width: 600px) {
		.hero {
			padding-top: 120px;
			padding-bottom: var(--space-12);
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
