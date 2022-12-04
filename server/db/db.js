const db = require('better-sqlite3')('db.db');

function saveMeasurement(measurement) {
    const q = db.prepare(`
        INSERT INTO measurements (sensor, temperature, humidity, timestamp) 
        VALUES (@sensor, @temperature , @humidity, @timestamp)
    `);

    q.run(measurement)
}

function getMeasurements({ from = 0, to = Date.now() }) {
    const q = db.prepare(`
        SELECT * FROM measurements 
        WHERE timestamp >= @from
        AND timestamp <= @to
    `);

    return q.all({ from, to })
}

module.exports = {
    saveMeasurement,
    getMeasurements,
}