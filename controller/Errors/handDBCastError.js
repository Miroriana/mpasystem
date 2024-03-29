const { errorHandler } = require("../../utility/errorHandlerClass");

const handCastError = (err) => {
  console.log(err.value);
  const message = `Invalid ${err.path}: ${
    typeof err.value !== "object" ? err.value : err.value._id
  }`;
  return new errorHandler(message, 400);
};

module.exports = { handCastError };
