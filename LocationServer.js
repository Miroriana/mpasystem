require("dotenv").config();
require("express-async-errors");
const PORT = process.env.PORT || 5050;
const express = require("express");
const cors = require("cors");
const app = express();
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const locationRoutes = require("./routes/locations.routes");

app.use(cors());
// app.use(cors());
app.use(express.json());

app.use("/api/v1/mmpas/locations/", locationRoutes);

app.use(notFound);
app.use(errorHandlerMiddleware);

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
