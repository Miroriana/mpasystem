const { default: statusCodes } = require('http-status-codes');
const CustomAPIError = require('./customError');

class BadRequestError extends CustomAPIError {
    constructor(message) {
        super(message);
        this.statusCode = statusCodes.BAD_REQUEST;
    }
}

module.exports = BadRequestError;