import {
	animate
} from "./helper";

export const calc = (price = 3000) => {
	const calcItem = document.querySelector('.calc-item')
	const calcBlock = document.getElementById('calc')
	const calcType = document.getElementById('calc-type')
	const calcMaterial = document.getElementById('calc-type-material')
	const calcSquare = document.getElementById('calc-input')
	const total = document.getElementById('calc-total')
	const navbarItem = document.querySelectorAll('#menu > li')[1]

	if (navbarItem.classList.contains('active')) {
		const debounce = (callback, input) => {
			if (input.matches('select') || input.matches('input')) {
				let timeout;
				return (argument) => {
					clearTimeout(timeout);
					timeout = setTimeout(callback, 1000, argument);
				};
			}
		}

		const countCalc = () => {
			let totalValue;
			let calcTypeValue = +calcType.options[calcType.selectedIndex].value
			let calcMaterialValue = +calcMaterial.options[calcMaterial.selectedIndex].value
			let calcSquareValue = +calcSquare.value
			calcSquare.value

			if (calcTypeValue && calcMaterialValue && calcSquareValue) {
				totalValue = Math.round(calcTypeValue * calcMaterialValue * calcSquareValue * price)
			} else totalValue = 0
			total.value = totalValue
			animate({
				duration: 500,
				timing(timeFraction) {
					return timeFraction;
				},
				draw(progress) {
					total.value = Math.round(progress * totalValue)
				}
			});
		}
		const debouncedOnInput = debounce(countCalc, calcItem)
		calcBlock.addEventListener('input', debouncedOnInput)
	}
}