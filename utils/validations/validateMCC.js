const joi = require("joi");

const addMccValidationSchema = joi.object({
    name: joi.string().required().label('Mcc name'),
    province: joi.string().required().label('Province'),
    district: joi.string().required().label('District'),
    sector: joi.string().required().label('Sector'),
});

module.exports = {
    addMccValidationSchema
};