<script lang="ts">
	import type { Statistik } from '$lib/types';
	import { onMount } from 'svelte';

	interface Props {
		stat: Statistik;
		delay?: number;
	}

	let { stat, delay = 0 }: Props = $props();

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
</script>

<div
	class="stat-card"
	bind:this={el}
	class:visible
	style="animation-delay: {delay}ms"
>
	<div class="stat-card__icon">{stat.icon}</div>
	<div class="stat-card__value">
		{displayed.toLocaleString('id-ID')}{stat.suffix || ''}
	</div>
	<div class="stat-card__label">{stat.label}</div>
</div>

<style>
	.stat-card {
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		border: 1px solid rgba(255, 255, 255, 0.15);
		border-radius: var(--radius-xl);
		padding: var(--space-6) var(--space-5);
		text-align: center;
		opacity: 0;
		transform: translateY(20px);
		transition:
			opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1),
			transform 0.6s cubic-bezier(0.4, 0, 0.2, 1),
			background 0.3s ease;
	}

	.stat-card.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.stat-card:hover {
		background: rgba(255, 255, 255, 0.18);
		border-color: rgba(255, 255, 255, 0.3);
	}

	.stat-card__icon {
		font-size: var(--text-3xl);
		margin-bottom: var(--space-3);
	}

	.stat-card__value {
		font-family: var(--font-display);
		font-size: var(--text-4xl);
		color: white;
		line-height: 1;
		margin-bottom: var(--space-2);
	}

	.stat-card__label {
		font-size: var(--text-sm);
		color: rgba(255, 255, 255, 0.7);
		font-weight: 500;
	}
</style>
