export const timer = (deadline) => {

	const timerItems = document.querySelectorAll('.count>span')
	const countName = document.querySelectorAll('.count-name')

	// countName.forEach(name => {
	// 	if (name.textContent)
	// })

	const timing = () => {
		let dateStop = new Date(deadline).getTime()
		let dateNow = new Date().getTime()
		let timeGap = (dateStop - dateNow) / 1000
		let days = Math.floor(timeGap / 60 / 60 / 24)
		let hours = Math.floor(timeGap / 60 / 60) % 24
		let minutes = Math.floor(timeGap / 60) % 60
		let seconds = Math.floor(timeGap % 60)
		return {
			timeGap,
			days,
			hours,
			minutes,
			seconds
		}
	}

	const wordDeclension = (name, value) => {
		countName.forEach(item => {
			if (item.classList.contains('days')) {
				if (value % 10 > 1 && value % 10 < 5) item.textContent = name[0];
				else if (value % 10 == 1 && value != 11) item.textContent = name[1];
				else item.textContent = name[2];
			}
		})
	}

	const timeReload = () => {
		let getTime = timing()

		timerItems.forEach(item => {
			const daysArr = ['Дня', 'День', 'Дней']
			const hoursArr = ['Часа', 'Час', 'Часов']
			const minutesArr = ['Минуты', 'Минута', 'Минут']
			const secondsArr = ['Секунды', 'Секунда', 'Секунд']
			const countClass = ['days', 'hours', 'minutes', 'seconds']

			let countValue = item.textContent

			if (item.classList.contains('count-days')) {
				item.textContent = getTime.days
				wordDeclension(daysArr, countValue)
			} else if (item.classList.contains('count-hours')) {
				item.textContent = getTime.hours
				wordDeclension(hoursArr, countValue)
			} else if (item.classList.contains('count-minutes')) {
				item.textContent = getTime.minutes
				wordDeclension(minutesArr, countValue)
			} else if (item.classList.contains('count-seconds')) {
				item.textContent = getTime.seconds
				wordDeclension(secondsArr, countValue)
			}
			if (item.textContent.length < 2) {
				item.textContent = "0" + item.textContent
			}
		})
	}

	let getTime = timing()
	let idInterval = setInterval(() => {
		if (getTime.timeGap > 0) {
			timeReload()
		} else {
			clearTimeout(idInterval)
		}
	}, 1000)
}