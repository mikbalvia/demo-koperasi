<script lang="ts">
	import { onMount } from 'svelte';
	import { Eye, EyeOff, Shield, UserCircle, Lock, ArrowRight, Info } from '@lucide/svelte';

	type LoginRole = 'anggota' | 'pengurus';
	type LoginState = { kind: 'success' | 'error'; text: string } | null;

	let showPassword = $state(false);
	let selectedRole = $state<LoginRole>('anggota');
	let nik = $state('');
	let password = $state('');
	let loading = $state(false);
	let loginState = $state<LoginState>(null);
	let nikError = $state('');
	let passwordError = $state('');

	const roles = [
		{ value: 'anggota', label: 'Anggota', desc: 'Akses akun anggota' },
		{ value: 'pengurus', label: 'Pengurus', desc: 'Akses pengurus koperasi' }
	];

	function validateLogin() {
		nikError = '';
		passwordError = '';

		if (!/^\d{16}$/.test(nik.trim())) {
			nikError = 'NIK harus terdiri dari 16 digit angka.';
		}

		if (!password.trim()) {
			passwordError = 'Password wajib diisi.';
		}

		return !nikError && !passwordError;
	}

	async function handleLogin(e: SubmitEvent) {
		e.preventDefault();
		loginState = null;

		if (!validateLogin()) {
			return;
		}

		loading = true;
		await new Promise((resolve) => setTimeout(resolve, 900));

		const nikValue = nik.trim();
		const isDefaultPassword = password === nikValue;

		if (isDefaultPassword) {
			loginState = {
				kind: 'success',
				text: `Login simulasi berhasil sebagai ${selectedRole}. Silakan lanjutkan penggantian password di dashboard.`
			};
		} else {
			loginState = {
				kind: 'error',
				text: 'Login simulasi gagal. Untuk login pertama, gunakan NIK sebagai password.'
			};
		}

		loading = false;
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
	<title>Login — KKMP Karang Tengah</title>
	<meta name="description" content="Masuk ke dashboard Koperasi Kelurahan Merah Putih Karang Tengah." />
</svelte:head>

<section class="login-page">
	<!-- Left Panel: Branding -->
	<div class="login-brand">
		<div class="login-brand__bg"></div>
		<div class="login-brand__pattern"></div>
		<div class="login-brand__frame"></div>
		<div class="login-brand__content">
			<div class="login-brand__logo">
				<svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
					<rect width="56" height="56" rx="12" fill="url(#loginLogoGrad)" />
					<text x="28" y="38" text-anchor="middle" font-family="serif" font-size="30" font-weight="bold" fill="white">K</text>
					<defs>
						<linearGradient id="loginLogoGrad" x1="0" y1="0" x2="56" y2="56">
							<stop stop-color="#fca5a5" />
							<stop offset="1" stop-color="#f87171" />
						</linearGradient>
					</defs>
				</svg>
			</div>
			<h2 class="login-brand__title">Selamat Datang Kembali!</h2>
			<p class="login-brand__text">
				Masuk ke dashboard untuk mengelola simpanan, pinjaman, dan melihat perkembangan koperasi Anda.
			</p>
			<div class="login-brand__features">
				<div class="login-brand__feature">
					<Shield size={18} strokeWidth={1.5} />
					<span>Data terenkripsi & aman</span>
				</div>
				<div class="login-brand__feature">
					<UserCircle size={18} strokeWidth={1.5} />
					<span>Akses dashboard personal</span>
				</div>
			</div>
		</div>
	</div>

	<!-- Right Panel: Form -->
	<div class="login-form-panel">
		<div class="login-form-panel__inner">
			<!-- Mobile brand -->
			<div class="login-mobile-brand">
				<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
					<rect width="40" height="40" rx="8" fill="url(#loginMobileGrad)" />
					<text x="20" y="28" text-anchor="middle" font-family="serif" font-size="22" font-weight="bold" fill="white">K</text>
					<defs>
						<linearGradient id="loginMobileGrad" x1="0" y1="0" x2="40" y2="40">
							<stop stop-color="#dc2626" />
							<stop offset="1" stop-color="#991b1b" />
						</linearGradient>
					</defs>
				</svg>
				<span>Koperasi Merah Putih</span>
			</div>

			<div class="login-card animate-on-scroll">
				<h1 class="login-card__title">Masuk ke Akun</h1>
				<p class="login-card__subtitle">Silakan pilih peran Anda untuk melanjutkan.</p>

				<!-- Role Selector -->
				<div class="role-selector" id="role-selector">
					{#each roles as role}
						<button
							type="button"
							class="role-option"
							class:active={selectedRole === role.value}
							onclick={() => selectedRole = role.value as LoginRole}
							id="role-{role.value}"
						>
							<span class="role-option__label">{role.label}</span>
							<span class="role-option__desc">{role.desc}</span>
						</button>
					{/each}
				</div>

				<form class="login-form" id="login-form" onsubmit={handleLogin} novalidate>
					<div class="form-group">
						<label for="login_nik" class="form-label">NIK (Nomor Induk Kependudukan)</label>
						<div class="login-input-wrap">
							<span class="login-input-icon"><UserCircle size={18} strokeWidth={1.5} /></span>
							<input
								type="text"
								id="login_nik"
								name="nik"
								class="form-input login-input"
								placeholder="Masukkan 16 digit NIK"
								bind:value={nik}
								inputmode="numeric"
								maxlength="16"
								required
							/>
						</div>
						{#if nikError}<p class="form-error">{nikError}</p>{/if}
					</div>

					<div class="form-group">
						<label for="login_password" class="form-label">Password</label>
						<div class="login-input-wrap">
							<span class="login-input-icon"><Lock size={18} strokeWidth={1.5} /></span>
							<input
								type={showPassword ? 'text' : 'password'}
								id="login_password"
								name="password"
								class="form-input login-input"
								placeholder="Masukkan password"
								bind:value={password}
								required
							/>
							<button type="button" class="login-input-toggle" onclick={() => showPassword = !showPassword}>
								{#if showPassword}<EyeOff size={18} strokeWidth={1.5} />{:else}<Eye size={18} strokeWidth={1.5} />{/if}
							</button>
						</div>
						{#if passwordError}<p class="form-error">{passwordError}</p>{/if}
					</div>

					<div class="login-options">
						<a href="/login" class="login-forgot" id="forgot-password">Lupa password?</a>
					</div>

					<button type="submit" class="btn btn--primary btn--lg login-submit" id="login-submit" disabled={loading}>
						{#if loading}Memproses...{:else}Masuk Sekarang{/if}
						<ArrowRight size={18} strokeWidth={2} />
					</button>

					{#if loginState}
						<p class="form-alert" class:form-alert--success={loginState.kind === 'success'} class:form-alert--error={loginState.kind === 'error'}>{loginState.text}</p>
					{/if}
				</form>

				<div class="login-hint">
					<Info size={14} strokeWidth={2} />
					<span>Gunakan NIK sebagai password jika belum pernah login.</span>
				</div>

				<div class="login-register">
					<p>Belum menjadi anggota? <a href="/register" class="login-register__link">Daftar disini</a></p>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	/* Page Layout */
	.login-page {
		display: flex;
		min-height: 100dvh;
		overflow: hidden;
	}

	/* Brand Panel */
	.login-brand {
		position: relative;
		width: 45%;
		min-height: 100dvh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--space-12);
		overflow: hidden;
	}

	.login-brand__bg {
		position: absolute;
		inset: 0;
		background:
			linear-gradient(90deg, rgba(18, 15, 13, 0.92), rgba(74, 13, 13, 0.86)),
			linear-gradient(180deg, rgba(216, 168, 78, 0.12), rgba(18, 15, 13, 0)),
			var(--warm-900);
	}

	.login-brand__pattern {
		position: absolute;
		inset: 0;
		opacity: 0.14;
		background-image:
			linear-gradient(rgba(255, 248, 234, 0.1) 1px, rgba(255, 248, 234, 0) 1px),
			linear-gradient(90deg, rgba(255, 248, 234, 0.1) 1px, rgba(255, 248, 234, 0) 1px);
		background-size: 88px 88px;
	}

	.login-brand__frame {
		position: absolute;
		inset: var(--space-8);
		border: 1px solid rgba(255, 248, 234, 0.16);
		pointer-events: none;
	}

	.login-brand__content {
		position: relative;
		z-index: 1;
		text-align: center;
		max-width: 380px;
	}

	.login-brand__logo {
		margin-bottom: var(--space-6);
	}

	.login-brand__logo :global(svg) {
		width: 56px;
		height: 56px;
		margin: 0 auto;
	}

	.login-brand__title {
		font-size: var(--text-3xl);
		color: white;
		margin-bottom: var(--space-4);
	}

	.login-brand__text {
		font-size: var(--text-sm);
		color: rgba(255, 255, 255, 0.7);
		line-height: 1.7;
		margin-bottom: var(--space-8);
	}

	.login-brand__features {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		align-items: center;
	}

	.login-brand__feature {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		font-size: var(--text-sm);
		color: rgba(255, 255, 255, 0.6);
	}

	/* Form Panel */
	.login-form-panel {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 100dvh;
		max-height: 100dvh;
		padding: var(--space-8);
		background: var(--color-bg);
		overflow-y: auto;
	}

	.login-form-panel__inner {
		width: 100%;
		max-width: 440px;
	}

	.login-mobile-brand {
		display: none;
		align-items: center;
		gap: var(--space-3);
		margin-bottom: var(--space-8);
		font-family: var(--font-display);
		font-size: var(--text-lg);
		color: var(--color-primary);
	}

	.login-mobile-brand :global(svg) {
		width: 40px;
		height: 40px;
	}

	/* Login Card */
	.login-card {
		background: var(--color-surface);
		border-radius: var(--radius-2xl);
		border: 1px solid var(--color-border);
		box-shadow: var(--shadow-lg);
		padding: var(--space-10);
	}

	.login-card__title {
		font-size: var(--text-2xl);
		color: var(--color-text);
		margin-bottom: var(--space-2);
	}

	.login-card__subtitle {
		font-size: var(--text-sm);
		color: var(--color-text-secondary);
		margin-bottom: var(--space-6);
	}

	/* Role Selector */
	.role-selector {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--space-2);
		margin-bottom: var(--space-6);
	}

	.role-option {
		padding: var(--space-3) var(--space-2);
		border-radius: var(--radius-lg);
		border: 1.5px solid var(--color-border);
		background: var(--color-surface);
		text-align: center;
		transition: all var(--transition-fast);
		cursor: pointer;
	}

	.role-option:hover {
		border-color: var(--red-300);
		background: var(--red-50);
	}

	.role-option.active {
		border-color: var(--red-500);
		background: linear-gradient(135deg, var(--red-50), var(--gold-50));
		box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
	}

	.role-option__label {
		display: block;
		font-size: var(--text-sm);
		font-weight: 700;
		color: var(--color-text);
		margin-bottom: 2px;
	}

	.role-option.active .role-option__label {
		color: var(--red-700);
	}

	.role-option__desc {
		display: block;
		font-size: 0.7rem;
		color: var(--color-text-muted);
		line-height: 1.3;
	}

	/* Login Form */
	.login-form {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
	}

	.form-group {
		display: flex;
		flex-direction: column;
	}

	.form-label {
		font-size: var(--text-sm);
		font-weight: 600;
		color: var(--color-text);
		margin-bottom: var(--space-2);
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

	.form-error {
		margin-top: var(--space-2);
		font-size: var(--text-xs);
		color: var(--red-600);
	}

	.form-alert {
		margin-top: var(--space-2);
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

	.login-input-wrap {
		position: relative;
	}

	.login-input {
		padding-left: var(--space-10);
		padding-right: var(--space-10);
	}

	.login-input-icon {
		position: absolute;
		left: var(--space-3);
		top: 50%;
		transform: translateY(-50%);
		color: var(--color-text-muted);
		display: flex;
		pointer-events: none;
	}

	.login-input-toggle {
		position: absolute;
		right: var(--space-3);
		top: 50%;
		transform: translateY(-50%);
		color: var(--color-text-muted);
		padding: var(--space-1);
		display: flex;
		transition: color var(--transition-fast);
		cursor: pointer;
		border: none;
		background: none;
	}

	.login-input-toggle:hover {
		color: var(--color-text-secondary);
	}

	.login-options {
		display: flex;
		justify-content: flex-end;
	}

	.login-forgot {
		font-size: var(--text-sm);
		color: var(--color-primary);
		font-weight: 500;
		transition: color var(--transition-fast);
	}

	.login-forgot:hover {
		color: var(--red-500);
		text-decoration: underline;
	}

	.login-submit {
		width: 100%;
		margin-top: var(--space-2);
	}

	.login-submit:disabled {
		opacity: 0.75;
		cursor: not-allowed;
	}

	/* Hint */
	.login-hint {
		display: flex;
		align-items: flex-start;
		gap: var(--space-2);
		margin-top: var(--space-5);
		padding: var(--space-3) var(--space-4);
		background: var(--gold-50);
		border: 1px solid var(--gold-200);
		border-radius: var(--radius-lg);
		font-size: var(--text-xs);
		color: var(--gold-800);
		line-height: 1.5;
	}

	.login-hint :global(svg) {
		flex-shrink: 0;
		margin-top: 1px;
	}

	/* Register Link */
	.login-register {
		text-align: center;
		margin-top: var(--space-6);
		padding-top: var(--space-5);
		border-top: 1px solid var(--color-border);
		font-size: var(--text-sm);
		color: var(--color-text-secondary);
	}

	.login-register__link {
		color: var(--color-primary);
		font-weight: 600;
		transition: color var(--transition-fast);
	}

	.login-register__link:hover {
		color: var(--red-500);
		text-decoration: underline;
	}

	/* Responsive */
	@media (max-width: 1100px) {
		.login-brand {
			width: 40%;
			padding: var(--space-8);
		}

		.login-card {
			padding: var(--space-8);
		}
	}

	@media (max-width: 960px) {
		.login-page {
			height: auto;
			min-height: 100dvh;
			overflow: visible;
		}

		.login-brand {
			display: none;
		}

		.login-mobile-brand {
			display: flex;
		}

		.login-form-panel {
			height: auto;
			min-height: 100dvh;
			max-height: none;
			overflow: visible;
			padding: var(--space-6);
			padding-top: 96px;
			align-items: flex-start;
		}

		.login-form-panel__inner {
			max-width: 560px;
		}

		.role-selector {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (max-width: 960px) and (orientation: landscape) and (min-width: 760px) {
		.login-page {
			flex-direction: row;
			height: auto;
			min-height: 100dvh;
			overflow: visible;
		}

		.login-brand {
			display: flex;
			width: 38%;
			padding: var(--space-8) var(--space-6);
		}

		.login-mobile-brand {
			display: none;
		}

		.login-form-panel {
			height: auto;
			min-height: 100dvh;
			max-height: none;
			overflow: visible;
			padding: var(--space-6) var(--space-5);
			padding-top: var(--space-8);
			align-items: center;
		}

		.login-form-panel__inner {
			max-width: 480px;
		}
	}

	@media (max-width: 768px) {
		.login-card {
			padding: var(--space-6);
		}

		.login-mobile-brand {
			margin-bottom: var(--space-5);
		}

		.role-option {
			padding: var(--space-3);
		}

		.role-option__desc {
			font-size: 0.74rem;
		}
	}

	@media (max-width: 560px) {
		.login-form-panel {
			padding: var(--space-4);
			padding-top: 84px;
		}

		.login-form-panel__inner {
			max-width: none;
		}

		.role-selector {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 420px) {
		.login-card {
			padding: var(--space-5);
		}

		.login-card__subtitle {
			font-size: var(--text-xs);
		}
	}

	@media (max-width: 900px) and (orientation: landscape) and (max-height: 560px) {
		.login-form-panel {
			padding-top: var(--space-5);
		}

		.login-card {
			padding: var(--space-5);
		}

		.login-form {
			gap: var(--space-3);
		}

		.login-brand__title {
			font-size: var(--text-2xl);
		}

		.login-brand__text {
			margin-bottom: var(--space-5);
		}
	}
</style>
