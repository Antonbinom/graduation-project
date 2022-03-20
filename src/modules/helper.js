export const animate = ({
	timing,
	draw,
	duration
}) => {

	let start = performance.now();
	requestAnimationFrame(function animate(time) {
		let timeFraction = (time - start) / duration;
		if (timeFraction > 1) timeFraction = 1;

		let progress = timing(timeFraction);

		draw(progress);

		if (timeFraction < 1) {
			requestAnimationFrame(animate);
		}
	});
}

export const hideScroll = (item) => {
	let scrollWidth = innerWidth - item.clientWidth
	item.style.marginRight = scrollWidth + "px"
	item.style.overflowY = "hidden"
}

export const showScroll = (item) => {
	item.style.marginRight = 0
	item.style.overflowY = "auto"
}