const util = require('../util.js')
const fba = require("firebase-admin")
const db = fba.firestore()
const { PropertyRequiredError } = require('../../models/errors')

const createSensorReading = async (sensor, reading) => {
	/* validation */
	if (sensor === undefined || sensor === null) throw new PropertyRequiredError('sensor')
	if (reading === undefined || reading === null) throw new PropertyRequiredError('reading')

	/* main */
	const sensorReadings = db.collection('sensor_readings')
	const now = new Date()
	const nowTimestamp = util.createTimestamp(now)
	const bucket = await sensorReadings
		.where('sensor', '==', sensor)
		.where('end_date', '>=', nowTimestamp).get()

	if (bucket.empty) {
		const doc = sensorReadings.doc()
		const endDate = util.addHoursToDate(now, 1)
		const endDateTimestamp = util.createTimestamp(endDate)
		
		doc.set({ 
			sensor,
			start_date: nowTimestamp,
			end_date: endDateTimestamp,
			readings: [reading]
		})	
	} else {
		const doc = bucket.docs[0].ref
		doc.update({ readings: fba.firestore.FieldValue.arrayUnion(reading) })
	}
}

module.exports = createSensorReading