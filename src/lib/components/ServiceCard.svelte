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
		transition:
			transform var(--transition-bouncy),
			box-shadow var(--transition-base),
			border-color var(--transition-base);
	}

	.service-card:hover {
		transform: translateY(-8px);
		box-shadow: var(--shadow-2xl);
		border-color: var(--color-accent-light);
	}

	.service-card__accent {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 4px;
		background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
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
		background: linear-gradient(135deg, var(--red-50), var(--gold-50));
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: var(--space-5);
		color: var(--color-primary);
		transition: transform var(--transition-spring);
	}

	.service-card:hover .service-card__icon-wrap {
		transform: scale(1.1) rotate(-3deg);
	}

	.service-card__title {
		font-family: var(--font-display);
		font-size: var(--text-xl);
		margin-bottom: var(--space-3);
		color: var(--color-text);
	}

	.service-card__desc {
		font-size: var(--text-sm);
		color: var(--color-text-secondary);
		line-height: 1.7;
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
