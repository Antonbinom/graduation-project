export const comments = (dataBase) => {

	const comments = document.querySelector('.comments-container');
	let startIndex = 0

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
				render(sliceArray(data.comments));
			})
			.catch((error) => {
				console.log(error.message);
			});
	};
	getData();

	const sliceArray = (data) => {
		// создаем массив с 3-мя элементами
		let slice = data.slice(startIndex, startIndex + 3)
		// render(slice)

		return slice

	};

	getData(dataBase)
}