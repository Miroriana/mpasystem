const { errorHandler } = require("../../utility/errorHandlerClass");

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data. ${errors.join(". ")}`;
  return new errorHandler(message, 400);
};

module.exports = { handleValidationErrorDB };
