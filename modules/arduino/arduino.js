const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const c = require('../../constants')
const util = require('../../util')

class Arduino {
	constructor({ serialPortPath, delimiter }){
		SerialPort.list().then(p => console.log(p))
		this.port = new SerialPort(serialPortPath, { baudRate: 9600 })
		this.parser = this.port.pipe(new Readline({ delimiter }))
		this.listeners = {}

		this.startParser()
	}

	on(event, cb){
		const cbArray = this.listeners[event]
		
		if (cbArray === undefined) {
			this.listeners[event] = [cb]
		}

		if (Array.isArray(cbArray)) {
			const index = cbArray.indexOf(cb);
			if (index > -1) {
			  cbArray.splice(index, 1);
			}
		}
	}

	off(event, cb){
		const cbArray = this.listeners[event]
		
		if (cbArray) {
			util.removeItemAll(cbArray, cb)
		}
	}

	startParser(){
		this.parser.on('data', data => {
			try {
				const msg = JSON.parse(data)
				const { type } = msg
				const callbacks = this.listeners[type] || []
				callbacks.forEach(cb => cb(msg))
			} catch (e) {
				console.log(`Error parsing serial data from arduino: ${e}`)
			}
		});		
	}
}	

module.exports = (config) => {
	return new Arduino(config)
}


