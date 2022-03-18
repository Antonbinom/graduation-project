import {
	animate
} from './helper'

export const modal = () => {

	const modal = document.querySelector('.header-modal')
	const overlay = document.querySelector('.overlay')

	const modalRight = () => {
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
		});
	};

	const modalDown = () => {

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
	};

	const modalMobileOpen = () => {
		overlay.style.display = "block"
		overlay.style.opacity = "1"
		modal.style.top = 50 + "%"
		modal.style.display = "block"
	}

	const modalMobileClose = () => {
		overlay.style.display = "none"
		overlay.style.opacity = "1"
		modal.style.display = "none"
		modal.style.top = 50 + "%"
	}
	document.body.addEventListener('click', (e) => {
		// e.preventDefault()
		if (e.target.closest('.button > [href="#callback"]')) {
			if (innerWidth < 768) {
				modalMobileOpen()
			} else {
				modalRight()
			}
		} else if (e.target.classList.contains('header-modal__close') || e.target === overlay) {
			if (innerWidth < 768) {
				modalMobileClose()
			} else {
				modalDown()
			}
		}
	})
}