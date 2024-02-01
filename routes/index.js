const adminRouter = require("./admin.routes");
const authRoute = require("./auth.routes");
const mccUserRoute = require("./mccUser.routes");
const farmerRoute = require("./farmer.routes");
const milkProductionRoutes = require("./milkProduction.routes"); // Import milk production routes

const express = require("express");
const mccRouter = require("./veterinary.routes");
const mccUserRouter = require("./mccUser.routes");
const {
  globalErrorController,
} = require("../controller/Errors/errorController");
const { errorHandler } = require("../utility/errorHandlerClass");

// All routes
const allRoutes = express.Router();
const farmerRoutes = express.Router();
const adminRouters = express.Router();
const mccRouters = express.Router();
const mccUserRouters = express.Router();
const milkProductionRouters = express.Router();
// Farmer routes
farmerRoutes.use("/farmer", farmerRoute);

// Milk production routes
//allRoutes.use('/milk-production', milkProductionRoutes); // Use the /milk-production prefix for milk production routes

// Authentication
allRoutes.use("/auth", authRoute);

// Admin routers
adminRouters.use("/vet", adminRouter);
//MCC routes
mccRouters.use("/mcc", mccRouter);
//MCC User routes
mccUserRouters.use("/mccUser", mccUserRoute);
//milkProduction routes
milkProductionRouters.use("/milkProduction", milkProductionRoutes);
milkProductionRouters.all("*", (req, res, next) => {
  next(new errorHandler(404, `Failure connecting to the server!`));
});

module.exports = {
  allRoutes,
  farmerRoutes,
  adminRouters,
  mccRouters,
  mccUserRouters,
  milkProductionRouters,
};
