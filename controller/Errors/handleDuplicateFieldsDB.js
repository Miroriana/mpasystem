const { errorHandler } = require("../../utility/errorHandlerClass");

const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];

  const message = `Duplicate field value: ${value}`;
  return new errorHandler(message, 400);
};

module.exports = { handleDuplicateFieldsDB };
