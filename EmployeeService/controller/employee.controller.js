const employeeService = require("../service/employee.service");

// GET all employees
async function getAllEmployees(req, res) {
    try {
        const result = await employeeService.getAllEmployees();
        return res.status(result.status).json(result);
    } catch (error) {
        return res.status(500).json({ error: true, payload: error.message });
    }
}

// GET employee by ID
async function getEmployeeById(req, res) {
    try {
        const result = await employeeService.getEmployeeById(req.params.id);
        return res.status(result.status).json(result);
    } catch (error) {
        return res.status(500).json({ error: true, payload: error.message });
    }
}

// CREATE new employee
async function createEmployee(req, res) {
    try {
        const result = await employeeService.createEmployee(req.body);
        return res.status(result.status).json(result);
    } catch (error) {
        return res.status(500).json({ error: true, payload: error.message });
    }
}

// UPDATE employee
async function updateEmployee(req, res) {
    try {
        const result = await employeeService.updateEmployee(req.params.id, req.body);
        return res.status(result.status).json(result);
    } catch (error) {
        return res.status(500).json({ error: true, payload: error.message });
    }
}

// DELETE employee
async function deleteEmployee(req, res) {
    try {
        const result = await employeeService.deleteEmployee(req.params.id);
        return res.status(result.status).json(result);
    } catch (error) {
        return res.status(500).json({ error: true, payload: error.message });
    }
}

module.exports = {
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee,
};
