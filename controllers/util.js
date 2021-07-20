const fba = require("firebase-admin")

const addHoursToDate = (date, hours) => {
  return new Date(new Date(date).setHours(date.getHours() + hours))
}

const createTimestamp = date => fba.firestore.Timestamp.fromDate(date)

module.exports = {
	addHoursToDate,
	createTimestamp,
}