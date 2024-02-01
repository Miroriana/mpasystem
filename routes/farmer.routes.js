/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Farmer:
 *       type: object
 *       required:
 *         - fullName
 *         - email
 *         - phoneNumber
 *         - nationalId
 *         - verified
 *         - sector
 *       properties:
 *         fullName:
 *           type: string
 *           description: Name of the farmer
 *           example: John Farmer
 *         email:
 *           type: string
 *           description: Email of the farmer
 *           example: john.farmer@example.com
 *         phoneNumber:
 *           type: string
 *           description: Phone number of the farmer
 *           example: +1234567890
 *         nationalId:
 *           type: number
 *           description: National ID of the farmer
 *           example: 123456789
 *         sector:
 *           type: string
 *           description: Sector of the farmer
 *           example: sect1
 */

/**
 * @swagger
 * tags:
 *   - name: Farmer
 *     description: The farmer managing API
 * /mpas/farmerNews/farmer/allFarmers:
 *   get:
 *     summary: List of all farmer
 *     tags:
 *       - Farmer
 *     responses:
 *       200:
 *         description: This is the farmer list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Farmer'
 */
/** 
 * @swagger
 
 * /mpas/farmerNews/farmer/addFarmer:
 *   post:
 *     summary: Create a farmer
 *     tags:
 *       - Farmer
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Farmer'
 *     responses:
 *       200:
 *         description: This farmer is created
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Farmer'
 *       500:
 *         description: Some server error
*/
/**
 * @swagger
 * /mpas/farmerNews/farmer/updateFarmers:
 *   patch:
 *     summary: Update farmer
 *     tags:
 *       - Farmer
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Farmer'
 *     responses:
 *       '200':
 *         description: Farmer updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Farmer'
 *       '500':
 *         description: Some server error
 *       '400':
 *         description: Bad request
 */
/**
 * @swagger
 * /mpas/farmerNews/farmer/deleteFarmer:
 *   delete:
 *     summary: removing a farmer
 *     tags:
 *       - Farmer
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Farmer'
 *     responses:
 *       '200':
 *         description: Farmer deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Farmer'
 *       '500':
 *         description: Some server error
 *       '400':
 *         description: Bad request
 */
/**
 * @swagger
 * /mpas/farmerNews/farmer/findFarmer:
 *   get:
 *     summary:  Find farmer by ID
 *     tags:
 *       - Farmer
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Farmer is found successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Farmer'
 *       '500':
 *         description: Some server error
 *       '400':
 *         description: Bad request
 */

const express = require("express");
const {
  addFarmer,
  removeFarmer,
  findFarmerById,
  listOfFarmer,
  updateFarmer,
} = require("../controller/farmer.controller");
const { verifyToken } = require("../middlewares/tokenVerification");
const farmerRoute = express.Router();

farmerRoute.post("/addFarmer", verifyToken, addFarmer);
farmerRoute.delete("/deleteFarmer", verifyToken, removeFarmer);
farmerRoute.get("/findFarmer", verifyToken, findFarmerById);
farmerRoute.get("/allFarmers", listOfFarmer);
farmerRoute.patch("/updateFarmers", updateFarmer);

module.exports = farmerRoute;
