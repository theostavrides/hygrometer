require('dotenv').config()
const db = require('./db')
const c = require('./constants')

const arduino = require('./modules/arduino')()

// Register sensor event listeners 

const handleTempertureHumidityMeasurement = measurement => {
	db.createTemperatureHumidityMeasurement(measurement)
}

arduino.on(c.TEMPERTURE_HUMUDITY_MEASUREMENT, handleTempertureHumidityMeasurement)