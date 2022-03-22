import {
	empty
} from "./helper";

export const sendForm = () => {

	const forms = document.querySelectorAll('form')

	//
	// const statusMessage = document.getElementById('responseMessage')
	// const overlay = document.querySelector('.overlay')
	// const formSuccess = () => {
	// 	statusMessage.style.display = "block"
	// 	overlay.style.display = "block"
	// 	overlay.style.opacity = 1
	// }

	// formSuccess()
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
					alert('Данные отправленны!')
					formElements.forEach(input => {
						empty(input)
					});
				})
				.catch(error => {
					console.log(error)
				});
		} else {
			alert('Не верно заполнены поля')
		}
	};

	forms.forEach((form) => {
		form.addEventListener('submit', (event) => {
			event.preventDefault();
			submitForm(form);
		});
	});
};