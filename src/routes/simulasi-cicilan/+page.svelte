<script lang="ts">
	let jumlahPinjaman = $state(5000000);
	let tenor = $state(12);
	let bunga = $state(1.5);
	let hasilSimulasi = $state<{ bulan: number; cicilan: number; pokok: number; bungaBulan: number; sisa: number }[]>([]);
	let totalBayar = $state(0);
	let cicilanPerBulan = $state(0);

	function formatRupiah(n: number) {
		return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n);
	}

	function hitung() {
		const bungaBulanan = bunga / 100;
		const cicilan = (jumlahPinjaman * bungaBulanan * Math.pow(1 + bungaBulanan, tenor)) / (Math.pow(1 + bungaBulanan, tenor) - 1);
		cicilanPerBulan = Math.round(cicilan);
		totalBayar = Math.round(cicilan * tenor);

		const rows = [];
		let sisa = jumlahPinjaman;
		for (let i = 1; i <= tenor; i++) {
			const bBulan = Math.round(sisa * bungaBulanan);
			const pokok = Math.round(cicilan - bBulan);
			sisa = Math.max(0, sisa - pokok);
			rows.push({ bulan: i, cicilan: Math.round(cicilan), pokok, bungaBulan: bBulan, sisa: Math.round(sisa) });
		}
		hasilSimulasi = rows;
	}

	$effect(() => { jumlahPinjaman; tenor; bunga; hitung(); });
</script>

<svelte:head>
	<title>Simulasi Cicilan — KKMP Awirarangan</title>
</svelte:head>

<section class="page-header">
	<div class="page-header__bg"></div>
	<div class="container page-header__content">
		<span class="badge badge--gold">🧮 Kalkulator</span>
		<h1 class="page-header__title">Simulasi Cicilan</h1>
		<p class="page-header__subtitle">Hitung perkiraan cicilan pinjaman koperasi Anda.</p>
	</div>
</section>

<section class="section">
	<div class="container">
		<div class="sim-layout">
			<!-- Input Panel -->
			<div class="sim-input card">
				<h3 class="sim-input__title">Parameter Pinjaman</h3>

				<div class="field">
					<label class="field__label" for="jumlah">Jumlah Pinjaman</label>
					<div class="field__value">{formatRupiah(jumlahPinjaman)}</div>
					<input type="range" id="jumlah" bind:value={jumlahPinjaman} min={1000000} max={50000000} step={500000} class="field__range" />
					<div class="field__range-labels"><span>Rp 1 Jt</span><span>Rp 50 Jt</span></div>
				</div>

				<div class="field">
					<label class="field__label" for="tenor">Tenor (Bulan)</label>
					<div class="field__value">{tenor} Bulan</div>
					<input type="range" id="tenor" bind:value={tenor} min={3} max={24} step={1} class="field__range" />
					<div class="field__range-labels"><span>3 Bln</span><span>24 Bln</span></div>
				</div>

				<div class="field">
					<label class="field__label" for="bunga">Bunga per Bulan (%)</label>
					<div class="field__value">{bunga}%</div>
					<input type="range" id="bunga" bind:value={bunga} min={0.5} max={3} step={0.1} class="field__range" />
					<div class="field__range-labels"><span>0.5%</span><span>3%</span></div>
				</div>
			</div>

			<!-- Result Panel -->
			<div class="sim-result">
				<div class="sim-summary">
					<div class="sim-summary__item">
						<span class="sim-summary__label">Cicilan per Bulan</span>
						<span class="sim-summary__value">{formatRupiah(cicilanPerBulan)}</span>
					</div>
					<div class="sim-summary__item">
						<span class="sim-summary__label">Total Pembayaran</span>
						<span class="sim-summary__value">{formatRupiah(totalBayar)}</span>
					</div>
					<div class="sim-summary__item">
						<span class="sim-summary__label">Total Bunga</span>
						<span class="sim-summary__value sim-summary__value--accent">{formatRupiah(totalBayar - jumlahPinjaman)}</span>
					</div>
				</div>

				{#if hasilSimulasi.length > 0}
					<div class="sim-table-wrap">
						<table class="sim-table">
							<thead>
								<tr>
									<th>Bulan</th>
									<th>Cicilan</th>
									<th>Pokok</th>
									<th>Bunga</th>
									<th>Sisa</th>
								</tr>
							</thead>
							<tbody>
								{#each hasilSimulasi as row}
									<tr>
										<td>{row.bulan}</td>
										<td>{formatRupiah(row.cicilan)}</td>
										<td>{formatRupiah(row.pokok)}</td>
										<td>{formatRupiah(row.bungaBulan)}</td>
										<td>{formatRupiah(row.sisa)}</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				{/if}

				<p class="sim-disclaimer">* Simulasi ini hanya perkiraan. Bunga dan syarat aktual ditentukan oleh kebijakan koperasi.</p>
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
	.sim-input__title { font-family: var(--font-body); font-size: var(--text-lg); font-weight: 700; margin-bottom: var(--space-6); }

	.field { margin-bottom: var(--space-6); }
	.field__label { display: block; font-size: var(--text-sm); font-weight: 600; color: var(--color-text-secondary); margin-bottom: var(--space-2); }
	.field__value { font-family: var(--font-display); font-size: var(--text-2xl); color: var(--color-primary); margin-bottom: var(--space-3); }
	.field__range { width: 100%; height: 6px; -webkit-appearance: none; appearance: none; background: var(--warm-200); border-radius: 3px; outline: none; cursor: pointer; }
	.field__range::-webkit-slider-thumb { -webkit-appearance: none; width: 20px; height: 20px; border-radius: 50%; background: var(--color-primary); border: 3px solid white; box-shadow: 0 2px 8px rgba(185,28,28,0.3); cursor: pointer; }
	.field__range-labels { display: flex; justify-content: space-between; font-size: var(--text-xs); color: var(--color-text-muted); margin-top: var(--space-1); }

	.sim-summary { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-4); margin-bottom: var(--space-6); }
	.sim-summary__item { background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-4); text-align: center; }
	.sim-summary__label { display: block; font-size: var(--text-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600; margin-bottom: var(--space-2); }
	.sim-summary__value { font-family: var(--font-display); font-size: var(--text-xl); color: var(--color-text); }
	.sim-summary__value--accent { color: var(--color-accent); }

	.sim-table-wrap { overflow-x: auto; border: 1px solid var(--color-border); border-radius: var(--radius-lg); }
	.sim-table { width: 100%; border-collapse: collapse; font-size: var(--text-sm); }
	.sim-table th { background: var(--color-bg-alt); padding: var(--space-3) var(--space-4); text-align: left; font-weight: 600; font-size: var(--text-xs); text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-secondary); border-bottom: 1px solid var(--color-border); white-space: nowrap; }
	.sim-table td { padding: var(--space-3) var(--space-4); border-bottom: 1px solid var(--color-border); white-space: nowrap; color: var(--color-text-secondary); }
	.sim-table tr:last-child td { border-bottom: none; }
	.sim-table tr:hover td { background: var(--warm-50); }

	.sim-disclaimer { font-size: var(--text-xs); color: var(--color-text-muted); margin-top: var(--space-4); font-style: italic; }

	@media (max-width: 960px) {
		.sim-layout { grid-template-columns: 1fr; }
		.sim-input { position: static; }
		.sim-summary { grid-template-columns: 1fr; }
	}
</style>
