const express = require("express");
const employeeController = require("../controller/employee.controller");
const authMiddleware = require("../middleware/auth.middleware");

function getEmployeeRoutes(){
    const router = express.Router();
    router.use(express.json());
    router.use(authMiddleware);

    router.get("/", employeeController.getAllEmployees);
    router.get("/:id", employeeController.getEmployeeById);
    router.post("/", employeeController.createEmployee);
    router.put("/:id", employeeController.updateEmployee);
    router.delete("/:id", employeeController.deleteEmployee);

    return router;
}

module.exports = getEmployeeRoutes();