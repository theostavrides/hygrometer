class AppError extends Error {
	constructor(message){
		super(message)
		this.name = this.constructor.name
	}
}

// Validation Errors

class ValidationError extends AppError {}

class PropertyRequiredError extends ValidationError {
	constructor(property){
		super("No property: " + property)
	}
}

module.exports = {
	AppError,
	ValidationError,
	PropertyRequiredError,
}