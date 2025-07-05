const taskService = require("../service/task.service");

// GET All Tasks
async function getAllTasks(req, res) {
    try {
        const result = await taskService.getAllTasks();
        return res.status(result.status).json(result);
    } catch (error) {
        return res.status(500).json({ error: true, payload: error.message });
    }
}

// GET Task by ID
async function getTaskById(req, res) {
    try {
        const result = await taskService.getTaskById(
            req.params.id,
            req.headers.authorization
        );
        res.status(result.status).json(result);
    } catch (error) {
        return res.status(500).json({ error: true, payload: error.message });
    }
}

// CREATE Task
async function createTask(req, res) {
    try {
        const result = await taskService.createTask(req.body, req.headers.authorization);
        res.status(result.status).json(result);
    } catch (error) {
        return res.status(500).json({ error: true, payload: error.message });
    }
}

// UPDATE Task
async function updateTask(req, res) {
    try {
        const result = await taskService.updateTask(req.params.id, req.body, req.headers.authorization);
        res.status(result.status).json(result);
    } catch (error) {
        return res.status(500).json({ error: true, payload: error.message });
    }
}

// DELETE Task
async function deleteTask(req, res) {
    try {
        const result = await taskService.deleteTask(req.params.id);
        res.status(result.status).json(result);
    } catch (error) {
        return res.status(500).json({ error: true, payload: error.message });
    }
}

// ASSIGN Employee to Task
async function assignEmployeeToTask(req, res) {
    try {
        const { employeeId } = req.body;
        const result = await taskService.assignEmployeeToTask(
            req.params.id,
            employeeId,
            req.headers.authorization
        );
        res.status(result.status).json(result);
    } catch (error) {
        return res.status(500).json({ error: true, payload: error.message });
    }
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  assignEmployeeToTask
};
