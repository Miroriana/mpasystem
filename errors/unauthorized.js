const { default: statusCodes } = require('http-status-codes');
const CustomAPIError = require('./customError');

class UnauthorizedError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = statusCodes.FORBIDDEN;
  }
}

module.exports = UnauthorizedError;