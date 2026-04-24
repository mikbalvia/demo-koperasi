<script lang="ts">
	import type { Statistik } from '$lib/types';
	import { onMount } from 'svelte';
	import { Users, Store, Wallet, TrendingUp } from '@lucide/svelte';

	interface Props {
		stat: Statistik;
		delay?: number;
	}

	let { stat, delay = 0 }: Props = $props();

	const iconMap: Record<string, typeof Users> = {
		users: Users,
		store: Store,
		wallet: Wallet,
		'trending-up': TrendingUp
	};

	let displayed = $state(0);
	let visible = $state(false);
	let el: HTMLDivElement;

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && !visible) {
					visible = true;
					animateCount();
				}
			},
			{ threshold: 0.3 }
		);

		observer.observe(el);
		return () => observer.disconnect();
	});

	function animateCount() {
		const target = stat.value;
		const duration = 2000;
		const startTime = performance.now();

		function update(now: number) {
			const elapsed = now - startTime;
			const progress = Math.min(elapsed / duration, 1);
			const eased = 1 - Math.pow(1 - progress, 3);
			displayed = Math.round(eased * target);

			if (progress < 1) {
				requestAnimationFrame(update);
			}
		}

		setTimeout(() => requestAnimationFrame(update), delay);
	}

	const IconComponent = $derived(iconMap[stat.icon]);
</script>

<div
	class="stat-card"
	bind:this={el}
	class:visible
	style="animation-delay: {delay}ms"
>
	<div class="stat-card__icon">
		{#if IconComponent}
			<IconComponent size={28} strokeWidth={1.5} />
		{/if}
	</div>
	<div class="stat-card__value">
		{displayed.toLocaleString('id-ID')}{stat.suffix || ''}
	</div>
	<div class="stat-card__label">{stat.label}</div>
</div>

<style>
	.stat-card {
		width: 100%;
		position: relative;
		background: rgba(18, 15, 13, 0.78);
		backdrop-filter: blur(18px);
		-webkit-backdrop-filter: blur(18px);
		border: 1px solid rgba(255, 248, 234, 0.14);
		border-radius: var(--radius-xl);
		padding: var(--space-6) var(--space-5);
		text-align: left;
		opacity: 0;
		transform: translateY(20px);
		transition:
			opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1),
			transform 0.6s cubic-bezier(0.4, 0, 0.2, 1),
			background 0.3s ease,
			border-color 0.3s ease;
		box-shadow: 0 18px 44px rgba(0, 0, 0, 0.24);
		overflow: hidden;
	}

	.stat-card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 2px;
		background: var(--gold-400);
	}

	.stat-card.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.stat-card:hover {
		background: rgba(32, 26, 22, 0.88);
		border-color: rgba(216, 168, 78, 0.36);
	}

	.stat-card__icon {
		position: absolute;
		top: var(--space-4);
		right: var(--space-4);
		display: flex;
		align-items: center;
		justify-content: center;
		width: 42px;
		height: 42px;
		border-radius: var(--radius-md);
		background: rgba(255, 248, 234, 0.08);
		color: var(--gold-300);
	}

	.stat-card__value {
		font-family: var(--font-display);
		font-size: var(--text-4xl);
		color: var(--paper-warm);
		line-height: 1;
		margin-bottom: var(--space-2);
		font-variant-numeric: tabular-nums;
		padding-right: 48px;
	}

	.stat-card__label {
		font-size: var(--text-sm);
		color: rgba(255, 248, 234, 0.68);
		font-weight: 500;
	}

	@media (max-width: 600px) {
		.stat-card {
			padding: var(--space-4) var(--space-3);
			border-radius: var(--radius-lg);
		}

		.stat-card__icon {
			width: 34px;
			height: 34px;
			top: var(--space-3);
			right: var(--space-3);
		}

		.stat-card__icon :global(svg) {
			width: 22px;
			height: 22px;
		}

		.stat-card__value {
			font-size: 1.45rem;
			white-space: nowrap;
			padding-right: 34px;
		}

		.stat-card__label {
			font-size: 0.7rem;
			line-height: 1.3;
		}
	}

	@media (max-width: 420px) {
		.stat-card {
			padding: var(--space-3);
		}

		.stat-card__icon {
			width: 38px;
			height: 38px;
		}

		.stat-card__icon :global(svg) {
			width: 20px;
			height: 20px;
		}

		.stat-card__value {
			font-size: 1.2rem;
		}
	}
</style>
