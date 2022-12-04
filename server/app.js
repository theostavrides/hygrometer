const constants = require('./constants')
const express = require('express')
const app = express()
const port = constants.EXPRESS_PORT
const db = require('./db/db.js')
const { Arduino } = require('./modules/arduino')

// ------------------- Arduino ---------------------

const initArduino = async() => {	
	try {
		const arduino = new Arduino()
		
		await arduino.init()
		
		const handleTempertureHumidityMeasurement = async measurement => {
			try {
				db.saveMeasurement({ ...measurement, timestamp: Date.now() })
			} catch (error) {
				console.log(error)
			}
		}
		
		arduino.on(constants.TEMPERTURE_HUMUDITY_MEASUREMENT, handleTempertureHumidityMeasurement)
	} catch(e) {
		console.log(e)
	}
}

initArduino()

// -------------------- Routes ----------------------

app.get('/measurements', (req, res) => {
	const now = Date.now()
	const oneWeekAgo = now - (1000 * 60 * 60 * 24 * 7)
	const measurements = db.getMeasurements({ from: oneWeekAgo, to: now })
	res.json(measurements)
})
  
app.listen(port, () => { console.log(`App listening on port ${port}`) })