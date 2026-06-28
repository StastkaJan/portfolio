export function intersect(node: HTMLElement, options = { threshold: 0.12 }) {
	const observer = new IntersectionObserver(([entry]) => {
		node.classList.toggle('visible', entry.isIntersecting);
	}, options);

	observer.observe(node);
	return { destroy: () => observer.disconnect() };
}
