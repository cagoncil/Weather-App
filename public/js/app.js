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
	messageOne.textContent = 'Retrieving weather data ...'
	temp.textContent = ''
	forecast.textContent = ''

	fetch('/weather?address=' + location).then((response) => {
	    response.json().then((data) => {
	        if (data.error) {
	        	messageOne.textContent = data.error
	        	temp.textContent = ''
	        	forecast.textContent = ''
	        } else {

	        	messageOne.textContent = data.location

	        	if (unit.checked === true) { // SI units
					temp.textContent = Math.round((data.temperature-32)*5/9) + ' °C'
	        		forecast.textContent = `Today, the temperature high is ${Math.round((data.highs-32)*5/9)} °C and the low is ${Math.round((data.lows-32)*5/9)} °C. ${data.forecast}`
	        	} else { // US units
	        		temp.textContent = data.temperature + ' °F'
	        		forecast.textContent = `Today, the temperature high is ${data.highs} °F and the low is ${data.lows} °F. ${data.forecast}`
	        	}
	        	
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
            
	        }
	    })
	})
	// search.value = ''

})

unit.addEventListener('click', () => {
	if (search.value.length > 0) {
		document.querySelector('button').click()
	}
})