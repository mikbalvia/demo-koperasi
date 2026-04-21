<script lang="ts">
	import { profil } from '$lib/data/content';
	import { onMount } from 'svelte';
	import { User, Building2, Phone, Upload, ArrowRight, Eye, EyeOff } from '@lucide/svelte';

	let showPassword = $state(false);
	let showConfirmPassword = $state(false);
	let dragOver = $state(false);
	let fileName = $state('');

	function handleFileDrop(e: DragEvent) {
		e.preventDefault();
		dragOver = false;
		const files = e.dataTransfer?.files;
		if (files && files.length > 0) {
			fileName = files[0].name;
		}
	}

	function handleFileSelect(e: Event) {
		const input = e.target as HTMLInputElement;
		if (input.files && input.files.length > 0) {
			fileName = input.files[0].name;
		}
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
	<title>Daftar Anggota — KKMP Awirarangan</title>
	<meta name="description" content="Pendaftaran anggota baru Koperasi Kelurahan Merah Putih Awirarangan." />
</svelte:head>

<!-- Hero / Header -->
<section class="register-hero">
	<div class="register-hero__bg"></div>
	<div class="register-hero__pattern"></div>
	<div class="register-hero__orbs">
		<div class="register-hero__orb register-hero__orb--1"></div>
		<div class="register-hero__orb register-hero__orb--2"></div>
	</div>
	<div class="container register-hero__content">
		<div class="register-hero__brand">
			<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="register-hero__logo">
				<rect width="40" height="40" rx="8" fill="url(#regLogoGrad)" />
				<text x="20" y="28" text-anchor="middle" font-family="serif" font-size="22" font-weight="bold" fill="white">K</text>
				<defs>
					<linearGradient id="regLogoGrad" x1="0" y1="0" x2="40" y2="40">
						<stop stop-color="#fca5a5" />
						<stop offset="1" stop-color="#f87171" />
					</linearGradient>
				</defs>
			</svg>
			<span>Koperasi Merah Putih</span>
		</div>
		<p class="register-hero__tagline">"Bersama membangun ekonomi kerakyatan yang mandiri, adil, dan makmur berlandaskan semangat gotong royong."</p>
	</div>
</section>

<!-- Form Section -->
<section class="section register-section">
	<div class="container">
		<div class="register-card animate-on-scroll">
			<div class="register-card__header">
				<h1 class="register-card__title">Pendaftaran Anggota</h1>
				<p class="register-card__subtitle">Lengkapi data di bawah ini untuk memulai keanggotaan Anda.</p>
			</div>

			<form class="register-form" id="register-form">
				<!-- Data Pribadi -->
				<div class="form-section">
					<div class="form-section__header">
						<div class="form-section__icon"><User size={20} strokeWidth={1.5} /></div>
						<h2 class="form-section__title">Data Pribadi</h2>
					</div>
					<div class="form-grid">
						<div class="form-group">
							<label for="nama_lengkap" class="form-label">Nama Lengkap <span class="required">*</span></label>
							<input type="text" id="nama_lengkap" name="nama_lengkap" class="form-input" placeholder="Masukkan nama lengkap sesuai KTP" required />
						</div>
						<div class="form-group">
							<label for="nik" class="form-label">NIK (No. KTP) <span class="required">*</span></label>
							<input type="text" id="nik" name="nik" class="form-input" placeholder="Masukkan 16 digit NIK" maxlength="16" required />
						</div>
						<div class="form-group">
							<label for="tempat_lahir" class="form-label">Tempat Lahir <span class="required">*</span></label>
							<input type="text" id="tempat_lahir" name="tempat_lahir" class="form-input" placeholder="Kota/kabupaten kelahiran" required />
						</div>
						<div class="form-group">
							<label for="tanggal_lahir" class="form-label">Tanggal Lahir <span class="required">*</span></label>
							<input type="date" id="tanggal_lahir" name="tanggal_lahir" class="form-input" required />
						</div>
						<div class="form-group">
							<label for="jenis_kelamin" class="form-label">Jenis Kelamin <span class="required">*</span></label>
							<select id="jenis_kelamin" name="jenis_kelamin" class="form-input" required>
								<option value="" disabled selected>Pilih jenis kelamin</option>
								<option value="laki-laki">Laki-laki</option>
								<option value="perempuan">Perempuan</option>
							</select>
						</div>
						<div class="form-group">
							<label for="agama" class="form-label">Agama <span class="required">*</span></label>
							<select id="agama" name="agama" class="form-input" required>
								<option value="" disabled selected>Pilih agama</option>
								<option value="islam">Islam</option>
								<option value="kristen">Kristen</option>
								<option value="katolik">Katolik</option>
								<option value="hindu">Hindu</option>
								<option value="buddha">Buddha</option>
								<option value="konghucu">Konghucu</option>
							</select>
						</div>
						<div class="form-group form-group--full">
							<label for="alamat" class="form-label">Alamat Lengkap <span class="required">*</span></label>
							<textarea id="alamat" name="alamat" class="form-input form-textarea" rows="3" placeholder="Masukkan alamat lengkap sesuai KTP" required></textarea>
						</div>
						<div class="form-group">
							<label for="rt" class="form-label">RT</label>
							<input type="text" id="rt" name="rt" class="form-input" placeholder="Contoh: 001" />
						</div>
						<div class="form-group">
							<label for="rw" class="form-label">RW</label>
							<input type="text" id="rw" name="rw" class="form-input" placeholder="Contoh: 003" />
						</div>
						<div class="form-group">
							<label for="kelurahan" class="form-label">Kelurahan/Desa <span class="required">*</span></label>
							<input type="text" id="kelurahan" name="kelurahan" class="form-input" placeholder="Nama kelurahan/desa" required />
						</div>
						<div class="form-group">
							<label for="kecamatan" class="form-label">Kecamatan <span class="required">*</span></label>
							<input type="text" id="kecamatan" name="kecamatan" class="form-input" placeholder="Nama kecamatan" required />
						</div>
						<div class="form-group">
							<label for="pekerjaan" class="form-label">Pekerjaan <span class="required">*</span></label>
							<input type="text" id="pekerjaan" name="pekerjaan" class="form-input" placeholder="Jenis pekerjaan saat ini" required />
						</div>
						<div class="form-group">
							<label for="penghasilan" class="form-label">Penghasilan per Bulan</label>
							<select id="penghasilan" name="penghasilan" class="form-input">
								<option value="" disabled selected>Pilih rentang penghasilan</option>
								<option value="<1jt">Kurang dari Rp 1.000.000</option>
								<option value="1-3jt">Rp 1.000.000 - Rp 3.000.000</option>
								<option value="3-5jt">Rp 3.000.000 - Rp 5.000.000</option>
								<option value="5-10jt">Rp 5.000.000 - Rp 10.000.000</option>
								<option value=">10jt">Lebih dari Rp 10.000.000</option>
							</select>
						</div>
					</div>
				</div>

				<!-- Data Badan Usaha -->
				<div class="form-section">
					<div class="form-section__header">
						<div class="form-section__icon form-section__icon--green"><Building2 size={20} strokeWidth={1.5} /></div>
						<h2 class="form-section__title">Data Badan Usaha</h2>
					</div>
					<div class="form-grid">
						<div class="form-group">
							<label for="nama_usaha" class="form-label">Nama Usaha</label>
							<input type="text" id="nama_usaha" name="nama_usaha" class="form-input" placeholder="Nama usaha (jika ada)" />
						</div>
						<div class="form-group">
							<label for="jenis_usaha" class="form-label">Jenis Usaha</label>
							<select id="jenis_usaha" name="jenis_usaha" class="form-input">
								<option value="" disabled selected>Pilih jenis usaha</option>
								<option value="perdagangan">Perdagangan</option>
								<option value="jasa">Jasa</option>
								<option value="pertanian">Pertanian</option>
								<option value="peternakan">Peternakan</option>
								<option value="industri">Industri Kecil/Rumahan</option>
								<option value="lainnya">Lainnya</option>
							</select>
						</div>
						<div class="form-group form-group--full">
							<label for="alamat_usaha" class="form-label">Alamat Usaha</label>
							<textarea id="alamat_usaha" name="alamat_usaha" class="form-input form-textarea" rows="2" placeholder="Alamat tempat usaha"></textarea>
						</div>
					</div>
				</div>

				<!-- Kontak & Dokumen -->
				<div class="form-section">
					<div class="form-section__header">
						<div class="form-section__icon form-section__icon--gold"><Phone size={20} strokeWidth={1.5} /></div>
						<h2 class="form-section__title">Kontak & Dokumen</h2>
					</div>
					<div class="form-grid">
						<div class="form-group">
							<label for="no_hp" class="form-label">No. HP / WhatsApp <span class="required">*</span></label>
							<input type="tel" id="no_hp" name="no_hp" class="form-input" placeholder="Contoh: 08123456789" required />
						</div>
						<div class="form-group">
							<label for="email" class="form-label">Email</label>
							<input type="email" id="email" name="email" class="form-input" placeholder="Alamat email aktif" />
						</div>
						<div class="form-group">
							<label for="password" class="form-label">Password <span class="required">*</span></label>
							<div class="form-input-wrapper">
								<input type={showPassword ? 'text' : 'password'} id="password" name="password" class="form-input form-input--icon" placeholder="Buat password" required />
								<button type="button" class="form-input-toggle" onclick={() => showPassword = !showPassword}>
									{#if showPassword}<EyeOff size={18} strokeWidth={1.5} />{:else}<Eye size={18} strokeWidth={1.5} />{/if}
								</button>
							</div>
						</div>
						<div class="form-group">
							<label for="password_confirm" class="form-label">Konfirmasi Password <span class="required">*</span></label>
							<div class="form-input-wrapper">
								<input type={showConfirmPassword ? 'text' : 'password'} id="password_confirm" name="password_confirm" class="form-input form-input--icon" placeholder="Ulangi password" required />
								<button type="button" class="form-input-toggle" onclick={() => showConfirmPassword = !showConfirmPassword}>
									{#if showConfirmPassword}<EyeOff size={18} strokeWidth={1.5} />{:else}<Eye size={18} strokeWidth={1.5} />{/if}
								</button>
							</div>
						</div>

						<!-- File Upload -->
						<div class="form-group form-group--full">
							<label for="foto_ktp" class="form-label">Upload Foto KTP <span class="required">*</span></label>
							<div
								class="file-upload"
								class:drag-over={dragOver}
								ondragover={(e) => { e.preventDefault(); dragOver = true; }}
								ondragleave={() => dragOver = false}
								ondrop={handleFileDrop}
								role="button"
								tabindex="0"
							>
								<input type="file" id="foto_ktp" name="foto_ktp" accept="image/*,.pdf" class="file-upload__input" onchange={handleFileSelect} required />
								<div class="file-upload__content">
									<div class="file-upload__icon"><Upload size={28} strokeWidth={1.5} /></div>
									{#if fileName}
										<p class="file-upload__name">{fileName}</p>
									{:else}
										<p class="file-upload__text">Klik untuk upload atau drag & drop</p>
										<p class="file-upload__hint">SVG, PNG, JPG (MAX. 5MB)</p>
									{/if}
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- Submit -->
				<div class="register-form__actions">
					<button type="submit" class="btn btn--primary btn--lg register-form__submit" id="register-submit">
						Daftar Sekarang
						<ArrowRight size={18} strokeWidth={2} />
					</button>
				</div>
			</form>

			<div class="register-card__footer">
				<p>Sudah punya akun? <a href="/login" class="register-card__link">Login disini</a></p>
			</div>
		</div>
	</div>
</section>

<style>
	/* Hero */
	.register-hero {
		position: relative;
		padding: 120px 0 var(--space-10);
		overflow: hidden;
	}

	.register-hero__bg {
		position: absolute;
		inset: 0;
		background: linear-gradient(150deg, var(--red-800), var(--red-900), var(--warm-900));
	}

	.register-hero__pattern {
		position: absolute;
		inset: 0;
		opacity: 0.05;
		background-image: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M40 0L44 4L40 8L36 4zM0 40L4 44L0 48L-4 44zM80 40L84 44L80 48L76 44zM40 80L44 84L40 88L36 84z'/%3E%3C/g%3E%3C/svg%3E");
	}

	.register-hero__orbs {
		position: absolute;
		inset: 0;
		overflow: hidden;
	}

	.register-hero__orb {
		position: absolute;
		border-radius: 50%;
		filter: blur(80px);
		animation: float 8s ease-in-out infinite;
	}

	.register-hero__orb--1 {
		width: 300px;
		height: 300px;
		background: rgba(217, 119, 6, 0.15);
		top: -80px;
		right: -60px;
	}

	.register-hero__orb--2 {
		width: 200px;
		height: 200px;
		background: rgba(4, 120, 87, 0.1);
		bottom: -40px;
		left: -40px;
		animation-delay: 3s;
	}

	.register-hero__content {
		position: relative;
		z-index: 1;
		text-align: center;
	}

	.register-hero__brand {
		display: inline-flex;
		align-items: center;
		gap: var(--space-3);
		color: white;
		font-family: var(--font-display);
		font-size: var(--text-xl);
		margin-bottom: var(--space-4);
	}

	.register-hero__brand :global(svg) {
		width: 40px;
		height: 40px;
	}

	.register-hero__tagline {
		color: rgba(255, 255, 255, 0.65);
		font-size: var(--text-sm);
		font-style: italic;
		max-width: 500px;
		margin: 0 auto;
	}

	/* Register Section */
	.register-section {
		margin-top: -var(--space-8);
	}

	.register-card {
		max-width: 780px;
		margin: 0 auto;
		background: var(--color-surface);
		border-radius: var(--radius-2xl);
		border: 1px solid var(--color-border);
		box-shadow: var(--shadow-xl);
		overflow: hidden;
	}

	.register-card__header {
		text-align: center;
		padding: var(--space-10) var(--space-8) var(--space-6);
		border-bottom: 1px solid var(--color-border);
		background: linear-gradient(180deg, var(--warm-50), transparent);
	}

	.register-card__title {
		font-size: var(--text-3xl);
		color: var(--color-text);
		margin-bottom: var(--space-2);
	}

	.register-card__subtitle {
		color: var(--color-text-secondary);
		font-size: var(--text-sm);
	}

	/* Form */
	.register-form {
		padding: var(--space-8);
	}

	.form-section {
		margin-bottom: var(--space-10);
	}

	.form-section:last-of-type {
		margin-bottom: var(--space-6);
	}

	.form-section__header {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		margin-bottom: var(--space-6);
		padding-bottom: var(--space-3);
		border-bottom: 2px solid var(--color-border);
	}

	.form-section__icon {
		width: 40px;
		height: 40px;
		border-radius: var(--radius-lg);
		background: linear-gradient(135deg, var(--red-50), var(--red-100));
		color: var(--red-700);
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.form-section__icon--green {
		background: linear-gradient(135deg, var(--green-50), var(--green-100));
		color: var(--green-700);
	}

	.form-section__icon--gold {
		background: linear-gradient(135deg, var(--gold-50), var(--gold-100));
		color: var(--gold-700);
	}

	.form-section__title {
		font-family: var(--font-body);
		font-size: var(--text-lg);
		font-weight: 700;
		color: var(--color-text);
	}

	.form-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--space-4) var(--space-5);
	}

	.form-group--full {
		grid-column: 1 / -1;
	}

	.form-label {
		display: block;
		font-size: var(--text-sm);
		font-weight: 600;
		color: var(--color-text);
		margin-bottom: var(--space-2);
	}

	.required {
		color: var(--red-500);
	}

	.form-input {
		width: 100%;
		padding: var(--space-3) var(--space-4);
		font-family: var(--font-body);
		font-size: var(--text-sm);
		color: var(--color-text);
		background: var(--color-surface);
		border: 1.5px solid var(--color-border);
		border-radius: var(--radius-lg);
		transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
		outline: none;
	}

	.form-input:focus {
		border-color: var(--red-400);
		box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
	}

	.form-input::placeholder {
		color: var(--color-text-muted);
	}

	.form-textarea {
		resize: vertical;
		min-height: 80px;
	}

	.form-input-wrapper {
		position: relative;
	}

	.form-input--icon {
		padding-right: var(--space-10);
	}

	.form-input-toggle {
		position: absolute;
		right: var(--space-3);
		top: 50%;
		transform: translateY(-50%);
		color: var(--color-text-muted);
		padding: var(--space-1);
		display: flex;
		transition: color var(--transition-fast);
	}

	.form-input-toggle:hover {
		color: var(--color-text-secondary);
	}

	/* File Upload */
	.file-upload {
		position: relative;
		border: 2px dashed var(--color-border);
		border-radius: var(--radius-xl);
		padding: var(--space-8) var(--space-6);
		text-align: center;
		cursor: pointer;
		transition: border-color var(--transition-fast), background var(--transition-fast);
	}

	.file-upload:hover,
	.file-upload.drag-over {
		border-color: var(--red-400);
		background: var(--red-50);
	}

	.file-upload__input {
		position: absolute;
		inset: 0;
		opacity: 0;
		cursor: pointer;
	}

	.file-upload__content {
		pointer-events: none;
	}

	.file-upload__icon {
		color: var(--color-text-muted);
		margin-bottom: var(--space-2);
		display: flex;
		justify-content: center;
	}

	.file-upload__text {
		font-size: var(--text-sm);
		font-weight: 600;
		color: var(--color-text-secondary);
	}

	.file-upload__hint {
		font-size: var(--text-xs);
		color: var(--color-text-muted);
		margin-top: var(--space-1);
	}

	.file-upload__name {
		font-size: var(--text-sm);
		font-weight: 600;
		color: var(--green-700);
	}

	/* Actions */
	.register-form__actions {
		text-align: center;
		padding-top: var(--space-4);
	}

	.register-form__submit {
		min-width: 220px;
	}

	/* Footer */
	.register-card__footer {
		text-align: center;
		padding: var(--space-5) var(--space-8);
		border-top: 1px solid var(--color-border);
		background: var(--warm-50);
		font-size: var(--text-sm);
		color: var(--color-text-secondary);
	}

	.register-card__link {
		color: var(--color-primary);
		font-weight: 600;
		transition: color var(--transition-fast);
	}

	.register-card__link:hover {
		color: var(--red-500);
		text-decoration: underline;
	}

	/* Responsive */
	@media (max-width: 640px) {
		.register-form {
			padding: var(--space-5);
		}

		.form-grid {
			grid-template-columns: 1fr;
		}

		.register-card__header {
			padding: var(--space-6) var(--space-5) var(--space-4);
		}

		.register-hero {
			padding: 100px 0 var(--space-6);
		}
	}
</style>
