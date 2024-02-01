/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     signUp:
 *       type: object
 *       required:
 *         - fullName
 *         - email
 *         - password
 *         - role
 *         - phoneNumber
 *         - confirmPassword
 *         - nationalId
 *       properties:
 *         fullName:
 *           type: string
 *           description: The full name of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *         role:
 *           type: string
 *           description: The role of the user
 *         phoneNumber:
 *           type: string
 *           description: The phone number of the user
 *         confirmPassword:
 *           type: string
 *           description: Confirm password for verification
 *         nationalId:
 *           type: string
 *           description: The national ID of the user
 *       example:
 *         fullName: John Doe
 *         email: email@example.com
 *         password: myPassword!
 *         role: Admin
 *         phoneNumber: +1234567890
 *         confirmPassword: myPassword!
 *         nationalId: 123456789999999876
 *     login:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: The email of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *       example:
 *         email: email@example.com
 *         password: myPassword!
 */

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: The authentication authorization managing API
 */

/**
 * @swagger
 * /mpas/authentication/v1/auth/signin:
 *   post:
 *     summary: Log into user account
 *     tags: [Authentication]
 *     requestBody:
 *          required: true
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/login'
 *     responses:
 *       200:
 *          description: The user was successfully authorised
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/login'
 *       403:
 *          description: Wrong email or password
 *       500:
 *          description: Internal Server Error
 */
/**
 * @swagger
 * /mpas/authentication/v1/auth/signup:
 *   post:
 *     summary: Sign up to make a new account
 *     tags: [Authentication]
 *     requestBody:
 *          required: true
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/signUp'
 *     responses:
 *       200:
 *          description: The user was successfully signed up
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/signUp'
 *       500:
 *          description: Internal Server Error
 */
const express = require("express");
const {
  SignIn,
  SignUp,
  ResetPassword,
  VetSignIn,
  MccUserSignIn,
} = require("../controller/auth.controller");
const authRoute = express.Router();
authRoute.post("/signin", SignIn);
authRoute.post("/signup", SignUp);
authRoute.post("/Resetpassword", ResetPassword);
authRoute.post("/vet/signin", VetSignIn);
authRoute.post("/mccUser/signin", MccUserSignIn);

// authRoute

module.exports = authRoute;
