<script lang="ts">
	import { Calculator, Download, RotateCcw, Info } from '@lucide/svelte';

	// Core parameters
	let jumlahPinjaman = $state(10000000);
	let tenor = $state(12);
	let bungaTahunan = $state(12);
	let tipeCicilan = $state<'efektif' | 'flat'>('efektif');

	// Additional parameters
	let biayaAdmin = $state(1);
	let biayaAsuransi = $state(0.5);
	let simpananWajib = $state(25000);
	let gracePeriod = $state(0);

	// Results
	let hasilSimulasi = $state<{ bulan: number; cicilan: number; pokok: number; bungaBulan: number; sisa: number }[]>([]);
	let totalBayar = $state(0);
	let cicilanPerBulan = $state(0);
	let totalBunga = $state(0);
	let totalPokok = $state(0);
	let biayaAdminNominal = $state(0);
	let biayaAsuransiNominal = $state(0);
	let danaCair = $state(0);

	function formatRupiah(n: number) {
		return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n);
	}

	function formatRupiahDecimal(n: number) {
		return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);
	}

	function hitung() {
		const bungaBulanan = bungaTahunan / 12 / 100;
		biayaAdminNominal = Math.round(jumlahPinjaman * biayaAdmin / 100);
		biayaAsuransiNominal = Math.round(jumlahPinjaman * biayaAsuransi / 100);
		danaCair = jumlahPinjaman - biayaAdminNominal - biayaAsuransiNominal;

		const rows: typeof hasilSimulasi = [];
		let sisa = jumlahPinjaman;

		if (tipeCicilan === 'efektif') {
			// Anuitas
			const cicilan = (jumlahPinjaman * bungaBulanan * Math.pow(1 + bungaBulanan, tenor)) / (Math.pow(1 + bungaBulanan, tenor) - 1);
			cicilanPerBulan = Math.round(cicilan);

			for (let i = 1; i <= tenor; i++) {
				if (i <= gracePeriod) {
					const bBulan = Math.round(sisa * bungaBulanan);
					rows.push({ bulan: i, cicilan: bBulan, pokok: 0, bungaBulan: bBulan, sisa: Math.round(sisa) });
				} else {
					const bBulan = Math.round(sisa * bungaBulanan);
					const pokok = Math.round(cicilan - bBulan);
					sisa = Math.max(0, sisa - pokok);
					rows.push({ bulan: i, cicilan: Math.round(cicilan), pokok, bungaBulan: bBulan, sisa: Math.round(sisa) });
				}
			}
		} else {
			// Flat
			const pokokPerBulan = Math.round(jumlahPinjaman / tenor);
			const bungaFlatBulan = Math.round(jumlahPinjaman * bungaBulanan);
			const cicilanFlat = pokokPerBulan + bungaFlatBulan;
			cicilanPerBulan = cicilanFlat;

			for (let i = 1; i <= tenor; i++) {
				if (i <= gracePeriod) {
					rows.push({ bulan: i, cicilan: bungaFlatBulan, pokok: 0, bungaBulan: bungaFlatBulan, sisa: Math.round(sisa) });
				} else {
					sisa = Math.max(0, sisa - pokokPerBulan);
					rows.push({ bulan: i, cicilan: cicilanFlat, pokok: pokokPerBulan, bungaBulan: bungaFlatBulan, sisa: Math.round(sisa) });
				}
			}
		}

		hasilSimulasi = rows;
		totalBunga = rows.reduce((s, r) => s + r.bungaBulan, 0);
		totalPokok = rows.reduce((s, r) => s + r.pokok, 0);
		totalBayar = rows.reduce((s, r) => s + r.cicilan, 0);
	}

	function resetForm() {
		jumlahPinjaman = 10000000;
		tenor = 12;
		bungaTahunan = 12;
		tipeCicilan = 'efektif';
		biayaAdmin = 1;
		biayaAsuransi = 0.5;
		simpananWajib = 25000;
		gracePeriod = 0;
	}

	function cetakPDF() {
		window.print();
	}

	$effect(() => { jumlahPinjaman; tenor; bungaTahunan; tipeCicilan; biayaAdmin; biayaAsuransi; simpananWajib; gracePeriod; hitung(); });
