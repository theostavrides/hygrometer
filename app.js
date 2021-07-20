require('dotenv').config()

// Init Firestore
const fba = require("firebase-admin")
const serviceAccount = require("./firebase-credentials.json")
fba.initializeApp({ credential: fba.credential.cert(serviceAccount) })

const c = require('./constants')
const db = fba.firestore()
const arduino = require('./modules/arduino')()

const createSensorReading = require('./controllers/sensor_reading/create')

const handleTempertureHumidityMeasurement = async measurement => {
	try {
		return await createSensorReading(c.AM2302_DHT22, measurement)
	} catch (error) {
		console.log(error)
	}
}

arduino.on(c.TEMPERTURE_HUMUDITY_MEASUREMENT, handleTempertureHumidityMeasurement)