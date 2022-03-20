export const timer = (deadline) => {

	const timerItems = document.querySelectorAll('.count>span')
	const countDays = document.querySelectorAll('.count_1>span')

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

	const timeReload = () => {
		let getTime = timing()

		timerItems.forEach(item => {
			if (item.closest('.count_1')) {
				item.textContent = getTime.days
			} else if (item.closest('.count_2')) {
				item.textContent = getTime.hours
			} else if (item.closest('.count_3')) {
				item.textContent = getTime.minutes
			} else if (item.closest('.count_4')) {
				item.textContent = getTime.seconds
			}
			if (item.textContent.length < 2) {
				item.textContent = "0" + item.textContent
			}
		})
		countDays.textContent = getTime.days
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