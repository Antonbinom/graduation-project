export const animate = ({ // во время запуска функции
	timing,
	draw,
	duration // длительность анимации
}) => {

	let start = performance.now(); // текущая точка времени на данный момент

	requestAnimationFrame(function animate(time) { // внутри функции запускается еще одна функция с аргументом в качестве временной рамки очередного повторения функции animate
		// timeFraction изменяется от 0 до 1
		let timeFraction = (time - start) / duration; // разность текущего времени и началом нашей анимации деленное на длительность анимации
		if (timeFraction > 1) timeFraction = 1;

		// вычисление текущего состояния анимации
		let progress = timing(timeFraction); // результат выполнения функции timing с числом от 0 до 1

		draw(progress); // отрисовать её

		if (timeFraction < 1) {
			requestAnimationFrame(animate);
		}

	});
}