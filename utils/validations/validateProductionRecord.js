const joi = require("joi");

const productionValidationSchema = joi.object({
    farmerName: joi.string().required().label('Farmer name'),
    farmerPhone: joi.string().required().label('Phone'),
    quantity: joi.string().required().label('Quantity'),
});

module.exports = {
    productionValidationSchema
};