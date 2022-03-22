import {
	hideScroll
} from "./helper"
import {
	showScroll
} from "./helper"

export const gallery = () => {

	const imagesOverlay = document.querySelectorAll('.document-overlay')
	const elem = document.querySelectorAll('.sertificate-document')
	const overlay = document.querySelector('.overlay')
	const modalImage = document.querySelector('.documents-image')
	const modal = document.querySelector('.documents-modal')


	const openModal = (image) => {
		overlay.style.display = "block"
		modal.classList.add('open-image')
		modalImage.setAttribute('src', image)
	}
	const closeModal = () => {
		overlay.style.display = "none"
		modal.classList.remove('open-image')
	}

	imagesOverlay.forEach((item, index) => {
		item.addEventListener('click', (e) => {
			e.preventDefault()
			let imagePath = elem[index].getAttribute('href')
			openModal(imagePath)
			hideScroll(document.body)
		})
	})

	document.addEventListener('click', (e) => {
		if (e.target.classList.contains('documents-modal__close') || e.target.classList.contains('overlay')) {
			closeModal()
			showScroll(document.body)
		} else if (e.target.classList.contains('sertificate-document')) {
			e.preventDefault()
		}
	})



}