
const db = require('')('db.db');
const constants = require('../constants.js')

function saveMeasurement({ 
    sensor, 
    temperature = null, 
    humidity = null,
}) {
    const insert = db.prepare(`
        INSERT INTO measurements (sensor, temperature, humidity) 
        VALUES (@sensor, @temperature , @humidity)
    `);

    insert.run({ 
        sensor, 
        temperature, 
        humidity 
    })
}

module.exports = {
    saveMeasurement,
}