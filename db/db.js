const c = require('../constants')
const fba = require("firebase-admin")
const serviceAccount = require("../firebase-credentials.json")
fba.initializeApp({ credential: fba.credential.cert(serviceAccount) });
const db = fba.firestore(); 

function addHoursToDate(date, hours) {
  return new Date(new Date(date).setHours(date.getHours() + hours));
}

const createTimestamp = date => fba.firestore.Timestamp.fromDate(date)

const createTemperatureHumidityMeasurement = async ({ humidity, temperature }) => {
	const sensorReadings = db.collection('sensor_readings'); 
	const now = new Date()
	const nowTimestamp = createTimestamp(now)

	const bucket = await sensorReadings.where('end_date', '>=', nowTimestamp).get()

	const measurement = { humidity, temperature, nowTimestamp }

	if (bucket.empty) {
		const doc = sensorReadings.doc()
	
		const endDate = addHoursToDate(now, 1)
		const endDateTimestamp = createTimestamp(endDate)
		
		doc.set({ 
			sensor: c.AM2302_DHT22,
			start_date: nowTimestamp,
			end_date: endDateTimestamp,
			measurements: [measurement]
		})	
	} else {
		const doc = bucket.docs[0].ref

		doc.update({
			measurements: fba.firestore.FieldValue.arrayUnion(measurement)
		})
	}
}

module.exports = {
	createTemperatureHumidityMeasurement
}

