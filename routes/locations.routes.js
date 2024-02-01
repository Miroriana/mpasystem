const express = require("express");
const locationRoutes = express.Router();

const {
  findCells,
  findDistricts,
  findProvinces,
  findSectors,
  findVillages,
  provinceTranslator,
} = require("../controller/locationManager");

locationRoutes.get("/provinces", provinceTranslator, findProvinces);
locationRoutes.get("/districts", provinceTranslator, findDistricts);
locationRoutes.get("/sectors", provinceTranslator, findSectors);
locationRoutes.get("/cells", provinceTranslator, findCells);
locationRoutes.get("/villages", provinceTranslator, findVillages);

module.exports = locationRoutes;
