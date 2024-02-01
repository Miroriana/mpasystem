/**
 * @swagger
 * components:
 *   schemas:
 *     mcc:
 *       type: object
 *       required:
 *         - mccName
 *         - email
 *         - phoneNumber
 *         - password
 *         - district
 *         - sector
 *         - description
 *       properties:
 *         mccName:
 *           type: string
 *           description: Name of the MCC
 *         email:
 *           type: string
 *           description: Email of the MCC
 *         phoneNumber:
 *           type: string
 *           description: Phone number of the MCC
 *         password:
 *           type: string
 *           description: Password of the MCC
 *         district:
 *           type: string
 *           description: District of the MCC
 *         sector:
 *           type: string
 *           description: Sector of the MCC
 */

/** 
 * @swagger
 * tags: 
 *   - name: Mcc
 *     description: The mcc managing API
 * /mpas/mcc/listOfMcc:
 *   get:
 *     summary: List of all mcc
 *     tags:
 *       - Mcc
 *     responses:
 *       200:
 *         description: This is the mcc list
 *         content: 
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/mcc'
 */
/** 
 * @swagger
 * tags: 
 *   - name: Mcc
 *     description: The Mcc managing API
 * /mpas/mcc/addMcc:
 *   post:
 *     summary: Create a Mcc
 *     tags:
 *       - Mcc
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/mcc'
 *     responses:
 *       200:
 *         description: This mcc is created
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/mcc'
 *       500:
 *         description: Some server error
*/

/**
 * @swagger
 * tags:
 *   - name: Mcc
 *     description: The mcc managing API
 * /mpas/mcc/updateMcc:
 *   patch:
 *     summary: Update mcc
 *     tags:
 *       - Mcc
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
 *             $ref: '#/components/schemas/mcc'
 *     responses:
 *       '200':
 *         description: mcc updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/mcc'
 *       '500':
 *         description: Some server error
 *       '400':
 *         description: Bad request
 */
/**
 * @swagger
 * tags:
 *   - name: Mcc
 *     description: The mcc managing API
 * /mpas/mcc/deleteMcc:
 *   delete:
 *     summary: removing a mcc
 *     tags:
 *       - Mcc
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
 *             $ref: '#/components/schemas/mcc'
 *     responses:
 *       '200':
 *         description: mcc deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/mcc'
 *       '500':
 *         description: Some server error
 *       '400':
 *         description: Bad request
 */

/**
 * @swagger
 * tags:
 *   - name: Mcc
 *     description: The mcc managing API
 * /mpas/mcc/findMcc:
 *   get:
 *     summary:  Find mcc by ID
 *     tags:
 *       - Mcc
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: mcc is found successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/mcc'
 *       '500':
 *         description: Some server error
 *       '400':
 *         description: Bad request
 */

const express = require("express");
const {
  addMcc,
  removeMcc,
  updateMcc,
  findMcc,
  listMcc,
} = require("../controller/veterinary.controller");
const mccRouter = express.Router();

mccRouter.post("/addMcc", addMcc);
mccRouter.delete("/deleteMcc", removeMcc);
mccRouter.patch("/updateMcc", updateMcc);
mccRouter.get("/findMcc", findMcc);
mccRouter.get("/listOfMcc", listMcc);

module.exports = mccRouter;
