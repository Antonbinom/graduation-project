import {
	empty
} from "./helper";

import {
	modal
} from "./modal";

export const sendForm = () => {

	const forms = document.querySelectorAll('form')
	const responseModal = document.getElementById('responseMessage')
	const overlay = document.querySelector('.overlay')

	const openModal = () => {
		overlay.style.display = "block"
		responseModal.classList.add('opened')
		responseModal.style.display = "block"
		responseModal.style.top = 50 + "%"
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

		if (validate(formElements)) {
			sendData(formBody)
				.then(data => {
					console.log(data);
					formElements.forEach(input => {
						empty(input)
					});
					openModal(responseMessage)
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