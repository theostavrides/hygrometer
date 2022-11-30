const constants = require('./constants')
const arduino = require('./modules/arduino')()

const handleTempertureHumidityMeasurement = async measurement => {
	try {
		// console.log(measurement)
		// return await createSensorReading(constants.AM2302_DHT22, measurement)
	} catch (error) {
		console.log(error)
	}
}

arduino.on(constants.TEMPERTURE_HUMUDITY_MEASUREMENT, handleTempertureHumidityMeasurement)