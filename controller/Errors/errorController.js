const { handCastError } = require("./handDBCastError");
const { handleDuplicateFieldsDB } = require("./handleDuplicateFieldsDB");
const { handleValidationErrorDB } = require("./handleValidationErrorDB");

const globalErrorController = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (err.name === "CastError") err = handCastError(err);
  if (err.name === "ValidationError") err = handleValidationErrorDB(err);
  if (err.code === 11000) err = handleDuplicateFieldsDB(err);

  res.status(err.statusCode).json({
    statusCode: err.statusCode,
    message: err.message,
  });
};

module.exports = { globalErrorController };
