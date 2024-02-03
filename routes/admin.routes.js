/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Veterinary:
 *       type: object
 *       required:
 *         - fullName
 *         - email
 *         - nationalId
 *         - phoneNumber
 *         - province
 *         - district
 *         - role
 *       properties:
 *         fullName:
 *           type: string
 *           description: Name of the veterinary
 *           example: John Doe
 *         email:
 *           type: string
 *           description: Email of the veterinary
 *           example: john.doe@example.com
 *         phoneNumber:
 *           type: string
 *           description: Phone number of the veterinary
 *           example: +1234567890
 *         nationalId:
 *           type: number
 *           description: National ID of the veterinary
 *           example: 123456789
 *         province:
 *           type: string
 *           description: Province of the veterinary
 *           example: prov1
 *         district:
 *           type: string
 *           description: District of the veterinary
 *           example: distr1
 *         role:
 *           type: string
 *           description: Role of the veterinary
 *           example: "veterinary"
 */

/**
 * @swagger
 * tags:
 *   - name: Veterinary
 *     description: The farmer managing API
 * /mpas/veterian/vet/allVets:
 *   get:
 *     summary: List of all veterinaries
 *     tags:
 *       - Veterinary
 *     responses:
 *       200:
 *         description: This is the veterinary list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Veterinary'
 */
/**
 * @swagger
 *
 * /mpas/veterian/vet/addVet:
 *   post:
 *     summary: Create a veterinary
 *     tags:
 *       - Veterinary
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Veterinary'  # Corrected schema reference to match the case
 *     responses:
 *       200:
 *         description: This Veterinary is created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Veterinary'  # Corrected schema reference to match the case
 *       500:
 *         description: Some server error
 */
/**
 * @swagger
 * /mpas/veterian/vet/updateVet:
 *   patch:
 *     summary: Update veterinarian
 *     tags:
 *       - Veterinary
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
 *             $ref: '#/components/schemas/Veterinary'  # Corrected schema reference to match the case
 *     responses:
 *       '200':
 *         description: Veterinarian updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Veterinary'  # Corrected schema reference to match the case
 *       '500':
 *         description: Some server error
 *       '400':
 *         description: Bad request
 */
/**
 * @swagger
 * /mpas/veterian/vet/removeVet:
 *   delete:
 *     summary: Remove veterinarian
 *     tags:
 *       - Veterinary
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Veterinarian deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Veterinary'
 *       '500':
 *         description: Some server error
 *       '400':
 *         description: Bad request
 */
/**
 * @swagger
 * /mpas/veterian/vet/findVet:
 *   get:
 *     summary: Find veterinarian by ID
 *     tags:
 *       - Veterinary
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Veterinarian is found successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Veterinary'  # Corrected schema reference to match the case
 *       '500':
 *         description: Some server error
 *       '400':
 *         description: Bad request
 */

const express = require("express");
const { verifyToken } = require("../middlewares/tokenVerification");
const {
  addVeterian,
  removeVeterinary,
  findVeterinaryById,
  listOfVeterinary,
  updateVeterinary,
} = require("../controller/admin.controller");

const adminRouter = express.Router();

adminRouter.post("/addVet", verifyToken, addVeterian);
adminRouter.delete("/removeVet", verifyToken, removeVeterinary);
adminRouter.get("/findVet", findVeterinaryById);
adminRouter.get("/allVets", listOfVeterinary);
adminRouter.patch("/updateVet", updateVeterinary);

module.exports = adminRouter;
