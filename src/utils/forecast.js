const fetch = require('node-fetch')

const forecast = (latitude, longitude, callback) => {
	const privateKeyDS = '8274611bfbc505861f7a05058bfaa6a1'
	const urlDS = `https://api.darksky.net/forecast/${privateKeyDS}/${latitude},${longitude}` // ?units=us&lang=es

	fetch(urlDS)
	    .then(res => {
	    	if (!res.ok) {
	    		throw Error(res.statusText)
	    	}
	    	return res.json()
	    })
	    .then(data => callback(undefined, {
	    		weather: data.currently.icon, // to change background of app in public/js/app.js depending on weather
	    		report: `It is currently ${data.currently.temperature}°F out. Today, the temperature high is ${data.daily.data[0].temperatureHigh}°F and the low is ${data.daily.data[0].temperatureLow}°F. There is a ${data.currently.precipProbability}% chance of rain. ${data.daily.summary}`
	    	})
	    )
	    .catch(err => callback('Unable to connect to weather services! ' + err, undefined))
}

module.exports = forecast // incorporate forecast.js into app.js