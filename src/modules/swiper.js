import Swiper, {
	Navigation,
} from 'swiper'

export const swiper = () => {

	const swiperOne = new Swiper('.benefits-inner', {
		loop: true,
		modules: [Navigation],
		slidesPerView: 1,
		breakpoints: {
			576: {
				slidesPerView: 3
			}
		},
		navigation: {
			nextEl: '.benefits__arrow--right',
			prevEl: '.benefits__arrow--left',
		},
	})

	const swiperTwo = new Swiper('.swiper-services', {
		loop: true,
		modules: [Navigation],
		slidesPerView: 1,
		breakpoints: {
			576: {
				slidesPerView: 2
			}
		},
		navigation: {
			nextEl: '.services__arrow--right',
			prevEl: '.services__arrow--left',
		},
	})
}