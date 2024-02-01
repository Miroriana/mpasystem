const { default: statusCodes } = require('http-status-codes');
const CustomAPIError = require('./customError');

class NotFoundError extends CustomAPIError {
    constructor(message) {
        super(message);
        this.statusCode = statusCodes.NOT_FOUND;
    }
}

module.exports = NotFoundError;