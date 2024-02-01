require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { connectDb } = require("./db/dbConnection");
const {
  farmerRoutes,
  allRoutes,
  adminRouters,
  mccRouters,
  mccUserRouters,
  milkProductionRouters,
} = require("./routes/index");
require("colors");
const app = express();
const swaggerui = require("swagger-ui-express");
const swaggerjsdocs = require("swagger-jsdoc");
const {
  globalErrorController,
} = require("./controller/Errors/errorController");
const { errorHandler } = require("./utility/errorHandlerClass");

app.use(cors());

//connect dabatabase
connectDb;

app.use(express.json());
// making the api
// api for authentication
app.use("/mpas/authentication/v1", allRoutes);
//farmer routes
app.use("/mpas/farmerNews", farmerRoutes);
//admin routes
app.use("/mpas/veterian", adminRouters);
//mccRoutes
app.use("/mpas", mccRouters);
//mmccUserRoutes
app.use("/mpas", mccUserRouters);
//milkProductionRoutes
app.use("/mpas", milkProductionRouters);
app.use(globalErrorController);
//swagger connection
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "MPAS apis docs",
      version: "0.1.0",
      description:
        "This is a simple Milk PAS API application made with Express and documented with Swagger",
      contact: {
        name: "milk production analytical system",
        url: "milkpas.com",
        email: "milkpas00@gmail.com",
      },
    },
    servers: [
      {
        url: "https://milk-production-analytical-system.onrender.com/",
      },
      {
        url: "http://localhost:5678/",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const spacs = swaggerjsdocs(options);
app.use("/api-docs", swaggerui.serve, swaggerui.setup(spacs));

// conncet to database

app.listen(process.env.PORT, () => {
  mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log(`listening on port ${process.env.PORT}`.bgMagenta);
    })
    .catch((err) => console.log("couldn't connect to the database"));
});
