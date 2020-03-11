const fetch = require('node-fetch')

const geocode = (address, callback) => {
	const privateKeyMB = 'pk.eyJ1IjoiY2Fnb25jaWwiLCJhIjoiY2s3M3o5dHNrMDFtaTNrbnlnaTZ2bzJhcyJ9.uNhMnzXQIfpjDIQ1a25gxA'
	const urlMB = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${privateKeyMB}&limit=1`
   	
   	fetch(urlMB)
    .then(res => {
    	if (!res.ok) {
    		throw Error(res.statusText)
    	}
    	return res.json()
    })
    .then(data => {
    	if (data.features.length === 0) {
    		callback({error: 'Unable to find location. Please try another search.'}, undefined)
    	} else {
	    	callback(undefined, {
	    		location: data.features[0].place_name,
	    		latitude: data.features[0].center[1],
    			longitude: data.features[0].center[0]
	    	})
    	}
    })
    .catch(err => callback(`Unable to connect to location services! ${err}`, undefined))
}

module.exports = geocode // incorporate geocode.js into app.js