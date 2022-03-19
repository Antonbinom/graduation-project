import {
	animate
} from './helper'

export const modal = () => {

	const modal = document.querySelector('.header-modal')
	const overlay = document.querySelector('.overlay')


	const modalOpen = () => {
		document.body.classList.toggle('scroll-hide')
		console.log(document.body.clientWidth)
		console.log(innerWidth)
		if (innerWidth < 768) {
			overlay.style.display = "block"
			overlay.style.opacity = "1"
			modal.style.top = 50 + "%"
			modal.style.display = "block"
		} else {
			animate({
				duration: 150,
				timing(timeFraction) {
					return timeFraction;
				},
				draw(progress) {
					overlay.style.display = "block"
					overlay.style.opacity = progress
					modal.style.display = "block"
					modal.style.top = 50 + "%"
					modal.style.left = (50 * progress) + "%";
				}
			})
		}
	}

	const modalClose = () => {
		document.body.classList.toggle('scroll-hide')
		if (innerWidth < 768) {
			overlay.style.display = "none"
			overlay.style.opacity = "1"
			modal.style.display = "none"
			modal.style.top = 50 + "%"
		} else {
			animate({
				duration: 200,
				timing(timeFraction) {
					return timeFraction;
				},
				draw(progress) {
					progress == 1 ? overlay.style.display = "none" :
						overlay.style.opacity = 1 - progress;
					modal.style.top = (50 + progress * 100) + "%";
				}
			});
		}

	}
	document.body.addEventListener('click', (e) => {
		if (e.target.closest('.button > [href="#callback"]')) {
			e.preventDefault()
			modalOpen()
		} else if (e.target.classList.contains('header-modal__close') || e.target === overlay) {
			modalClose()
		}
	})
}