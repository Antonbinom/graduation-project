import {
	scrollIntoView
} from "seamless-scroll-polyfill";

export const scroll = () => {
	const btn = document.querySelector('.smooth-scroll')
	const offerBlock = document.getElementById('offer')

	btn.addEventListener('click', () => {
		scrollIntoView(document.querySelector('body'), {
			behavior: "smooth",
			block: "start",
			inline: "center"
		});
	})

	const showButton = () => {
		let offerFromTop = offerBlock.getBoundingClientRect()

		if (offerFromTop.bottom < 0) {
			btn.classList.add('smooth-scroll--visible')
		} else {
			btn.classList.remove('smooth-scroll--visible')
		}
	}
	window.onscroll = showButton
}