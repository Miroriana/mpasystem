/**
 * @swagger
 * components:
 *   schemas:
 *     milkProduction:
 *       type: object
 *       required:
 *         - farmerId
 *         - quantity
 *         - timestamps
 *         - description
 *       properties:
 *         farmerId:
 *           type: string
 *           description: ID of the farmer
 *         quantity:
 *           type: string
 *           description: Quantity of milk production
 *         timestamps:
 *           type: string  # Adjust the type accordingly based on your requirements
 *           description: Timestamps related to milk production
 */
/** 
 * @swagger
 * tags: 
 *   - name: milkProduction
 *     description: The milkProduction managing API
 * /mpas/mcc/listOfMcc:
 *   get:
 *     summary: List of all milkProduction
 *     tags:
 *       - milkProduction
 *     responses:
 *       200:
 *         description: This is the milkProduction list
 *         content: 
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/milkProduction'
 */
/** 
 * @swagger

 * /mpas/mcc/addMcc:
 *   post:
 *     summary: Create a milkProduction
 *     tags:
 *       - milkProduction
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/milkProduction'
 *     responses:
 *       200:
 *         description: This milkProduction is created
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/milkProduction'
 *       500:
 *         description: Some server error
*/

/**
 * @swagger
 * /mpas/mcc/updateMcc:
 *   patch:
 *     summary: Update milkProduction
 *     tags:
 *       - milkProduction
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
 *             $ref: '#/components/schemas/milkProduction'
 *     responses:
 *       '200':
 *         description: milkProduction updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/milkProduction'
 *       '500':
 *         description: Some server error
 *       '400':
 *         description: Bad request
 */
/**
 * @swagger

 * /mpas/mcc/deleteMcc:
 *   delete:
 *     summary: removing a milkProduction
 *     tags:
 *       - milkProduction
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
 *             $ref: '#/components/schemas/milkProduction'
 *     responses:
 *       '200':
 *         description: milkProduction deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/milkProduction'
 *       '500':
 *         description: Some server error
 *       '400':
 *         description: Bad request
 */

/**
 * @swagger
 * /mpas/mcc/findMcc:
 *   get:
 *     summary:  Find milkProduction by ID
 *     tags:
 *       - milkProduction
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: milkProduction is found successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/milkProduction'
 *       '500':
 *         description: Some server error
 *       '400':
 *         description: Bad request
 */


const express = require("express");
const router = express.Router();
const {
  listOfmilkProduction,
  findmilkProductionById,
  removemilkProduction,
  addmilkProduction,
  updatemilkProduction,
  addedMilkProduction,
} = require("../controller/milkProduction.controller");

router.post("/addMilkProduction", addmilkProduction, addedMilkProduction);
router.delete("/deleteMilkProduction", removemilkProduction);
router.get("/findMilkProduction", findmilkProductionById);
router.get("/allMilkProductions", listOfmilkProduction);
router.put("/updateMilkProduction", updatemilkProduction);

module.exports = router;
