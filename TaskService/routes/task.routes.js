const express = require("express");
const taskController = require("../controller/task.controller");
const authMiddleware = require("../middleware/auth.middleware");

function getTaskRoutes(){
    const router = express.Router();
    router.use(express.json());
    router.use(authMiddleware);

    router.get("/", taskController.getAllTasks);
    router.get("/:id", taskController.getTaskById);
    router.post("/", taskController.createTask);
    router.put("/:id", taskController.updateTask);
    router.delete("/:id", taskController.deleteTask);

    router.put("/:id/assign", taskController.assignEmployeeToTask);

    return router;
}

module.exports = getTaskRoutes();