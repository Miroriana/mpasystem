const joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userAccountSignUpValidationSchema = joi.object({
    fullName: joi.string().required().label('Full name'),
    email: joi.string().email().required().label('Email'),
    phone: joi.string().length(10).required().label('Phone'),
    nationalId: joi.string().length(16).required().label('National'),
    role: joi.string().required().label('Role'),
    password: passwordComplexity().required().label('Password'),
});

const userAccountSignInValidationSchema = joi.object({
    email: joi.string().email().required().label('Email'),
    password: passwordComplexity().required().label('Password'),
});

module.exports = {
    userAccountSignUpValidationSchema,
    userAccountSignInValidationSchema
};