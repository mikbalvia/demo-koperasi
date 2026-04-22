<script lang="ts">
	import { Search } from '@lucide/svelte';
	let nik = $state('');
	let searched = $state(false);
	let loading = $state(false);
	let result = $state<null | { found: boolean; nama?: string; noAnggota?: string; status?: string; tanggalDaftar?: string }>(null);

	const mockData: Record<string, { nama: string; noAnggota: string; status: string; tanggalDaftar: string }> = {
		'3208131234560001': { nama: 'Ahmad Suryadi', noAnggota: 'KKMP-2024-001', status: 'Aktif', tanggalDaftar: '15 Maret 2024' },
		'3208131234560002': { nama: 'Siti Nurhaliza', noAnggota: 'KKMP-2024-045', status: 'Aktif', tanggalDaftar: '22 April 2024' },
		'3208131234560003': { nama: 'Budi Santoso', noAnggota: 'KKMP-2025-112', status: 'Pending Verifikasi', tanggalDaftar: '10 Januari 2025' }
	};

	async function handleSearch(e: SubmitEvent) {
		e.preventDefault();
		if (!nik.trim()) return;
		loading = true;
		searched = false;
		await new Promise((r) => setTimeout(r, 1500));
		const data = mockData[nik.trim()];
		result = data ? { found: true, ...data } : { found: false };
		loading = false;
		searched = true;
	}
</script>

<svelte:head>
	<title>Cek Status Anggota — KKMP Karang Tengah</title>
</svelte:head>

<section class="page-header">
	<div class="page-header__bg"></div>
	<div class="container page-header__content">
		<span class="badge badge--gold"><Search size={12} strokeWidth={2} /> Verifikasi</span>
		<h1 class="page-header__title">Cek Status Anggota</h1>
		<p class="page-header__subtitle">Masukkan NIK atau Nomor Anggota untuk memeriksa status keanggotaan.</p>
	</div>
</section>

<section class="section">
	<div class="container">
		<div class="search-box">
			<form class="search-form" onsubmit={handleSearch}>
				<div class="search-form__input-wrap">
					<input type="text" bind:value={nik} placeholder="Masukkan NIK (16 digit) atau Nomor Anggota" class="search-form__input" maxlength="20" id="cek-anggota-input" />
				</div>
				<button type="submit" class="btn btn--primary btn--lg" disabled={loading || !nik.trim()}>
					{#if loading}<span class="spinner"></span> Mencari...{:else}Cek Status{/if}
				</button>
			</form>
			<p class="search-box__hint">💡 Contoh NIK: <button class="hint-btn" onclick={() => nik = '3208131234560001'}>3208131234560001</button></p>
		</div>

		{#if searched && result}
			<div class="result" class:found={result.found} class:not-found={!result.found}>
				{#if result.found}
					<div class="result__header result__header--ok">
						<div class="result__icon result__icon--ok">✓</div>
						<div><h3>Data Anggota Ditemukan</h3><p class="result__sub">Berikut informasi keanggotaan.</p></div>
					</div>
					<div class="result__details">
						<div class="result__row"><span class="result__label">Nama</span><span class="result__val">{result.nama}</span></div>
						<div class="result__row"><span class="result__label">No. Anggota</span><span class="result__val mono">{result.noAnggota}</span></div>
						<div class="result__row"><span class="result__label">Status</span><span class="badge {result.status === 'Aktif' ? 'badge--green' : 'badge--gold'}">{result.status}</span></div>
						<div class="result__row"><span class="result__label">Tgl Daftar</span><span class="result__val">{result.tanggalDaftar}</span></div>
					</div>
				{:else}
					<div class="result__header result__header--err">
						<div class="result__icon result__icon--err">✕</div>
						<div><h3>Data Tidak Ditemukan</h3><p class="result__sub">NIK/Nomor Anggota tidak terdaftar. Periksa kembali atau hubungi kantor koperasi.</p></div>
					</div>
				{/if}
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

	.search-box { max-width: 650px; margin: 0 auto; }
	.search-form { display: flex; gap: var(--space-3); margin-bottom: var(--space-4); }
	.search-form__input-wrap { flex: 1; }
	.search-form__input { width: 100%; padding: var(--space-4); border: 2px solid var(--color-border); border-radius: var(--radius-xl); font-family: var(--font-body); font-size: var(--text-base); color: var(--color-text); background: var(--color-surface); transition: border-color var(--transition-fast), box-shadow var(--transition-fast); }
	.search-form__input:focus { outline: none; border-color: var(--color-primary); box-shadow: 0 0 0 3px rgba(185,28,28,0.1); }
	.search-box__hint { font-size: var(--text-xs); color: var(--color-text-muted); text-align: center; }
	.hint-btn { font-family: monospace; font-size: var(--text-xs); color: var(--color-primary); text-decoration: underline; cursor: pointer; }

	.spinner { display: inline-block; width: 16px; height: 16px; border: 2px solid rgba(255,255,255,0.3); border-top-color: white; border-radius: 50%; animation: spin 0.6s linear infinite; }
	@keyframes spin { to { transform: rotate(360deg); } }

	.result { max-width: 650px; margin: var(--space-8) auto 0; border-radius: var(--radius-xl); border: 1px solid var(--color-border); overflow: hidden; animation: fadeInUp 0.5s ease; }
	.result.found { border-color: var(--green-200); }
	.result.not-found { border-color: var(--red-200); }
	.result__header { display: flex; align-items: center; gap: var(--space-4); padding: var(--space-5); }
	.result__header--ok { background: var(--green-50); }
	.result__header--err { background: var(--red-50); }
	.result__icon { width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; flex-shrink: 0; color: white; }
	.result__icon--ok { background: var(--green-600); }
	.result__icon--err { background: var(--red-600); }
	.result__header h3 { font-family: var(--font-body); font-size: var(--text-base); font-weight: 700; }
	.result__sub { font-size: var(--text-sm); color: var(--color-text-secondary); margin-top: var(--space-1); }
	.result__details { padding: var(--space-5); display: flex; flex-direction: column; gap: var(--space-4); background: var(--color-surface); }
	.result__row { display: flex; align-items: center; justify-content: space-between; padding-bottom: var(--space-3); border-bottom: 1px solid var(--color-border); }
	.result__row:last-child { border-bottom: none; padding-bottom: 0; }
	.result__label { font-size: var(--text-sm); color: var(--color-text-secondary); }
	.result__val { font-size: var(--text-sm); font-weight: 600; }
	.result__val.mono { font-family: monospace; color: var(--color-primary); }

	@media (max-width: 768px) {
		.page-header { padding: 116px 0 var(--space-12); }
		.page-header__subtitle { font-size: var(--text-base); }
	}

	@media (max-width: 600px) {
		.search-form { flex-direction: column; }
		.result__header { padding: var(--space-4); }
		.result__details { padding: var(--space-4); }
		.result__row { flex-direction: column; align-items: flex-start; gap: var(--space-1); }
	}

	@media (max-width: 900px) and (orientation: landscape) and (max-height: 560px) {
		.page-header { padding: 90px 0 var(--space-10); }
		.search-form { flex-direction: row; }
	}
</style>
