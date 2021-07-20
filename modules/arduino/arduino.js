const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const c = require('../../constants')
const util = require('../../util')

const delimiter = '\n'
const baudRate = 9600

class Arduino {
	constructor(){
		this.listeners = {}
		this.init()
	}

	async init(){
		const ports = await SerialPort.list()
		
		const arduinoPort = ports.find(p => {
			return p.manufacturer?.includes('Arduino')
		})

		if (!arduinoPort) {
			throw new Error('Could not detect arduino, are you sure it is plugged in?')
		}

		this.port = new SerialPort(arduinoPort.path, { baudRate })
		this.parser = this.port.pipe(new Readline({ delimiter }))

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
			} catch (error) {
				console.log(`Error parsing serial data from arduino: ${error}`)
			}
		});		
	}
}	

module.exports = (config) => {
	return new Arduino(config)
}


// SerialPort.list().then(p => console.log(p))
