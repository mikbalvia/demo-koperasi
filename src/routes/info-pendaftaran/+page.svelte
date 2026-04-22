<script lang="ts">
	import { syaratKeanggotaan, prosedurPendaftaran, faqItems } from '$lib/data/content';
	import SectionHeading from '$lib/components/SectionHeading.svelte';
	import { onMount } from 'svelte';
	import { ClipboardList, ChevronDown } from '@lucide/svelte';

	let openFaq = $state(-1);

	function toggleFaq(index: number) {
		openFaq = openFaq === index ? -1 : index;
	}

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) entry.target.classList.add('in-view');
				});
			},
			{ threshold: 0.1 }
		);
		document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el));
		return () => observer.disconnect();
	});
</script>

<svelte:head>
	<title>Info Pendaftaran — KKMP Karang Tengah</title>
	<meta name="description" content="Informasi lengkap pendaftaran anggota Koperasi Kelurahan Merah Putih Karang Tengah." />
</svelte:head>

<!-- Header -->
<section class="page-header">
	<div class="page-header__bg"></div>
	<div class="container page-header__content">
		<span class="badge badge--gold"><ClipboardList size={12} strokeWidth={2} /> Informasi Pendaftaran</span>
		<h1 class="page-header__title">Daftar Menjadi Anggota</h1>
		<p class="page-header__subtitle">
			Bergabunglah bersama kami untuk membangun ekonomi kerakyatan yang kuat dan mandiri.
		</p>
	</div>
</section>

