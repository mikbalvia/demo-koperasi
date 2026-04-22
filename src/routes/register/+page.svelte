<script lang="ts">
	import { onMount } from 'svelte';
	import { User, Building2, Phone, Upload, ArrowRight, UserCircle2 } from '@lucide/svelte';

	type RegistrationType = 'individu' | 'kelompok';
	type RegisterState = { kind: 'success' | 'error'; text: string } | null;
	type RegisterErrors = {
		registrationType?: string;
		namaLengkap?: string;
		nik?: string;
		tempatLahir?: string;
		tanggalLahir?: string;
		jenisKelamin?: string;
		pekerjaan?: string;
		namaIbu?: string;
		namaPerwakilan?: string;
		jabatanPerwakilan?: string;
		whatsapp?: string;
		alamat?: string;
		identitas?: string;
	};

	let registrationType = $state<RegistrationType>('individu');
	let namaLengkap = $state('');
	let nik = $state('');
	let tempatLahir = $state('');
	let tanggalLahir = $state('');
	let jenisKelamin = $state('');
	let pekerjaan = $state('');
	let namaIbu = $state('');
	let namaPerwakilan = $state('');
	let jabatanPerwakilan = $state('');
	let whatsapp = $state('');
	let email = $state('');
	let alamat = $state('');
	let selectedFile = $state<File | null>(null);
	let fileName = $state('');
	let dragOver = $state(false);
	let loading = $state(false);
	let registerState = $state<RegisterState>(null);
	let errors = $state<RegisterErrors>({});

	function isKelompok() {
		return registrationType === 'kelompok';
	}

	function setRegistrationType(type: RegistrationType) {
		registrationType = type;
		registerState = null;
		errors = {};

		if (type === 'individu') {
			namaPerwakilan = '';
			jabatanPerwakilan = '';
		} else {
			tempatLahir = '';
			tanggalLahir = '';
			jenisKelamin = '';
			namaIbu = '';
		}
	}

	function setSelectedFile(file: File | null) {
		selectedFile = file;
		fileName = file?.name ?? '';
	}

	function validateFile(file: File | null) {
		if (!file) {
			return 'Dokumen identitas wajib diunggah.';
		}

		const validTypes = ['image/svg+xml', 'image/png', 'image/jpeg'];
		if (!validTypes.includes(file.type)) {
			return 'Format dokumen harus SVG, PNG, atau JPG.';
		}

		if (file.size > 5 * 1024 * 1024) {
			return 'Ukuran dokumen maksimal 5MB.';
		}

		return '';
	}

	function handleFileDrop(e: DragEvent) {
		e.preventDefault();
		dragOver = false;
		const files = e.dataTransfer?.files;
		if (files && files.length > 0) {
			setSelectedFile(files[0]);
			errors.identitas = validateFile(files[0]) || undefined;
		}
	}

	function handleFileSelect(e: Event) {
		const input = e.target as HTMLInputElement;
		const file = input.files?.[0] ?? null;
		setSelectedFile(file);
		errors.identitas = validateFile(file) || undefined;
	}

	function validateRegister() {
		errors = {};

		if (!registrationType) errors.registrationType = 'Tipe pendaftaran wajib dipilih.';
		if (!namaLengkap.trim()) errors.namaLengkap = 'Nama lengkap wajib diisi.';
		if (!/^\d{16}$/.test(nik.trim())) errors.nik = 'NIK harus terdiri dari 16 digit angka.';
		if (!pekerjaan.trim()) errors.pekerjaan = 'Pekerjaan saat ini wajib diisi.';

		if (registrationType === 'individu') {
			if (!tempatLahir.trim()) errors.tempatLahir = 'Tempat lahir wajib diisi.';
			if (!tanggalLahir) errors.tanggalLahir = 'Tanggal lahir wajib diisi.';
			if (!jenisKelamin) errors.jenisKelamin = 'Jenis kelamin wajib dipilih.';
			if (!namaIbu.trim()) errors.namaIbu = 'Nama ibu kandung wajib diisi.';
		} else {
			if (!namaPerwakilan.trim()) errors.namaPerwakilan = 'Nama penanggung jawab wajib diisi.';
			if (!jabatanPerwakilan.trim()) errors.jabatanPerwakilan = 'Jabatan penanggung jawab wajib diisi.';
		}

		if (!/^08\d{8,13}$/.test(whatsapp.trim())) errors.whatsapp = 'Masukkan nomor WhatsApp aktif yang valid.';
		if (!alamat.trim()) errors.alamat = 'Alamat lengkap wajib diisi.';

		const fileError = validateFile(selectedFile);
		if (fileError) errors.identitas = fileError;

		return Object.keys(errors).length === 0;
	}

	async function handleRegister(e: SubmitEvent) {
		e.preventDefault();
		registerState = null;

		if (!validateRegister()) {
			registerState = {
				kind: 'error',
				text: 'Pendaftaran gagal. Periksa kembali field yang masih belum valid.'
			};
			return;
		}

		loading = true;
		await new Promise((resolve) => setTimeout(resolve, 1200));
		loading = false;
		registerState = {
			kind: 'success',
			text: `Pendaftaran simulasi ${registrationType} berhasil. Saat login pertama, gunakan NIK sebagai password.`
		};
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
	<title>Daftar Anggota - KKMP Awirarangan</title>
	<meta name="description" content="Pendaftaran anggota baru Koperasi Kelurahan Merah Putih Awirarangan." />
</svelte:head>

<section class="register-page">
	<div class="register-brand">
		<div class="register-brand__bg"></div>
		<div class="register-brand__pattern"></div>
		<div class="register-brand__orbs">
			<div class="register-brand__orb register-brand__orb--1"></div>
			<div class="register-brand__orb register-brand__orb--2"></div>
		</div>
		<div class="register-brand__content">
			<div class="register-brand__logo">
				<svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
					<rect width="56" height="56" rx="12" fill="url(#registerLogoGrad)" />
					<text x="28" y="38" text-anchor="middle" font-family="serif" font-size="30" font-weight="bold" fill="white">K</text>
					<defs>
						<linearGradient id="registerLogoGrad" x1="0" y1="0" x2="56" y2="56">
							<stop stop-color="#fca5a5" />
							<stop offset="1" stop-color="#f87171" />
						</linearGradient>
					</defs>
				</svg>
			</div>
			<h2 class="register-brand__title">Bergabung Menjadi Anggota</h2>
			<p class="register-brand__text">
				Lengkapi data pendaftaran untuk mulai mengakses layanan simpanan, pinjaman, dan program koperasi.
			</p>
		</div>
	</div>

	<div class="register-form-panel">
		<div class="register-form-panel__inner">
			<div class="register-mobile-brand">
				<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
					<rect width="40" height="40" rx="8" fill="url(#registerMobileGrad)" />
					<text x="20" y="28" text-anchor="middle" font-family="serif" font-size="22" font-weight="bold" fill="white">K</text>
					<defs>
						<linearGradient id="registerMobileGrad" x1="0" y1="0" x2="40" y2="40">
							<stop stop-color="#dc2626" />
							<stop offset="1" stop-color="#991b1b" />
						</linearGradient>
					</defs>
				</svg>
				<span>Koperasi Merah Putih</span>
			</div>

			<div class="register-card animate-on-scroll">
			<div class="register-card__header">
				<h1 class="register-card__title">Pendaftaran Anggota</h1>
				<p class="register-card__subtitle">Lengkapi data di bawah ini untuk memulai keanggotaan Anda.</p>
			</div>

			<form class="register-form" id="register-form" onsubmit={handleRegister} novalidate>
				<div class="form-section">
					<div class="form-section__header">
						<div class="form-section__icon form-section__icon--gold"><Building2 size={20} strokeWidth={1.5} /></div>
						<h2 class="form-section__title">Tipe Pendaftaran</h2>
					</div>
					<div class="registration-type-grid">
						<button
							type="button"
							class="registration-type"
							class:active={registrationType === 'individu'}
							onclick={() => setRegistrationType('individu')}
						>
							<span class="registration-type__icon"><UserCircle2 size={18} strokeWidth={1.8} /></span>
							<span class="registration-type__text">Individu</span>
						</button>
						<button
							type="button"
							class="registration-type"
							class:active={registrationType === 'kelompok'}
							onclick={() => setRegistrationType('kelompok')}
						>
							<span class="registration-type__icon"><Building2 size={18} strokeWidth={1.8} /></span>
							<span class="registration-type__text">Kelompok/Badan</span>
						</button>
					</div>
					{#if errors.registrationType}<p class="form-error">{errors.registrationType}</p>{/if}
				</div>

				<div class="form-section">
					<div class="form-section__header">
						<div class="form-section__icon" class:form-section__icon--gold={isKelompok()}>
							{#if isKelompok()}
								<Building2 size={20} strokeWidth={1.5} />
							{:else}
								<User size={20} strokeWidth={1.5} />
							{/if}
						</div>
						<h2 class="form-section__title">{isKelompok() ? 'Data Badan Usaha' : 'Data Pribadi'}</h2>
					</div>
					<div class="form-grid">
						<div class="form-group">
							<label for="nama_lengkap" class="form-label">{isKelompok() ? 'Nama Kelompok/Badan' : 'Nama Lengkap (Sesuai KTP)'} <span class="required">*</span></label>
							<input id="nama_lengkap" name="nama_lengkap" type="text" class="form-input" bind:value={namaLengkap} required />
							{#if errors.namaLengkap}<p class="form-error">{errors.namaLengkap}</p>{/if}
						</div>
						<div class="form-group">
							<label for="nik" class="form-label">{isKelompok() ? 'NIK Penanggung Jawab (16 Digit)' : 'NIK (16 Digit)'} <span class="required">*</span></label>
							<input id="nik" name="nik" type="text" class="form-input" bind:value={nik} inputmode="numeric" maxlength="16" required />
							{#if errors.nik}<p class="form-error">{errors.nik}</p>{/if}
						</div>
						{#if !isKelompok()}
							<div class="form-group">
								<label for="tempat_lahir" class="form-label">Tempat Lahir <span class="required">*</span></label>
								<input id="tempat_lahir" name="tempat_lahir" type="text" class="form-input" bind:value={tempatLahir} required />
								{#if errors.tempatLahir}<p class="form-error">{errors.tempatLahir}</p>{/if}
							</div>
							<div class="form-group">
								<label for="tanggal_lahir" class="form-label">Tanggal Lahir <span class="required">*</span></label>
								<input id="tanggal_lahir" name="tanggal_lahir" type="date" class="form-input" bind:value={tanggalLahir} required />
								{#if errors.tanggalLahir}<p class="form-error">{errors.tanggalLahir}</p>{/if}
							</div>
							<div class="form-group">
								<label for="jenis_kelamin" class="form-label">Jenis Kelamin <span class="required">*</span></label>
								<select id="jenis_kelamin" name="jenis_kelamin" class="form-input" bind:value={jenisKelamin} required>
									<option value="">Pilih jenis kelamin</option>
									<option value="laki-laki">Laki-laki</option>
									<option value="perempuan">Perempuan</option>
								</select>
								{#if errors.jenisKelamin}<p class="form-error">{errors.jenisKelamin}</p>{/if}
							</div>
						{:else}
							<div class="form-group">
								<label for="nama_perwakilan" class="form-label">Nama Penanggung Jawab <span class="required">*</span></label>
								<input id="nama_perwakilan" name="nama_perwakilan" type="text" class="form-input" bind:value={namaPerwakilan} required />
								{#if errors.namaPerwakilan}<p class="form-error">{errors.namaPerwakilan}</p>{/if}
							</div>
							<div class="form-group">
								<label for="jabatan_perwakilan" class="form-label">Jabatan Penanggung Jawab <span class="required">*</span></label>
								<input id="jabatan_perwakilan" name="jabatan_perwakilan" type="text" class="form-input" bind:value={jabatanPerwakilan} required />
								{#if errors.jabatanPerwakilan}<p class="form-error">{errors.jabatanPerwakilan}</p>{/if}
							</div>
						{/if}
						<div class="form-group">
							<label for="pekerjaan" class="form-label">{isKelompok() ? 'Bidang Usaha Utama' : 'Pekerjaan Saat Ini'} <span class="required">*</span></label>
							<input id="pekerjaan" name="pekerjaan" type="text" class="form-input" bind:value={pekerjaan} required />
							{#if errors.pekerjaan}<p class="form-error">{errors.pekerjaan}</p>{/if}
						</div>
						{#if !isKelompok()}
							<div class="form-group form-group--full">
								<label for="nama_ibu" class="form-label">Nama Ibu Kandung <span class="required">*</span></label>
								<input id="nama_ibu" name="nama_ibu" type="text" class="form-input" bind:value={namaIbu} required />
								{#if errors.namaIbu}<p class="form-error">{errors.namaIbu}</p>{/if}
							</div>
						{/if}
					</div>
				</div>

				<div class="form-section">
					<div class="form-section__header">
						<div class="form-section__icon form-section__icon--green"><Phone size={20} strokeWidth={1.5} /></div>
						<h2 class="form-section__title">Kontak & Dokumen</h2>
					</div>
					<div class="form-grid">
						<div class="form-group">
							<label for="whatsapp" class="form-label">WhatsApp Aktif <span class="required">*</span></label>
							<input id="whatsapp" name="whatsapp" type="tel" class="form-input" bind:value={whatsapp} placeholder="Contoh: 08123456789" required />
							{#if errors.whatsapp}<p class="form-error">{errors.whatsapp}</p>{/if}
						</div>
						<div class="form-group">
							<label for="email" class="form-label">Alamat Email</label>
							<input id="email" name="email" type="email" class="form-input" bind:value={email} placeholder="nama@email.com" />
						</div>
						<div class="form-group form-group--full">
							<label for="alamat" class="form-label">Alamat Lengkap (Jalan, RT/RW, Kelurahan) <span class="required">*</span></label>
							<textarea id="alamat" name="alamat" class="form-input form-textarea" bind:value={alamat} rows="3" required></textarea>
							{#if errors.alamat}<p class="form-error">{errors.alamat}</p>{/if}
						</div>
						<div class="form-group form-group--full">
							<label for="identitas" class="form-label">{isKelompok() ? 'Upload Dokumen Usaha' : 'Upload KTP'} <span class="required">*</span></label>
							<div
								class="file-upload"
								class:drag-over={dragOver}
								ondragover={(e) => { e.preventDefault(); dragOver = true; }}
								ondragleave={() => dragOver = false}
								ondrop={handleFileDrop}
								role="button"
								tabindex="0"
							>
								<input id="identitas" name="identitas" type="file" class="file-upload__input" accept=".svg,image/png,image/jpeg" onchange={handleFileSelect} required />
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
							{#if errors.identitas}<p class="form-error">{errors.identitas}</p>{/if}
						</div>
					</div>
				</div>

				<div class="register-form__actions">
					<button type="submit" class="btn btn--primary btn--lg register-form__submit" disabled={loading} id="register-submit">
						{#if loading}Memproses...{:else}Daftar Sekarang{/if}
						<ArrowRight size={18} strokeWidth={2} />
					</button>
					{#if registerState}
						<p class="form-alert" class:form-alert--success={registerState.kind === 'success'} class:form-alert--error={registerState.kind === 'error'}>{registerState.text}</p>
					{/if}
				</div>
			</form>

			<div class="register-card__footer">
				<p>Sudah punya akun? <a href="/login" class="register-card__link">Login disini</a></p>
			</div>
			</div>
		</div>
		</div>
</section>

<style>
	.register-page {
		display: flex;
		height: 100vh;
		overflow: hidden;
	}

	.register-brand {
		position: relative;
		width: 42%;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--space-12);
		overflow: hidden;
	}

	.register-brand__bg {
		position: absolute;
		inset: 0;
		background: linear-gradient(150deg, var(--red-800), var(--red-900), var(--warm-900));
	}

	.register-brand__pattern {
		position: absolute;
		inset: 0;
		opacity: 0.05;
		background-image: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M40 0L44 4L40 8L36 4zM0 40L4 44L0 48L-4 44zM80 40L84 44L80 48L76 44zM40 80L44 84L40 88L36 84z'/%3E%3C/g%3E%3C/svg%3E");
	}

	.register-brand__orbs {
		position: absolute;
		inset: 0;
		overflow: hidden;
	}

	.register-brand__orb {
		position: absolute;
		border-radius: 50%;
		filter: blur(80px);
		animation: float 8s ease-in-out infinite;
	}

	.register-brand__orb--1 {
		width: 300px;
		height: 300px;
		background: rgba(217, 119, 6, 0.15);
		top: -80px;
		right: -60px;
	}

	.register-brand__orb--2 {
		width: 220px;
		height: 220px;
		background: rgba(4, 120, 87, 0.1);
		bottom: -40px;
		left: -40px;
		animation-delay: 3s;
	}

	.register-brand__content {
		position: relative;
		z-index: 1;
		text-align: center;
		max-width: 420px;
	}

	.register-brand__logo {
		margin-bottom: var(--space-6);
	}

	.register-brand__logo :global(svg) {
		width: 56px;
		height: 56px;
		margin: 0 auto;
	}

	.register-brand__title {
		font-size: var(--text-3xl);
		color: white;
		margin-bottom: var(--space-4);
	}

	.register-brand__text {
		font-size: var(--text-sm);
		color: rgba(255, 255, 255, 0.7);
		line-height: 1.7;
	}

	.register-form-panel {
		flex: 1;
		display: flex;
		align-items: flex-start;
		justify-content: center;
		height: 100vh;
		padding: var(--space-8);
		background: var(--color-bg);
		overflow-y: auto;
	}

	.register-form-panel__inner {
		width: 100%;
		max-width: 860px;
		min-height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.register-mobile-brand {
		display: none;
		align-items: center;
		gap: var(--space-3);
		margin-bottom: var(--space-8);
		font-family: var(--font-display);
		font-size: var(--text-lg);
		color: var(--color-primary);
	}

	.register-mobile-brand :global(svg) {
		width: 40px;
		height: 40px;
	}

	.register-card {
		max-width: none;
		margin: 0;
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

	.registration-type-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: var(--space-3);
	}

	.registration-type {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-2);
		padding: var(--space-4);
		border-radius: var(--radius-lg);
		border: 1.5px solid var(--color-border);
		background: var(--color-surface);
		font-weight: 700;
		font-size: var(--text-sm);
		color: var(--color-text);
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.registration-type:hover {
		border-color: var(--red-300);
		background: var(--red-50);
	}

	.registration-type.active {
		border-color: var(--red-500);
		background: linear-gradient(135deg, var(--red-50), var(--gold-50));
		box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
	}

	.registration-type__icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
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

	.form-textarea {
		resize: vertical;
		min-height: 80px;
	}

	.form-error {
		margin-top: var(--space-2);
		font-size: var(--text-xs);
		color: var(--red-600);
	}

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

	.register-form__actions {
		text-align: center;
		padding-top: var(--space-2);
	}

	.register-form__submit {
		min-width: 220px;
	}

	.register-form__submit:disabled {
		opacity: 0.75;
		cursor: not-allowed;
	}

	.form-alert {
		margin-top: var(--space-4);
		padding: var(--space-3);
		border-radius: var(--radius-lg);
		font-size: var(--text-xs);
		line-height: 1.5;
	}

	.form-alert--success {
		background: var(--green-50);
		border: 1px solid var(--green-200);
		color: var(--green-800);
	}

	.form-alert--error {
		background: var(--red-50);
		border: 1px solid var(--red-200);
		color: var(--red-700);
	}

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

	@media (max-width: 900px) {
		.register-page {
			height: auto;
			min-height: 100vh;
			overflow: visible;
		}

		.register-brand {
			display: none;
		}

		.register-mobile-brand {
			display: flex;
		}

		.register-form-panel {
			height: auto;
			min-height: 100vh;
			overflow: visible;
			padding: var(--space-6);
			padding-top: 96px;
			align-items: flex-start;
		}

		.register-form-panel__inner {
			max-width: 920px;
			min-height: 0;
			display: block;
		}

		.register-card__header {
			padding: var(--space-8) var(--space-6) var(--space-5);
		}

		.form-grid {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 640px) {
		.register-form-panel {
			padding: var(--space-4);
			padding-top: 84px;
		}

		.register-mobile-brand {
			margin-bottom: var(--space-5);
		}

		.register-form {
			padding: var(--space-5);
		}

		.register-card__header {
			padding: var(--space-6) var(--space-5) var(--space-4);
		}

		.file-upload {
			padding: var(--space-6) var(--space-4);
		}

		.registration-type-grid {
			grid-template-columns: 1fr;
		}

		.register-form__submit {
			width: 100%;
			min-width: 0;
		}
	}
</style>
