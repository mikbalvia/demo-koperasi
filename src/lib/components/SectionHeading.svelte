<script lang="ts">
	interface Props {
		title: string;
		subtitle?: string;
		align?: 'center' | 'left';
		light?: boolean;
	}

	let { title, subtitle = '', align = 'center', light = false }: Props = $props();
</script>

<div class="section-heading" class:center={align === 'center'} class:light>
	<div class="ornament">
		<span class="ornament__diamond"></span>
	</div>
	<h2 class="section-heading__title">{title}</h2>
	{#if subtitle}
		<p class="section-heading__subtitle">{subtitle}</p>
	{/if}
</div>

<style>
	.section-heading {
		margin-bottom: var(--space-12);
	}

	.section-heading.center {
		text-align: center;
	}

	.section-heading__title {
		font-size: var(--text-4xl);
		color: var(--color-text);
		margin-bottom: var(--space-3);
	}

	.light .section-heading__title {
		color: white;
	}

	.section-heading__subtitle {
		font-size: var(--text-lg);
		color: var(--color-text-secondary);
		max-width: 600px;
		line-height: 1.6;
	}

	.center .section-heading__subtitle {
		margin: 0 auto;
	}

	.light .section-heading__subtitle {
		color: rgba(255, 255, 255, 0.7);
	}

	.ornament {
		margin-bottom: var(--space-4);
	}

	.light .ornament::before,
	.light .ornament::after {
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
	}

	.light .ornament__diamond {
		background: var(--gold-400);
	}

	@media (max-width: 768px) {
		.section-heading {
			margin-bottom: var(--space-8);
		}

		.section-heading__title {
			font-size: var(--text-3xl);
		}

		.section-heading__subtitle {
			font-size: var(--text-base);
		}
	}

	@media (max-width: 480px) {
		.section-heading__title {
			font-size: var(--text-2xl);
		}

		.section-heading__subtitle {
			font-size: var(--text-sm);
		}
	}
</style>
