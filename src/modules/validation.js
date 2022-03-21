import {
	empty
} from './helper'

export const validation = () => {

	const inputs = document.querySelectorAll('input')
	const forms = document.querySelectorAll('form')

	const success = (item) => {
		item.classList.add('success');
		item.style.boxShadow = "0 0px 10px #00902a";
	};

	const denied = (item) => {
		item.classList.remove('success');
		item.classList.add('denied');
		item.style.boxShadow = "0 0px 10px #e00000";
	};



	const checkInput = (input, reg) => {
		let item = input.value;
		let valid = reg.test(item);
		if (valid) success(input);
		else if (input.value == 0 || input.value === '+7') empty(input);
		else denied(input);
		return valid;
	};

	inputs.forEach(input => {
		input.addEventListener('input', (e) => {
			if (e.target.name === 'phone') {
				e.target.value = e.target.value.replace(/[^0-9\+]/gi, "");
			} else if (e.target.name === 'name') {
				e.target.value = e.target.value.replace(/[^а-яa-z\ ]/gi, "");
			}
		})
	})


	inputs.forEach(input => {
		input.addEventListener('focus', (e) => {
			if (e.target.name === 'phone' && e.target.value === '') {
				e.target.value = '+7'
			}
		})

		input.addEventListener('blur', (e) => {
			if (e.target.name === 'phone' && e.target.value == '+7') {
				input.value = ''
			}
		})
	})

	forms.forEach((form) => {
		form.addEventListener('change', (e) => {
			if (e.target.name === 'phone') {
				let reg = /^\+\d[\d\(\)\ -]{1,13}\d$/;
				checkInput(e.target, reg);

			} else if (e.target.name === 'name') {
				e.target.value = e.target.value.trim().toLowerCase().replace(/([\ ]|^)([а-яёa-z])/g, (str) => {
					return str.toUpperCase();
				});
				let reg = /^[а-яa-z\ ]{2,15}$/i;
				checkInput(e.target, reg);
			}
		});
	});
};