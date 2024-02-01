const CustomAPIError = require('./customError');
const NotFoundError = require('./not-found');
const BadRequestError = require('./bad-request');
const UnauthenticatedError = require('./unauthenticated');
const UnauthorizedError = require('./unauthorized');

module.exports = {
    CustomAPIError,
    NotFoundError,
    BadRequestError,
    UnauthenticatedError,
    UnauthorizedError
}