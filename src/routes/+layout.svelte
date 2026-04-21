<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let { children } = $props();

	// Scroll-to-top on route change
	$effect(() => {
		$page.url.pathname;
		if (typeof window !== 'undefined') {
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}
	});

	onMount(() => {
		// Intersection observer for scroll animations
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('in-view');
					}
				});
			},
			{ threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
		);

		const elements = document.querySelectorAll('.animate-on-scroll');
		elements.forEach((el) => observer.observe(el));

		return () => observer.disconnect();
	});
</script>

<div class="app grain">
	<Navbar />
	<main>
		{@render children()}
	</main>
	<Footer />
</div>

<style>
	.app {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	main {
		flex: 1;
	}
</style>
