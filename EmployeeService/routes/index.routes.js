const express = require("express");

// const userRoutes = require("./user.routes");
const employeeRoutes = require("./employee.routes");

function routes() {
  const router = express.Router();

  router.use("/", employeeRoutes);

  return router;
}

module.exports = routes();
