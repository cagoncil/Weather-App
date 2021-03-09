const weatherForm = document.querySelector('form')
const unit = document.querySelector('#unit')
const search = document.querySelector('#location')
const messageOne = document.querySelector('#message-1')
const temp = document.querySelector('#temp')
const forecast = document.querySelector('#forecast')
const background = document.querySelector('#container')



weatherForm.addEventListener('submit', (e) => {
	e.preventDefault() // prevent default behavior of browser refreshing
	const location = search.value
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
	    	if (!response.ok) {
	    		throw Error(response.statusText)
	    	}
	    	return response.json()
	    })
	    .then((data) => {
	        if (data.error) {
	        	messageOne.textContent = data.error
	        	temp.textContent = ''
	        	forecast.textContent = ''
	        	console.log(data.error)
	        } else {
	        	messageOne.textContent = data.location
	        	const weather = data.weather
	        	let weatherStatus
	        	const weatherMappings = {
	        		'partly-cloudy-day':'The weather is currently partly cloudy.<br>', 
	        		'partly-cloudy-night': 'The weather is currently partly cloudy.<br>',
	        		'cloudy':'The weather is currently cloudy.<br>',
	        		'wind':'The weather is currently windy.<br>',
	        		'rain':'It is currently raining outside.<br>',
	        		'clear-day':'The weather is currently clear skies.<br>',
	        		'clear-night':'The weather is currently clear skies.<br>',
	        		'fog':'The weather is currently foggy.<br>',
	        		'snow':'It is currently snowing outside.<br>',
	        		'sleet':'It is currently sleeting outside.<br>'
	        	}
	        	if (!weatherMappings[weather]) {
	        		background.className = ''
	        		background.classList.add('container','other')
	               	weatherStatus = 'Weather conditions are currently severe.<br>'
	        	}
	        	background.className = ''
	        	background.classList.add('container', weather)
	        	weatherStatus = weatherMappings[weather]


	     //    	switch(weather) {
	     //    		case 'partly-cloudy-day':
		    //     		background.className = ''
		    //           	background.classList.add('container','partly-cloudy-day')
		    //           	weatherStatus = 'The weather is currently partly cloudy.<br>'
		    //           	break
		    //         case 'partly-cloudy-night':
		    //         	background.className = ''
	     //          		background.classList.add('container','partly-cloudy-night')
	     //          		weatherStatus = 'The weather is currently partly cloudy.<br>'
	     //          		break
		    //         case 'cloudy':
		    //         	background.className = ''
	     //          		background.classList.add('container','cloudy')
	     //          		weatherStatus = 'The weather is currently cloudy.<br>'
	     //          		break
		    //         case 'wind':
		    //         	background.className = ''
	     //          		background.classList.add('container','wind')
	     //          		weatherStatus = 'The weather is currently windy.<br>'
	     //          		break
		    //         case 'rain':
		    //         	background.className = ''
	     //          		background.classList.add('container','rain')
	     //          		weatherStatus = 'It is currently raining outside.<br>'
	     //          		break
		    //         case 'clear-day':
		    //         	background.className = ''
	     //          		background.classList.add('container','clear-day')
	     //          		weatherStatus = 'The weather is currently clear skies.<br>'
	     //          		break
		    //         case 'clear-night':
		    //         	background.className = ''
	     //          		background.classList.add('container','clear-night')
	     //          		weatherStatus = 'The weather is currently clear skies.<br>'
	     //          		break
		    //         case 'fog':
		    //         	background.className = ''
	     //          		background.classList.add('container','fog')
	     //          		weatherStatus = 'The weather is currently foggy.<br>'
	     //          		break
		    //         case 'snow':
		    //         	background.className = ''
	     //          		background.classList.add('container','snow')
	     //          		weatherStatus = 'It is currently snowing outside.<br>'
	     //          		break
		    //         case 'sleet':
						// background.className = ''
						// background.classList.add('container','sleet')
						// weatherStatus = 'It is currently sleeting outside.<br>'
						// break
		    //         default:
		    //         		background.className = ''
	     //          		background.classList.add('container','other')
	     //          		weatherStatus = 'Weather conditions are currently severe.<br>'
	     //          		break
	     //    	}

	            if (unit.checked === true) { // SI units
					temp.textContent = Math.round((data.temperature-32)*5/9) + ' °C'
	        		forecast.innerHTML = `${weatherStatus} The temperature high for today is projected to be <strong>${Math.round((data.highs-32)*5/9)} °C</strong> and the low is projected to be <strong>${Math.round((data.lows-32)*5/9)} °C</strong>. ${data.forecast}`
	        	} else { // US units
	        		temp.textContent = data.temperature + ' °F'
	        		forecast.innerHTML = `${weatherStatus} The temperature high for today is projected to be <strong>${data.highs} °F</strong> and the low is projected to be <strong>${data.lows} °F</strong>. ${data.forecast}`
	        	}
            
	        }
	    })
	    .catch(error => {
			console.log(`${error}. Please wait and try again later.`)
		})
}

const initiate = () => {
	fetch('https://ipapi.co/json')
		.then(response => {
			if (!response.ok) {
	    		throw Error(response.status)
	    	}
	    	return response.json()
		})
		.then(data => fetchWeather(data.city))
		.catch(error => {
			console.log(`${error}. Too many requests. Please wait and try again later.`)
		})
}
initiate()

