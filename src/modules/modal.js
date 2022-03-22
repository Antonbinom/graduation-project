import {
	animate
} from './helper'

import {
	hideScroll
} from './helper'

import {
	showScroll
} from './helper'

import {
	empty
} from './helper'

export const modal = () => {
	const modalCallBack = document.querySelector('.header-modal')
	const modalService = document.querySelector('.services-modal')
	const responseModal = document.getElementById('responseMessage')
	const overlay = document.querySelector('.overlay')
	const modalInputs = document.querySelectorAll('.header-modal input, .services-modal input')

	const modalOpen = (modal) => {
		hideScroll(document.body)
		modal.classList.add('opened')
		if (innerWidth < 768) {
			overlay.style.display = "block"
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
					modal.style.top = 50 + "%"
					modal.style.left = (50 * progress) + "%";
				}
			})
		}
	}

	const modalClose = (modals) => {
		showScroll(document.body)
		modals.forEach(modal => {
			if (innerWidth < 768) {
				overlay.style.display = "none"
				modal.style.display = "none"
				modal.style.top = 50 + "%"
			} else {
				overlay.style.display = "none"
				modal.style.display = "none"
				animate({
					duration: 200,
					timing(timeFraction) {
						return timeFraction;
					},
					draw(progress) {
						modal.style.top = (50 + progress * 100) + "%";
					}
				});
			}
			modal.classList.remove('opened')
			modalInputs.forEach(input => {
				empty(input)
			})
		})
	}
	document.addEventListener('click', (e) => {
		const modalOpened = document.querySelectorAll('.opened');

		if (e.target.closest('.button > [href="#callback"]')) {
			e.preventDefault();
			modalOpen(modalCallBack);

		} else if (e.target.closest('.service-button > [href="#application"]')) {
			e.preventDefault()
			modalOpen(modalService)

		} else if (e.target.classList.contains('header-modal__close') || e.target.classList.contains('services-modal__close') || e.target === overlay || e.target.classList.contains('btn-close')) {
			e.preventDefault();
			if (modalCallBack.classList.contains('opened') || modalService.classList.contains('opened') || responseModal.classList.contains('opened'))
				modalClose(modalOpened)
		}
	})

}