const path = require('path') // used to get root index.html file inside 'public' folder
const express = require('express')
const hbs = require('hbs') // require hbs for partials

const geocode = require('./utils/geocode') // incorporate geocode.js into app.js
const forecast = require('./utils/forecast') // incorporate forecast.js into app.js

// Creates an Express application
const app = express()

const port = process.env.PORT || 3000 // Heroku

// Define paths for Express config
const publicPath = path.join(__dirname, '../public') // points to 'public' folder
const viewsPath = path.join(__dirname, '../templates/views') // points to 'views' folder
const partialsPath = path.join(__dirname, '../templates/partials') // points to 'partials' folder
//__dirname = folder path, __filename = file path

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath) // points Express to custom directory
hbs.registerPartials(partialsPath) // configure partials directory for hbs module

// Setup static directory to server
app.use(express.static(publicPath)) // express.static() middleware checks public folder to serve .css, etc. files

// app.com
app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather App',
		name: 'Crystal Agoncillo'
	})
})

// app.com/about
app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About Me',
		name: 'Crystal Agoncillo'
	})
})

// app.com/help
app.get('/help', (req, res) => {
	res.render('help', {
		title: 'How-To',
		name: 'Crystal Agoncillo',
		message: `Instructions for using this app:`
	})
})

// app.com/weather (Weather App)
app.get('/weather', (req, res) => {
	const address = req.query.address

	if (!req.query.address) {
		return res.send({
			error: 'You must provide an address.'
		})
	}
	geocode(address, (error, {latitude, longitude, location} = {}) => { // destructured from data
		if (error) {
			return res.send(error) // can use return instead of else statement
		}

		forecast(latitude, longitude, (error, forecastData) => { // data.latitude, data.longitude
			if (error) {
				return res.send(error)
			}
			// If both requests work, run code below:
			res.send({
				forecast: forecastData,
				location: location,
				address: req.query.address
			})
		})
	})
})

// 404 pages
app.get('/help/*', (req, res) => {
	res.render('404', {
		title: '404 Error',
		name: 'Crystal Agoncillo',
		message: 'Error: Help article not found.'
	})
})

app.get('*', (req, res) => { // * = match anything that hasn't been matched so far
	res.render('404', {
		title: '404 Error',
		name: 'Crystal Agoncillo',
		message: 'Eror: Page not found.'
	})
})

app.listen(port, () => {
	console.log('Server is running on port ' + port)
})