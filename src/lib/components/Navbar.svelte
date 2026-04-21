<script lang="ts">
	import { navLinks, profil } from '$lib/data/content';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let scrolled = $state(false);
	let mobileOpen = $state(false);

	onMount(() => {
		const handleScroll = () => {
			scrolled = window.scrollY > 20;
		};
		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	});

	function closeMobile() {
		mobileOpen = false;
	}
</script>

<nav class="navbar" class:scrolled id="main-nav">
	<div class="navbar__inner container">
		<a href="/" class="navbar__brand" onclick={closeMobile}>
			<div class="navbar__logo">
				<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
					<rect width="40" height="40" rx="8" fill="url(#logoGrad)" />
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
						<linearGradient id="logoGrad" x1="0" y1="0" x2="40" y2="40">
							<stop stop-color="#dc2626" />
							<stop offset="1" stop-color="#991b1b" />
						</linearGradient>
					</defs>
				</svg>
			</div>
			<div class="navbar__brand-text">
				<span class="navbar__title">KKMP</span>
				<span class="navbar__subtitle">Awirarangan</span>
			</div>
		</a>

		<div class="navbar__links" class:open={mobileOpen}>
			<div class="navbar__links-overlay" onclick={closeMobile} role="presentation"></div>
			<div class="navbar__links-inner">
				<button class="navbar__close" onclick={closeMobile} aria-label="Close menu">✕</button>
				{#each navLinks as link}
					<a
						href={link.href}
						class="navbar__link"
						class:active={$page.url.pathname === link.href ||
							(link.href.startsWith('/#') && $page.url.pathname === '/')}
						onclick={closeMobile}
					>
						{link.label}
					</a>
				{/each}
				<a href="/register" class="btn btn--primary navbar__cta" onclick={closeMobile}>
					Daftar Anggota
				</a>
			</div>
		</div>

		<button
			class="navbar__hamburger"
			onclick={() => (mobileOpen = !mobileOpen)}
			aria-label="Toggle menu"
			aria-expanded={mobileOpen}
		>
			<span class="navbar__hamburger-line"></span>
			<span class="navbar__hamburger-line"></span>
			<span class="navbar__hamburger-line"></span>
		</button>
	</div>
</nav>

<style>
	.navbar {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: var(--z-nav);
		padding: var(--space-4) 0;
		transition:
			padding var(--transition-base),
			box-shadow var(--transition-base);
	}

	.navbar::before {
		content: '';
		position: absolute;
		inset: 0;
		z-index: -1;
		background: transparent;
		transition: background-color var(--transition-base);
	}

	.navbar.scrolled {
		padding: var(--space-2) 0;
		box-shadow: var(--shadow-md);
	}

	.navbar.scrolled::before {
		background: rgba(255, 255, 255, 0.92);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
	}

	.navbar__inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-8);
	}

	.navbar__brand {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		text-decoration: none;
		flex-shrink: 0;
	}

	.navbar__logo {
		width: 40px;
		height: 40px;
	}

	.navbar__brand-text {
		display: flex;
		flex-direction: column;
		line-height: 1.1;
	}

	.navbar__title {
		font-family: var(--font-display);
		font-size: var(--text-lg);
		color: var(--color-primary);
		font-weight: 400;
	}

	.navbar.scrolled .navbar__title {
		color: var(--color-primary);
	}

	:global(body:not(.scrolled-body)) .navbar:not(.scrolled) .navbar__title {
		color: white;
	}

	.navbar__subtitle {
		font-size: var(--text-xs);
		color: var(--color-text-secondary);
		font-weight: 500;
		letter-spacing: 0.05em;
	}

	:global(body:not(.scrolled-body)) .navbar:not(.scrolled) .navbar__subtitle {
		color: rgba(255, 255, 255, 0.7);
	}

	/* Links */
	.navbar__links-inner {
		display: flex;
		align-items: center;
		gap: var(--space-1);
	}

	.navbar__link {
		padding: var(--space-2) var(--space-3);
		font-size: var(--text-sm);
		font-weight: 500;
		color: var(--color-text-secondary);
		border-radius: var(--radius-md);
		transition:
			color var(--transition-fast),
			background-color var(--transition-fast);
		white-space: nowrap;
	}

	:global(body:not(.scrolled-body)) .navbar:not(.scrolled) .navbar__link {
		color: rgba(255, 255, 255, 0.85);
	}

	.navbar__link:hover,
	.navbar__link.active {
		color: var(--color-primary);
		background: var(--color-primary-light);
	}

	:global(body:not(.scrolled-body)) .navbar:not(.scrolled) .navbar__link:hover,
	:global(body:not(.scrolled-body)) .navbar:not(.scrolled) .navbar__link.active {
		color: white;
		background: rgba(255, 255, 255, 0.15);
	}

	.navbar__cta {
		margin-left: var(--space-2);
	}

	.navbar__close {
		display: none;
	}

	/* Hamburger */
	.navbar__hamburger {
		display: none;
		flex-direction: column;
		gap: 5px;
		padding: var(--space-2);
	}

	.navbar__hamburger-line {
		display: block;
		width: 22px;
		height: 2px;
		background: var(--color-text);
		border-radius: 2px;
		transition: var(--transition-fast);
	}

	:global(body:not(.scrolled-body)) .navbar:not(.scrolled) .navbar__hamburger-line {
		background: white;
	}

	.navbar__links-overlay {
		display: none;
	}

	/* Mobile */
	@media (max-width: 960px) {
		.navbar__hamburger {
			display: flex;
		}

		.navbar__links {
			position: fixed;
			inset: 0;
			z-index: 999;
			pointer-events: none;
			opacity: 0;
			transition: opacity var(--transition-base);
		}

		.navbar__links.open {
			pointer-events: all;
			opacity: 1;
		}

		.navbar__links-overlay {
			display: block;
			position: absolute;
			inset: 0;
			background: rgba(0, 0, 0, 0.5);
		}

		.navbar__links-inner {
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			width: 300px;
			max-width: 85vw;
			background: white;
			flex-direction: column;
			align-items: stretch;
			padding: var(--space-6);
			gap: var(--space-1);
			overflow-y: auto;
			transform: translateX(100%);
			transition: transform var(--transition-base);
		}

		.navbar__links.open .navbar__links-inner {
			transform: translateX(0);
		}

		.navbar__close {
			display: flex;
			align-items: center;
			justify-content: flex-end;
			font-size: var(--text-xl);
			padding: var(--space-2);
			margin-bottom: var(--space-4);
			color: var(--color-text-secondary);
		}

		.navbar__link {
			padding: var(--space-3) var(--space-4);
			font-size: var(--text-base);
			color: var(--color-text) !important;
			border-radius: var(--radius-md);
		}

		.navbar__link:hover,
		.navbar__link.active {
			color: var(--color-primary) !important;
			background: var(--color-primary-light) !important;
		}

		.navbar__cta {
			margin-left: 0;
			margin-top: var(--space-4);
			text-align: center;
		}
	}
</style>
