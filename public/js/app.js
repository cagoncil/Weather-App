const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const background = document.querySelector('#container')

weatherForm.addEventListener('submit', (e) => {
	e.preventDefault() // prevent default behavior of browser refreshing
	const location = search.value;
	messageOne.textContent = 'Retrieving weather data ...'
	messageTwo.textContent = ''

	fetch('/weather?address=' + location).then((response) => {
	    response.json().then((data) => {
	        if (data.error) {
	        	messageOne.textContent = data.error
	        	messageTwo.textContent = ''
	        } else {
	        	messageOne.textContent = data.location
	        	messageTwo.textContent = data.forecast

	        	const weather = data.weather

	        	if (weather === "partly-cloudy-day") {
	              background.className = ''
	              background.classList.add('container','partly-cloudy-day')
	            } else if (weather === "partly-cloudy-night") {
	              background.className = ''
	              background.classList.add('container','partly-cloudy-night')
	            } else if (weather === "cloudy") {
	              background.className = ''
	              background.classList.add('container','cloudy')
	            } else if (weather === "wind") {
	              background.className = ''
	              background.classList.add('container','wind')
	            } else if (weather === "rain") {
	              background.className = ''
	              background.classList.add('container','rain')
	            } else if (weather === "clear-day") {
	              background.className = ''
	              background.classList.add('container','clear-day')
	            } else if (weather === "clear-night") {
	              background.className = ''
	              background.classList.add('container','clear-night')
	            } else if (weather === "fog") {
	              background.className = ''
	              background.classList.add('container','fog')
	            } else if (weather === "snow") {
	              background.className = ''
	              background.classList.add('container','snow')
	            } else if (weather === "sleet") {
	              background.className = ''
	              background.classList.add('container','sleet')
	            } else {
	              background.className = ''
	              background.classList.add('container','other')
	            }

            document.querySelector("input").value = ""
	        }
	    })
	})

	search.value = ''
})
