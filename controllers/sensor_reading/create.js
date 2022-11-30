const { PropertyRequiredError } = require('../../models/errors')

const createSensorReading = async (sensor, reading) => {
	/* validation */
	if (sensor === undefined || sensor === null) throw new PropertyRequiredError('sensor')
	if (reading === undefined || reading === null) throw new PropertyRequiredError('reading')
	console.log(sensor, reading)
}

module.exports = createSensorReading