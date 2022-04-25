export const comments = (dataBase) => {

	const comments = document.querySelector('.comments-container');
	let startIndex = 0
	const adjustIndex = (arr, index) => {
		// если индекс последний в массиве
		if (index > arr.length - 1) {
			index = 0
		}
		// если индекс меньше ноля
		if (index < 0) {
			// индекс будет последним в массиве
			index = arr.length - 1
		}
		// вернем индекс
		return index
	}

	const render = (data) => {
		comments.innerHTML = '';
		const colors = ['green', 'orange', 'gray']

		data.forEach((item, index) => {

			let i
			let side
			if (index === 0 || index % 3 === 0) i = 0
			if ((index + 1) % 3 === 0) i = 1
			if ((index + 2) % 3 === 0) i = 2

			if (index % 2 == 1) side = 'right'
			else side = 'left'


			let avatarHtml = `
				<div class = "col-xs-3 col-sm-2">
					<div class = "review-user">
						<img src = "images/users/${item.image || 'avatar.png'}" alt = ""
					class = "img-responsive avatar">
					</div>
				</div>
			`

			let commentHtml = `
			<div class = "col-xs-9 col-sm-9">
				<div div class = "review-inner review-${colors[i]} review-arrow review-arrow-${side}" >
					<p class = "text-normal"> ${item.author} </p>
					<p> ${item.comment}</p>
				</div>
			</div>
			`

			if (index % 2 == 1) {
				comments.insertAdjacentHTML('beforeend', `
				<div class = "review-margin-bottom row comment-item">
					${commentHtml}
					${avatarHtml}
				</div>
				`)
			}

			if (index % 2 == 0) {
				comments.insertAdjacentHTML('beforeend', `
				<div class = "review-margin-bottom row comment-item">
					${avatarHtml}
					${commentHtml}
				`)
			}
		});

	};

	const getData = () => {
		fetch(dataBase, )
			.then((response) => {
				if (response.ok) {
					return response.json()
				} else {
					throw new Error('Данные были получены с ошибкой');
				}
			})
			.then((data) => {
				sliceArray(data.comments);
			})
			.catch((error) => {
				console.log(error.message);
			});
	};
	getData();

	const sliceArray = (data, index) => {
		// создаем массив с 3-мя элементами
		let slice = data.slice(startIndex, startIndex + 3)

		// если длинна массива равна 2
		if (slice.length === 2) {
			// добавляем первый элемент массива
			slice.push(data[0])
		}
		// если длинна массива равна 1
		if (slice.length === 1) {
			// добавляем первый и второй элементы массива
			slice.push(data[0], data[1])
		}
		// запускаем отрисовку данных и массива
		render(slice)
		// после увеличиваю начальный индекс на 1
		startIndex++
		// начальный индекс пересчитывается в функции
		startIndex = adjustIndex(data, startIndex)
	};

	setInterval(() => getData(dataBase), 5000)
}