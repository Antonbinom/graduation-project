import {
	animate
} from './helper'

import {
	hideScroll
} from './helper'

import {
	showScroll
} from './helper'

export const modal = () => {

	const modalCallBack = document.querySelector('.header-modal')
	const modalService = document.querySelector('.services-modal')
	const overlay = document.querySelector('.overlay')

	const modalOpen = (modal) => {
		hideScroll(document.body)
		modal.classList.toggle('opened')
		if (innerWidth < 768) {
			overlay.style.display = "block"
			overlay.style.opacity = "1"
			modal.style.top = 50 + "%"
			modal.style.display = "block"
		} else {
			overlay.style.display = "block"
			modal.style.display = "block"
			animate({
				duration: 150,
				timing(timeFraction) {
					return timeFraction;
				},
				draw(progress) {
					overlay.style.opacity = progress
					modal.style.top = 50 + "%"
					modal.style.left = (50 * progress) + "%";
				}
			})
		}
	}

	const modalClose = (modal) => {
		showScroll(document.body)
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
		modal.classList.toggle('opened')

	}
	document.body.addEventListener('click', (e) => {
		const modalOpened = document.querySelector('.opened');

		if (e.target.closest('.button > [href="#callback"]')) {
			e.preventDefault();
			modalOpen(modalCallBack);

		} else if (e.target.closest('.service-button > [href="#application"]')) {
			e.preventDefault()
			modalOpen(modalService)

		} else if (e.target.classList.contains('header-modal__close') || e.target.classList.contains('services-modal__close') || e.target === overlay) {
			e.preventDefault();
			modalClose(modalOpened)
		}
	})

}