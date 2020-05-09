const weatherForm = document.querySelector('form')
const unit = document.querySelector('#unit')
const search = document.querySelector('#location')
const messageOne = document.querySelector('#message-1')
const temp = document.querySelector('#temp')
const forecast = document.querySelector('#forecast')
const background = document.querySelector('#container')



weatherForm.addEventListener('submit', (e) => {
	e.preventDefault() // prevent default behavior of browser refreshing
	const location = search.value;
	//messageOne.textContent = 'Retrieving weather data ...'
	//temp.textContent = ''
	//forecast.textContent = ''

	fetchWeather(location)

})

unit.addEventListener('click', () => {
	let location = search.value;
	if (location) {
		document.querySelector('button').click()
	} else {
		initiate()
	}
})

const fetchWeather = (place) => {
	fetch('/weather?address=' + place)
		.then((response) => {
	    	response.json()
	    .then((data) => {
	        if (data.error) {
	        	messageOne.textContent = data.error
	        	temp.textContent = ''
	        	forecast.textContent = ''
	        } else {
	        	messageOne.textContent = data.location
	        	const weather = data.weather
	        	let weatherStatus

	        	if (weather === "partly-cloudy-day") {
	              background.className = ''
	              background.classList.add('container','partly-cloudy-day')
	              weatherStatus = 'The weather is currently partly cloudy.<br>'
	            } else if (weather === "partly-cloudy-night") {
	              background.className = ''
	              background.classList.add('container','partly-cloudy-night')
	              weatherStatus = 'The weather is currently partly cloudy.<br>'
	            } else if (weather === "cloudy") {
	              background.className = ''
	              background.classList.add('container','cloudy')
	              weatherStatus = 'The weather is currently cloudy.<br>'
	            } else if (weather === "wind") {
	              background.className = ''
	              background.classList.add('container','wind')
	              weatherStatus = 'The weather is currently windy.<br>'
	            } else if (weather === "rain") {
	              background.className = ''
	              background.classList.add('container','rain')
	              weatherStatus = 'It is currently raining outside.<br>'
	            } else if (weather === "clear-day") {
	              background.className = ''
	              background.classList.add('container','clear-day')
	              weatherStatus = 'The weather is currently clear skies.<br>'
	            } else if (weather === "clear-night") {
	              background.className = ''
	              background.classList.add('container','clear-night')
	              weatherStatus = 'The weather is currently clear skies.<br>'
	            } else if (weather === "fog") {
	              background.className = ''
	              background.classList.add('container','fog')
	              weatherStatus = 'The weather is currently foggy.<br>'
	            } else if (weather === "snow") {
	              background.className = ''
	              background.classList.add('container','snow')
	              weatherStatus = 'It is currently snowing outside.<br>'
	            } else if (weather === "sleet") {
	              background.className = ''
	              background.classList.add('container','sleet')
	              weatherStatus = 'It is currently sleeting outside.<br>'
	            } else {
	              background.className = ''
	              background.classList.add('container','other')
	              weatherStatus = 'Weather conditions are currently severe.<br>'
	            }

	            if (unit.checked === true) { // SI units
					temp.textContent = Math.round((data.temperature-32)*5/9) + ' °C'
	        		forecast.innerHTML = `${weatherStatus} The temperature high for today is projected to be <strong>${Math.round((data.highs-32)*5/9)} °C</strong> and the low is projected to be <strong>${Math.round((data.lows-32)*5/9)} °C</strong>. ${data.forecast}`
	        	} else { // US units
	        		temp.textContent = data.temperature + ' °F'
	        		forecast.innerHTML = `${weatherStatus} The temperature high for today is projected to be <strong>${data.highs} °F</strong> and the low is projected to be <strong>${data.lows} °F</strong>. ${data.forecast}`
	        	}

            
	        }
	    })
	})
}



const initiate = () => {
	fetch('https://ipapi.co/json').then((response) => {
		response.json()
		.then((data) => {
			fetchWeather(data.city)
		})
	})
}
initiate()

