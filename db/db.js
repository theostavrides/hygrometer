const c = require('../constants')
const fba = require("firebase-admin")
const serviceAccount = require("../firebase-credentials.json")
fba.initializeApp({ credential: fba.credential.cert(serviceAccount) });
const db = fba.firestore(); 

const createTimestamp = () => fba.firestore.FieldValue.serverTimestamp()

const createTemperatureHumidityMeasurement = ({ humidity, temperature }) => {
	const sensorsCollection = db.collection(c.AM2302_DHT22); 
	const doc = sensorsCollection.doc()
	
	doc.set({ 
		humidity, 
		temperature,
		created: createTimestamp(),
	})	
}

module.exports = {
	createTemperatureHumidityMeasurement
}
