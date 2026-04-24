<script lang="ts">
	import type { Layanan } from '$lib/types';
	import { ShoppingCart, Droplets, Landmark } from '@lucide/svelte';

	interface Props {
		layanan: Layanan;
		index?: number;
	}

	let { layanan, index = 0 }: Props = $props();

	const iconMap: Record<string, typeof ShoppingCart> = {
		'shopping-cart': ShoppingCart,
		droplets: Droplets,
		landmark: Landmark
	};

	const IconComponent = $derived(iconMap[layanan.icon]);
</script>

<div class="service-card bento-item bento-item--glow" style="--delay: {index * 100}ms">
	<span class="service-card__index">0{index + 1}</span>
	<div class="service-card__icon-wrap">
		{#if IconComponent}
			<IconComponent size={28} strokeWidth={1.5} />
		{/if}
	</div>
	<h3 class="service-card__title">{layanan.judul}</h3>
	<p class="service-card__desc">{layanan.deskripsi}</p>
	<div class="service-card__accent"></div>
</div>

<style>
	.service-card {
		width: 100%;
		padding: var(--space-8) var(--space-6);
		position: relative;
		overflow: hidden;
		background:
			linear-gradient(180deg, rgba(255, 250, 240, 0.96), rgba(238, 229, 214, 0.82)),
			var(--color-surface);
		transition:
			transform var(--transition-bouncy),
			box-shadow var(--transition-base),
			border-color var(--transition-base);
	}

	.service-card:hover {
		transform: translateY(-6px);
		box-shadow: var(--shadow-2xl);
		border-color: rgba(216, 168, 78, 0.42);
	}

	.service-card__index {
		position: absolute;
		top: var(--space-5);
		right: var(--space-5);
		font-family: var(--font-display);
		font-size: var(--text-4xl);
		line-height: 1;
		color: rgba(74, 13, 13, 0.08);
	}

	.service-card__accent {
		position: absolute;
		left: var(--space-6);
		right: var(--space-6);
		bottom: var(--space-6);
		height: 2px;
		background: var(--color-accent);
		transform: scaleX(0);
		transform-origin: left;
		transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.service-card:hover .service-card__accent {
		transform: scaleX(1);
	}

	.service-card__icon-wrap {
		width: 64px;
		height: 64px;
		border-radius: var(--radius-lg);
		background: var(--deep-red);
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: var(--space-5);
		color: var(--gold-300);
		transition: transform var(--transition-spring);
		box-shadow: 0 16px 32px rgba(74, 13, 13, 0.18);
	}

	.service-card:hover .service-card__icon-wrap {
		transform: scale(1.1) rotate(-3deg);
	}

	.service-card__title {
		font-family: var(--font-display);
		font-size: var(--text-xl);
		margin-bottom: var(--space-3);
		color: var(--color-text);
		max-width: 16rem;
	}

	.service-card__desc {
		font-size: var(--text-sm);
		color: var(--color-text-secondary);
		line-height: 1.7;
		padding-bottom: var(--space-8);
	}

	@media (max-width: 768px) {
		.service-card {
			padding: var(--space-7) var(--space-5);
		}
	}

	@media (max-width: 480px) {
		.service-card {
			padding: var(--space-6) var(--space-4);
		}

		.service-card__icon-wrap {
			width: 52px;
			height: 52px;
			margin-bottom: var(--space-4);
		}

		.service-card__title {
			font-size: var(--text-lg);
		}
	}
</style>
