<script lang="ts">
	import { profil, navLinks } from '$lib/data/content';
	import { MapPin, Mail, Globe, ExternalLink, Sparkles } from '@lucide/svelte';
</script>

<footer class="footer" id="footer">
	<div class="footer__pattern"></div>
	<div class="container">
		<div class="footer__grid">
			<!-- Brand Column -->
			<div class="footer__brand">
				<div class="footer__logo">
					<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
						<rect width="40" height="40" rx="8" fill="url(#footerLogoGrad)" />
						<text
							x="20"
							y="28"
							text-anchor="middle"
							font-family="serif"
							font-size="22"
							font-weight="bold"
							fill="white">K</text
						>
						<defs>
							<linearGradient id="footerLogoGrad" x1="0" y1="0" x2="40" y2="40">
								<stop stop-color="#fca5a5" />
								<stop offset="1" stop-color="#f87171" />
							</linearGradient>
						</defs>
					</svg>
					<span class="footer__logo-text">KKMP Karang Tengah</span>
				</div>
				<p class="footer__desc">
					Membangun ekonomi kerakyatan berbasis gotong royong untuk kesejahteraan anggota dan
					masyarakat Kelurahan Karang Tengah.
				</p>
				<div class="footer__badge">
					<span class="badge badge--gold"><Sparkles size={12} strokeWidth={2} /> Program Pemerintah</span>
				</div>
			</div>

			<!-- Quick Links -->
			<div class="footer__col">
				<h4 class="footer__heading">Tautan Cepat</h4>
				<ul class="footer__list">
					{#each navLinks.slice(0, 5) as link}
						<li><a href={link.href} class="footer__link">{link.label}</a></li>
					{/each}
				</ul>
			</div>

			<!-- Layanan -->
			<div class="footer__col">
				<h4 class="footer__heading">Layanan</h4>
				<ul class="footer__list">
					<li><a href="/simulasi-cicilan" class="footer__link">Simulasi Cicilan</a></li>
					<li><a href="/cek-anggota" class="footer__link">Cek Status Anggota</a></li>
					<li><a href="/syarat-ketentuan" class="footer__link">Syarat & Ketentuan</a></li>
					<li>
						<a href="https://simkopdes.go.id" class="footer__link footer__link--ext" target="_blank" rel="noopener">
							Simkopdes Pusat
							<ExternalLink size={12} strokeWidth={2} />
						</a>
					</li>
				</ul>
			</div>

			<!-- Kontak -->
			<div class="footer__col">
				<h4 class="footer__heading">Kontak</h4>
				<ul class="footer__list footer__list--contact">
					<li>
						<MapPin size={14} strokeWidth={2} class="footer__icon" />
						<span>{profil.alamat}</span>
					</li>
					<li>
						<Mail size={14} strokeWidth={2} class="footer__icon" />
						<a href="mailto:{profil.email}" class="footer__link">{profil.email}</a>
					</li>
					<li>
						<Globe size={14} strokeWidth={2} class="footer__icon" />
						<a href={profil.website} class="footer__link" target="_blank" rel="noopener">merahputih.kop.id</a>
					</li>
				</ul>
			</div>
		</div>

		<div class="footer__bottom">
			<div class="footer__bottom-inner">
				<p class="footer__copyright">
					© {new Date().getFullYear()} {profil.namaResmi}. Semua Hak Cipta Dilindungi.
				</p>
				<p class="footer__gov">
					Bagian dari program
					<a
						href="https://simkopdes.go.id"
						target="_blank"
						rel="noopener"
						class="footer__gov-link"
					>
						Kementerian Koperasi Republik Indonesia
					</a>
				</p>
			</div>
		</div>
	</div>
</footer>

<style>
	.footer {
		position: relative;
		background:
			linear-gradient(120deg, rgba(74, 13, 13, 0.24), rgba(74, 13, 13, 0) 48%),
			var(--warm-900);
		color: var(--warm-300);
		overflow: hidden;
	}

	.footer__pattern {
		position: absolute;
		inset: 0;
		opacity: 0.03;
		background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
		pointer-events: none;
	}

	.footer__grid {
		position: relative;
		display: grid;
		grid-template-columns: 1.5fr 1fr 1fr 1.2fr;
		gap: var(--space-10);
		padding: var(--space-16) 0 var(--space-12);
	}

	/* Brand */
	.footer__logo {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		margin-bottom: var(--space-4);
	}

	.footer__logo :global(svg) {
		width: 40px;
		height: 40px;
		flex-shrink: 0;
	}

	.footer__logo-text {
		font-family: var(--font-display);
		font-size: var(--text-lg);
		color: white;
	}

	.footer__desc {
		font-size: var(--text-sm);
		line-height: 1.7;
		margin-bottom: var(--space-4);
	}

	/* Columns */
	.footer__heading {
		font-family: var(--font-body);
		font-size: var(--text-sm);
		font-weight: 700;
		color: white;
		text-transform: uppercase;
		letter-spacing: 0;
		margin-bottom: var(--space-5);
	}

	.footer__list {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
	}

	.footer__list--contact li {
		display: flex;
		gap: var(--space-2);
		align-items: flex-start;
		font-size: var(--text-sm);
	}

	.footer__list--contact :global(.footer__icon) {
		flex-shrink: 0;
		margin-top: 3px;
		color: var(--warm-500);
	}

	.footer__link {
		font-size: var(--text-sm);
		color: var(--warm-400);
		transition: color var(--transition-fast);
	}

	.footer__link:hover {
		color: white;
	}

	.footer__link--ext {
		display: inline-flex;
		align-items: center;
		gap: var(--space-1);
	}

	/* Bottom */
	.footer__bottom {
		position: relative;
		border-top: 1px solid rgba(255, 255, 255, 0.08);
		padding: var(--space-6) 0;
	}

	.footer__bottom-inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: var(--space-4);
	}

	.footer__copyright {
		font-size: var(--text-xs);
		color: var(--warm-500);
	}

	.footer__gov {
		font-size: var(--text-xs);
		color: var(--warm-500);
	}

	.footer__gov-link {
		color: var(--red-400);
		transition: color var(--transition-fast);
	}

	.footer__gov-link:hover {
		color: var(--red-300);
	}

	/* Responsive */
	@media (max-width: 1100px) {
		.footer__grid {
			grid-template-columns: 1fr 1fr 1fr;
			gap: var(--space-8);
		}

		.footer__brand {
			grid-column: 1 / -1;
		}
	}

	@media (max-width: 960px) {
		.footer__grid {
			grid-template-columns: 1fr 1fr;
		}

		.footer__brand {
			grid-column: 1 / -1;
		}
	}

	@media (max-width: 600px) {
		.footer__grid {
			grid-template-columns: 1fr;
			gap: var(--space-8);
		}

		.footer__bottom-inner {
			flex-direction: column;
			text-align: center;
		}
	}
</style>
