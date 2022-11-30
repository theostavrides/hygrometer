const db = require('better-sqlite3')('db.db');
const constants = require('../constants.js')

function saveMeasurement(measurement) {
    const insert = db.prepare(`
        INSERT INTO measurements (sensor, temperature, humidity, timestamp) 
        VALUES (@sensor, @temperature , @humidity, @timestamp)
    `);

    insert.run(measurement)
}

module.exports = {
    saveMeasurement,
}