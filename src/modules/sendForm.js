import {
	empty
} from "./helper";

import {
	hideScroll
} from './helper'

import {
	showScroll
} from './helper'

export const sendForm = () => {

	const forms = document.querySelectorAll('form')
	const responseModal = document.getElementById('responseMessage')
	const overlay = document.querySelector('.overlay')
	const navbarItem = document.querySelectorAll('#menu > li')[1]
	const pageName = document.querySelector('#menu > li.active').textContent

	const openModal = (modal) => {
		hideScroll(document.body)
		overlay.style.display = "block"
		modal.classList.add('opened')
		modal.style.display = "block"
		modal.style.top = 50 + "%"
	}

	const closeModal = () => {
		showScroll(document.body)
		const modalsOpened = document.querySelectorAll('.opened')
		modalsOpened.forEach(modal => {
			modal.classList.remove('opened')
			modal.style.display = "none"
		})
		overlay.style.display = "none"
	}

	const resetCalc = () => {
		const calcItems = document.querySelectorAll('.calc-item, #calc-total')

		calcItems.forEach(item => {
			if (item.matches('select')) {
				item.selectedIndex = 0
			}
			if (item.matches('input')) item.value = ''
		})
	}

	const validate = (list) => {
		let success = true;
		list.forEach(input => {
			if (!input.classList.contains('success')) {
				success = false;
			}
		});
		return success;
	};

	const sendData = (data) => {
		return fetch('https://jsonplaceholder.typicode.com/posts', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json"
			}
		}).then(responsive => responsive.json())
	};

	const submitForm = (form) => {
		const formElements = form.querySelectorAll('input')
		const formData = new FormData(form)
		const formBody = {};


		formData.forEach((val, key) => {
			formBody[key] = val;
		});
		formBody['page'] = pageName
		if (navbarItem.classList.contains('active')) {
			let calcTotal = document.getElementById('calc-total').value
			if (calcTotal) formBody['price'] = calcTotal
		}

		if (validate(formElements)) {
			sendData(formBody)
				.then(data => {
					console.log(data);
					formElements.forEach(input => {
						empty(input)
					});
					openModal(responseModal)
					setTimeout(closeModal, 2000)
					resetCalc()
				})
				.catch(error => {
					console.log(error)
				});
		} else {
			formElements.forEach(input => {
				if (input.value === '') {
					input.style.boxShadow = "0 0px 10px #e00000";
				}
			});
		}
	};

	forms.forEach((form) => {
		form.addEventListener('submit', (event) => {
			event.preventDefault();
			submitForm(form);
		});
	});
};