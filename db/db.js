
const db = require('')('db.db');
const constants = require('../constants.js')

function saveMeasurement(measurement) {
    const insert = db.prepare(`
        INSERT INTO measurements (sensor, temperature, humidity) 
        VALUES (@sensor, @temperature , @humidity)
    `);

    insert.run(measurement)
}

module.exports = {
    saveMeasurement,
}