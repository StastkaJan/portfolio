export function intersect(node: HTMLElement, reveal = true) {
	if (!reveal || typeof IntersectionObserver === 'undefined') return;

	const observer = new IntersectionObserver(([entry]) => {
		node.classList.toggle('visible', entry.isIntersecting);
	}, { threshold: 0.12 });

	node.classList.add('reveal');
	observer.observe(node);
	return { destroy: () => observer.disconnect() };
}
