const db = require('./db')
const c = require('./constants')

const arduino = require('./modules/arduino')({
	serialPortPath: '/dev/tty.usbmodem141101',
	delimiter: '\n',
})

// Register sensor event listeners 

const handleTempertureHumidityMeasurement = (measurement) => {
	db.createTemperatureHumidityMeasurement(measurement)
}


arduino.on(c.TEMPERTURE_HUMUDITY_MEASUREMENT, handleTempertureHumidityMeasurement)

