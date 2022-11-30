const constants = require('./constants')
const arduino = require('./modules/arduino')()
const { saveMeasurement } = require('./db/db.js')

const handleTempertureHumidityMeasurement = async measurement => {
	try {
		saveMeasurement(measurement)
	} catch (error) {
		console.log(error)
	}
}

arduino.on(constants.TEMPERTURE_HUMUDITY_MEASUREMENT, handleTempertureHumidityMeasurement)