<!-- Syarat -->
<section class="section">
	<div class="container">
		<div class="animate-on-scroll">
			<SectionHeading title="Syarat Keanggotaan" subtitle="Persyaratan yang harus dipenuhi untuk menjadi anggota koperasi." />
		</div>

		<div class="syarat-grid">
			{#each syaratKeanggotaan as syarat, i}
				<div class="syarat-item animate-on-scroll" style="transition-delay: {i * 50}ms">
					<div class="syarat-item__num">{i + 1}</div>
					<p class="syarat-item__text">{syarat}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Prosedur -->
<section class="section section--alt">
	<div class="container">
		<div class="animate-on-scroll">
			<SectionHeading title="Prosedur Pendaftaran" subtitle="Langkah-langkah mudah untuk menjadi anggota koperasi." />
		</div>

		<div class="prosedur-timeline">
			{#each prosedurPendaftaran as step, i}
				<div class="prosedur-step animate-on-scroll" style="transition-delay: {i * 100}ms">
					<div class="prosedur-step__marker">
						<span class="prosedur-step__num">{step.langkah}</span>
						{#if i < prosedurPendaftaran.length - 1}
							<div class="prosedur-step__line"></div>
						{/if}
					</div>
					<div class="prosedur-step__content">
						<h3 class="prosedur-step__title">{step.judul}</h3>
						<p class="prosedur-step__desc">{step.deskripsi}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- FAQ -->
<section class="section">
	<div class="container">
		<div class="animate-on-scroll">
			<SectionHeading title="Pertanyaan Umum" subtitle="Jawaban untuk pertanyaan yang sering diajukan." />
		</div>

		<div class="faq-list">
			{#each faqItems as item, i}
				<div class="faq-item animate-on-scroll" class:open={openFaq === i}>
					<button class="faq-item__question" onclick={() => toggleFaq(i)}>
						<span>{item.pertanyaan}</span>
						<span class="faq-item__chevron"><ChevronDown size={20} strokeWidth={2} /></span>
					</button>
					<div class="faq-item__answer">
						<p>{item.jawaban}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	/* Page Header */
	.page-header {
		position: relative;
		padding: 140px 0 var(--space-16);
		overflow: hidden;
	}

	.page-header__bg {
		position: absolute;
		inset: 0;
		background: linear-gradient(150deg, var(--red-800), var(--red-900), var(--warm-900));
	}

	.page-header__content {
		position: relative;
		z-index: 1;
		text-align: center;
	}

	.page-header__title {
		font-size: var(--text-5xl);
		color: white;
		margin: var(--space-4) 0;
	}

	.page-header__subtitle {
		font-size: var(--text-lg);
		color: rgba(255, 255, 255, 0.7);
		max-width: 500px;
		margin: 0 auto;
	}

	/* Syarat */
	.syarat-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--space-4);
		max-width: 900px;
		margin: 0 auto;
	}

	.syarat-item {
		display: flex;
		gap: var(--space-4);
		align-items: flex-start;
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: var(--space-4) var(--space-5);
		transition: transform var(--transition-fast), box-shadow var(--transition-fast);
	}

	.syarat-item:hover {
		transform: translateY(-2px);
		box-shadow: var(--shadow-md);
	}

	.syarat-item__num {
		width: 32px;
		height: 32px;
		min-width: 32px;
		border-radius: 50%;
		background: linear-gradient(135deg, var(--red-600), var(--red-700));
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: var(--text-sm);
		font-weight: 700;
	}

	.syarat-item__text {
		font-size: var(--text-sm);
		color: var(--color-text-secondary);
		line-height: 1.6;
	}

	/* Prosedur Timeline */
	.prosedur-timeline {
		max-width: 600px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: 0;
	}

	.prosedur-step {
		display: flex;
		gap: var(--space-5);
		position: relative;
	}

	.prosedur-step__marker {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex-shrink: 0;
	}

	.prosedur-step__num {
		width: 44px;
		height: 44px;
		border-radius: 50%;
		background: linear-gradient(135deg, var(--red-600), var(--red-700));
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: var(--font-display);
		font-size: var(--text-lg);
		z-index: 1;
		box-shadow: 0 4px 14px rgba(185, 28, 28, 0.25);
	}

	.prosedur-step__line {
		width: 2px;
		flex: 1;
		min-height: 30px;
		background: linear-gradient(to bottom, var(--red-300), var(--red-100));
	}

	.prosedur-step__content {
		padding-bottom: var(--space-8);
	}

	.prosedur-step__title {
		font-size: var(--text-lg);
		color: var(--color-text);
		margin-bottom: var(--space-2);
	}

	.prosedur-step__desc {
		font-size: var(--text-sm);
		color: var(--color-text-secondary);
		line-height: 1.7;
	}

	/* FAQ */
	.faq-list {
		max-width: 700px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
	}

	.faq-item {
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		overflow: hidden;
		transition: box-shadow var(--transition-fast);
	}

	.faq-item:hover {
		box-shadow: var(--shadow-sm);
	}

	.faq-item__question {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-4);
		padding: var(--space-5);
		font-size: var(--text-sm);
		font-weight: 600;
		text-align: left;
		color: var(--color-text);
	}

	.faq-item__chevron {
		flex-shrink: 0;
		transition: transform var(--transition-base);
		color: var(--color-text-muted);
	}

	.faq-item.open .faq-item__chevron {
		transform: rotate(180deg);
	}

	.faq-item__answer {
		max-height: 0;
		overflow: hidden;
		transition: max-height var(--transition-slow);
	}

	.faq-item.open .faq-item__answer {
		max-height: 300px;
	}

	.faq-item__answer p {
		padding: 0 var(--space-5) var(--space-5);
		font-size: var(--text-sm);
		color: var(--color-text-secondary);
		line-height: 1.7;
	}

	@media (max-width: 768px) {
		.page-header {
			padding: 116px 0 var(--space-12);
		}

		.page-header__subtitle {
			font-size: var(--text-base);
		}

		.syarat-grid {
			grid-template-columns: 1fr;
		}

		.prosedur-step {
			gap: var(--space-4);
		}

		.prosedur-step__num {
			width: 38px;
			height: 38px;
			font-size: var(--text-base);
		}

		.faq-item__question {
			padding: var(--space-4);
		}

		.faq-item__answer p {
			padding: 0 var(--space-4) var(--space-4);
		}
	}

	@media (max-width: 900px) and (orientation: landscape) and (max-height: 560px) {
		.page-header {
			padding: 90px 0 var(--space-10);
		}

		.syarat-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
</style>