</script>

<svelte:head>
	<title>Simulasi Cicilan — KKMP Awirarangan</title>
	<meta name="description" content="Simulasi dan kalkulator cicilan pinjaman koperasi. Hitung estimasi angsuran bulanan dengan berbagai parameter." />
</svelte:head>

<section class="page-header">
	<div class="page-header__bg"></div>
	<div class="container page-header__content">
		<span class="badge badge--gold"><Calculator size={12} strokeWidth={2} /> Kalkulator</span>
		<h1 class="page-header__title">Simulasi Cicilan Pinjaman</h1>
		<p class="page-header__subtitle">Hitung estimasi angsuran bulanan Anda dengan mudah.</p>
	</div>
</section>

<section class="section">
	<div class="container">
		<div class="sim-layout">
			<!-- Input Panel -->
			<div class="sim-input card">
				<div class="sim-input__header">
					<h3 class="sim-input__title">Parameter Pinjaman</h3>
					<button class="btn-reset" onclick={resetForm} title="Reset"><RotateCcw size={14} /> Reset</button>
				</div>

				<div class="field">
					<label class="field__label" for="jumlah">Jumlah Pinjaman (Rp)</label>
					<div class="field__value">{formatRupiah(jumlahPinjaman)}</div>
					<input type="range" id="jumlah" bind:value={jumlahPinjaman} min={1000000} max={100000000} step={500000} class="field__range" />
					<div class="field__range-labels"><span>Rp 1 Jt</span><span>Rp 100 Jt</span></div>
				</div>

				<div class="field">
					<label class="field__label" for="tenor">Jangka Waktu (Bulan)</label>
					<div class="field__value">{tenor} Bulan</div>
					<input type="range" id="tenor" bind:value={tenor} min={3} max={60} step={1} class="field__range" />
					<div class="field__range-labels"><span>3 Bln</span><span>60 Bln</span></div>
				</div>

				<div class="field">
					<label class="field__label" for="bunga">Bunga per Tahun (%)</label>
					<div class="field__value">{bungaTahunan}% <span class="field__sub">({(bungaTahunan / 12).toFixed(2)}% / bulan)</span></div>
					<input type="range" id="bunga" bind:value={bungaTahunan} min={1} max={36} step={0.5} class="field__range" />
					<div class="field__range-labels"><span>1%</span><span>36%</span></div>
				</div>

				<div class="field">
					<label class="field__label" for="tipeCicilan">Tipe Cicilan</label>
					<div class="field__select-wrap">
						<select id="tipeCicilan" bind:value={tipeCicilan} class="field__select">
							<option value="efektif">Efektif (Anuitas)</option>
							<option value="flat">Flat</option>
						</select>
					</div>
					<p class="field__hint">
						{#if tipeCicilan === 'efektif'}
							<Info size={12} /> Cicilan tetap, komposisi pokok & bunga berubah tiap bulan.
						{:else}
							<Info size={12} /> Angsuran pokok & bunga sama setiap bulan.
						{/if}
					</p>
				</div>

				<!-- Expandable advanced options -->
				<details class="advanced-toggle">
					<summary class="advanced-toggle__summary">Biaya & Parameter Lainnya</summary>
					<div class="advanced-toggle__content">
						<div class="field">
							<label class="field__label" for="admin">Biaya Administrasi (%)</label>
							<div class="field__value-sm">{biayaAdmin}% <span class="field__sub">= {formatRupiah(Math.round(jumlahPinjaman * biayaAdmin / 100))}</span></div>
							<input type="range" id="admin" bind:value={biayaAdmin} min={0} max={5} step={0.25} class="field__range" />
							<div class="field__range-labels"><span>0%</span><span>5%</span></div>
						</div>

						<div class="field">
							<label class="field__label" for="asuransi">Biaya Asuransi (%)</label>
							<div class="field__value-sm">{biayaAsuransi}% <span class="field__sub">= {formatRupiah(Math.round(jumlahPinjaman * biayaAsuransi / 100))}</span></div>
							<input type="range" id="asuransi" bind:value={biayaAsuransi} min={0} max={3} step={0.25} class="field__range" />
							<div class="field__range-labels"><span>0%</span><span>3%</span></div>
						</div>

						<div class="field">
							<label class="field__label" for="simpananWajib">Simpanan Wajib / Bulan (Rp)</label>
							<div class="field__value-sm">{formatRupiah(simpananWajib)}</div>
							<input type="range" id="simpananWajib" bind:value={simpananWajib} min={0} max={200000} step={5000} class="field__range" />
							<div class="field__range-labels"><span>Rp 0</span><span>Rp 200 Rb</span></div>
						</div>

						<div class="field">
							<label class="field__label" for="grace">Grace Period (Bulan)</label>
							<div class="field__value-sm">{gracePeriod} Bulan <span class="field__sub">(hanya bayar bunga)</span></div>
							<input type="range" id="grace" bind:value={gracePeriod} min={0} max={6} step={1} class="field__range" />
							<div class="field__range-labels"><span>0</span><span>6 Bln</span></div>
						</div>
					</div>
				</details>
			</div>

			<!-- Result Panel -->
			<div class="sim-result">
				<div class="sim-result__header">
					<div>
						<h3 class="sim-result__title">Hasil Simulasi</h3>
						<p class="sim-result__subtitle">Cicilan {tipeCicilan === 'efektif' ? 'Efektif (Anuitas)' : 'Flat'}</p>
					</div>
					<button class="btn btn--outline btn--sm print-btn" onclick={cetakPDF}>
						<Download size={14} /> Cetak / Simpan PDF
					</button>
				</div>

				<!-- Summary Cards -->
				<div class="sim-summary">
					<div class="sim-summary__item">
						<span class="sim-summary__label">Angsuran / Bulan</span>
						<span class="sim-summary__value sim-summary__value--primary">{formatRupiah(cicilanPerBulan)}</span>
					</div>
					<div class="sim-summary__item">
						<span class="sim-summary__label">Total Pinjaman</span>
						<span class="sim-summary__value">{formatRupiah(jumlahPinjaman)}</span>
					</div>
					<div class="sim-summary__item">
						<span class="sim-summary__label">Total Bunga</span>
						<span class="sim-summary__value sim-summary__value--accent">{formatRupiah(totalBunga)}</span>
					</div>
					<div class="sim-summary__item">
						<span class="sim-summary__label">Total Pembayaran</span>
						<span class="sim-summary__value">{formatRupiah(totalBayar)}</span>
					</div>
				</div>

				<!-- Cost breakdown -->
				{#if biayaAdmin > 0 || biayaAsuransi > 0 || simpananWajib > 0}
				<div class="sim-breakdown">
					<h4 class="sim-breakdown__title">Rincian Biaya</h4>
					<div class="sim-breakdown__grid">
						{#if biayaAdmin > 0}
						<div class="sim-breakdown__row">
							<span>Biaya Administrasi ({biayaAdmin}%)</span>
							<span class="sim-breakdown__val">{formatRupiah(biayaAdminNominal)}</span>
						</div>
						{/if}
						{#if biayaAsuransi > 0}
						<div class="sim-breakdown__row">
							<span>Biaya Asuransi ({biayaAsuransi}%)</span>
							<span class="sim-breakdown__val">{formatRupiah(biayaAsuransiNominal)}</span>
						</div>
						{/if}
						<div class="sim-breakdown__row sim-breakdown__row--highlight">
							<span>Dana Cair (setelah potongan)</span>
							<span class="sim-breakdown__val sim-breakdown__val--bold">{formatRupiah(danaCair)}</span>
						</div>
						{#if simpananWajib > 0}
						<div class="sim-breakdown__row">
							<span>Simpanan Wajib / Bulan</span>
							<span class="sim-breakdown__val">{formatRupiah(simpananWajib)}</span>
						</div>
						<div class="sim-breakdown__row">
							<span>Total Simpanan Wajib ({tenor} bln)</span>
							<span class="sim-breakdown__val">{formatRupiah(simpananWajib * tenor)}</span>
						</div>
						<div class="sim-breakdown__row sim-breakdown__row--total">
							<span>Total Keluar / Bulan (Cicilan + Simpanan)</span>
							<span class="sim-breakdown__val sim-breakdown__val--bold">{formatRupiah(cicilanPerBulan + simpananWajib)}</span>
						</div>
						{/if}
					</div>
				</div>
				{/if}

				{#if hasilSimulasi.length > 0}
					<div class="sim-table-wrap">
						<table class="sim-table">
							<thead>
								<tr>
									<th>Bulan Ke</th>
									<th>Angsuran Pokok</th>
									<th>Angsuran Bunga</th>
									<th>Total Angsuran</th>
									<th>Sisa Pinjaman</th>
								</tr>
							</thead>
							<tbody>
								{#each hasilSimulasi as row}
									<tr class:grace-row={row.bulan <= gracePeriod}>
										<td>{row.bulan}</td>
										<td>{formatRupiahDecimal(row.pokok)}</td>
										<td>{formatRupiahDecimal(row.bungaBulan)}</td>
										<td class="col-bold">{formatRupiahDecimal(row.cicilan)}</td>
										<td>{formatRupiahDecimal(row.sisa)}</td>
									</tr>
								{/each}
							</tbody>
							<tfoot>
								<tr>
									<td><strong>Total</strong></td>
									<td><strong>{formatRupiah(totalPokok)}</strong></td>
									<td><strong>{formatRupiah(totalBunga)}</strong></td>
									<td><strong>{formatRupiah(totalBayar)}</strong></td>
									<td>—</td>
								</tr>
							</tfoot>
						</table>
					</div>
				{/if}

				<p class="sim-disclaimer">* Simulasi ini hanya perkiraan. Bunga, biaya, dan syarat aktual ditentukan oleh kebijakan koperasi yang berlaku.</p>
			</div>
		</div>
	</div>
</section>

<style>
	.page-header { position: relative; padding: 140px 0 var(--space-16); overflow: hidden; }
	.page-header__bg { position: absolute; inset: 0; background: linear-gradient(150deg, var(--red-800), var(--red-900), var(--warm-900)); }
	.page-header__content { position: relative; z-index: 1; text-align: center; }
	.page-header__title { font-size: var(--text-5xl); color: white; margin: var(--space-4) 0; }
	.page-header__subtitle { font-size: var(--text-lg); color: rgba(255,255,255,0.7); max-width: 500px; margin: 0 auto; }

	.sim-layout { display: grid; grid-template-columns: 380px 1fr; gap: var(--space-8); align-items: start; }
	.sim-input { position: sticky; top: 100px; }
	.sim-input__header { display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-6); }
	.sim-input__title { font-family: var(--font-body); font-size: var(--text-lg); font-weight: 700; }

	.btn-reset { display: inline-flex; align-items: center; gap: var(--space-1); font-size: var(--text-xs); color: var(--color-text-muted); padding: var(--space-1) var(--space-2); border-radius: var(--radius-sm); transition: all var(--transition-fast); }
	.btn-reset:hover { color: var(--color-primary); background: var(--red-50); }

	.field { margin-bottom: var(--space-5); }
	.field__label { display: block; font-size: var(--text-sm); font-weight: 600; color: var(--color-text-secondary); margin-bottom: var(--space-2); }
	.field__value { font-family: var(--font-display); font-size: var(--text-2xl); color: var(--color-primary); margin-bottom: var(--space-3); }
	.field__value-sm { font-family: var(--font-body); font-size: var(--text-base); font-weight: 700; color: var(--color-text); margin-bottom: var(--space-2); }
	.field__sub { font-size: var(--text-xs); font-weight: 400; color: var(--color-text-muted); font-family: var(--font-body); }
	.field__range { width: 100%; height: 6px; -webkit-appearance: none; appearance: none; background: var(--warm-200); border-radius: 3px; outline: none; cursor: pointer; }
	.field__range::-webkit-slider-thumb { -webkit-appearance: none; width: 20px; height: 20px; border-radius: 50%; background: var(--color-primary); border: 3px solid white; box-shadow: 0 2px 8px rgba(185,28,28,0.3); cursor: pointer; }
	.field__range-labels { display: flex; justify-content: space-between; font-size: var(--text-xs); color: var(--color-text-muted); margin-top: var(--space-1); }

	.field__select-wrap { position: relative; }
	.field__select { width: 100%; padding: var(--space-3) var(--space-4); font-size: var(--text-sm); font-family: var(--font-body); font-weight: 600; border: 1.5px solid var(--color-border); border-radius: var(--radius-lg); background: var(--color-surface); color: var(--color-text); appearance: none; -webkit-appearance: none; cursor: pointer; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23737368' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 12px center; padding-right: var(--space-10); transition: border-color var(--transition-fast); }
	.field__select:focus { outline: none; border-color: var(--color-primary); box-shadow: 0 0 0 3px rgba(185,28,28,0.1); }
	.field__hint { display: flex; align-items: center; gap: var(--space-1); font-size: var(--text-xs); color: var(--color-text-muted); margin-top: var(--space-2); }

	/* Advanced toggle */
	.advanced-toggle { border-top: 1px solid var(--color-border); margin-top: var(--space-4); padding-top: var(--space-4); }
	.advanced-toggle__summary { font-size: var(--text-sm); font-weight: 600; color: var(--color-primary); cursor: pointer; padding: var(--space-2) 0; list-style: none; display: flex; align-items: center; gap: var(--space-2); transition: color var(--transition-fast); }
	.advanced-toggle__summary::-webkit-details-marker { display: none; }
	.advanced-toggle__summary::before { content: '▸'; transition: transform var(--transition-fast); display: inline-block; }
	.advanced-toggle[open] > .advanced-toggle__summary::before { transform: rotate(90deg); }
	.advanced-toggle__summary:hover { color: var(--red-500); }
	.advanced-toggle__content { padding-top: var(--space-4); }

	/* Result panel */
	.sim-result__header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: var(--space-6); flex-wrap: wrap; gap: var(--space-3); }
	.sim-result__title { font-family: var(--font-display); font-size: var(--text-2xl); }
	.sim-result__subtitle { font-size: var(--text-sm); color: var(--color-text-muted); margin-top: var(--space-1); }
	.btn--sm { padding: var(--space-2) var(--space-4); font-size: var(--text-xs); }

	.sim-summary { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-4); margin-bottom: var(--space-6); }
	.sim-summary__item { background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-4); text-align: center; }
	.sim-summary__label { display: block; font-size: var(--text-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600; margin-bottom: var(--space-2); }
	.sim-summary__value { font-family: var(--font-display); font-size: var(--text-lg); color: var(--color-text); }
	.sim-summary__value--primary { color: var(--color-primary); font-size: var(--text-xl); }
	.sim-summary__value--accent { color: var(--color-accent); }

	/* Breakdown */
	.sim-breakdown { background: var(--warm-50); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-5); margin-bottom: var(--space-6); }
	.sim-breakdown__title { font-family: var(--font-body); font-size: var(--text-sm); font-weight: 700; margin-bottom: var(--space-3); color: var(--color-text-secondary); text-transform: uppercase; letter-spacing: 0.04em; }
	.sim-breakdown__grid { display: flex; flex-direction: column; gap: var(--space-2); }
	.sim-breakdown__row { display: flex; justify-content: space-between; align-items: center; font-size: var(--text-sm); color: var(--color-text-secondary); padding: var(--space-2) 0; border-bottom: 1px dashed var(--warm-200); }
	.sim-breakdown__row:last-child { border-bottom: none; }
	.sim-breakdown__row--highlight { background: var(--green-50); margin: var(--space-1) calc(-1 * var(--space-3)); padding: var(--space-2) var(--space-3); border-radius: var(--radius-sm); border-bottom: none; }
	.sim-breakdown__row--total { background: var(--red-50); margin: var(--space-1) calc(-1 * var(--space-3)); padding: var(--space-2) var(--space-3); border-radius: var(--radius-sm); border-bottom: none; color: var(--color-primary); font-weight: 600; }
	.sim-breakdown__val { font-weight: 600; font-family: var(--font-body); }
	.sim-breakdown__val--bold { font-weight: 700; color: var(--color-text); }

	.sim-table-wrap { overflow-x: auto; border: 1px solid var(--color-border); border-radius: var(--radius-lg); }
	.sim-table { width: 100%; border-collapse: collapse; font-size: var(--text-sm); }
	.sim-table th { background: var(--color-bg-alt); padding: var(--space-3) var(--space-4); text-align: left; font-weight: 600; font-size: var(--text-xs); text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-secondary); border-bottom: 1px solid var(--color-border); white-space: nowrap; }
	.sim-table td { padding: var(--space-3) var(--space-4); border-bottom: 1px solid var(--color-border); white-space: nowrap; color: var(--color-text-secondary); }
	.sim-table tr:last-child td { border-bottom: none; }
	.sim-table tr:hover td { background: var(--warm-50); }
	.sim-table tfoot td { background: var(--color-bg-alt); font-weight: 700; border-top: 2px solid var(--color-border); color: var(--color-text); }
	.sim-table .col-bold { font-weight: 700; color: var(--color-text); }
	.sim-table .grace-row td { background: var(--gold-50); color: var(--gold-700); font-style: italic; }

	.sim-disclaimer { font-size: var(--text-xs); color: var(--color-text-muted); margin-top: var(--space-4); font-style: italic; }

	@media (max-width: 1100px) {
		.sim-layout {
			grid-template-columns: 340px 1fr;
			gap: var(--space-6);
		}

		.sim-summary {
			gap: var(--space-3);
		}
	}

	@media (max-width: 960px) {
		.sim-layout { grid-template-columns: 1fr; }
		.sim-input { position: static; }
		.sim-summary { grid-template-columns: repeat(2, 1fr); }
	}

	@media (max-width: 768px) {
		.page-header {
			padding: 116px 0 var(--space-12);
		}

		.page-header__subtitle {
			font-size: var(--text-base);
		}

		.sim-result__header {
			flex-direction: column;
			align-items: stretch;
		}

		.print-btn {
			width: 100%;
			justify-content: center;
		}
	}

	@media (max-width: 480px) {
		.sim-summary { grid-template-columns: 1fr; }

		.sim-input {
			padding: var(--space-5);
		}

		.sim-breakdown {
			padding: var(--space-4);
		}

		.sim-table {
			font-size: var(--text-xs);
		}

		.sim-table th,
		.sim-table td {
			padding: var(--space-2) var(--space-3);
			white-space: normal;
		}
	}

	@media (max-width: 900px) and (orientation: landscape) and (max-height: 560px) {
		.page-header {
			padding: 90px 0 var(--space-10);
		}

		.sim-input {
			position: static;
		}
	}

	@media print {
		.page-header, .sim-input, .print-btn, .sim-disclaimer { display: none !important; }
		.sim-layout { grid-template-columns: 1fr !important; }
		.sim-result { break-inside: avoid; }
	}
</style>
