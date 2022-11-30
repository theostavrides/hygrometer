const constants = require('./constants')
const arduino = require('./modules/arduino')()
const createSensorReading = require('./controllers/sensor_reading/create')

const handleTempertureHumidityMeasurement = async measurement => {
	try {
		return await createSensorReading(constants.AM2302_DHT22, measurement)
	} catch (error) {
		console.log(error)
	}
}

arduino.on(constants.TEMPERTURE_HUMUDITY_MEASUREMENT, handleTempertureHumidityMeasurement)