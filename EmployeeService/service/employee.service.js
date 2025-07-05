const { Employees } = require("../models");
const { Op } = require("sequelize");

// GET all employees
async function getAllEmployees() {
    try {
        const employees = await Employees.findAll();
        return { error: false, status: 200, payload: employees };
    } catch (error) {
        console.error("Error getting all employees:", error);
        throw error;
    }
}

// GET employee by ID
async function getEmployeeById(id) {
    try {
        const employee = await Employees.findByPk(id);
        if (!employee) {
            return { error: true, status: 404, payload: "Employee not found" };
        }
        return { error: false, status: 200, payload: employee };
    } catch (error) {
        console.error("Error getting employee by ID:", error);
        throw error;
    }
}

// CREATE employee
async function createEmployee(data) {
    try {
        // Validate required fields
        if (!data.name || !data.email || !data.phone || !data.position) {
            return { error: true, status: 400, payload: "Missing required fields" };
        }

        // Check if employee with the same email already exists
        const existingEmployee = await Employees.findOne({ where: { email: data.email } });
        if (existingEmployee) {
            return { error: true, status: 409, payload: "Employee with this email already exists" };
        }

        // Create new employee
        const employee = await Employees.create(data);
        return { error: false, status: 201, payload: employee };
    } catch (error) {
        console.error("Error creating employee:", error);
        return { error: true, status: 400, payload: error.message };
    }
}

// UPDATE employee
async function updateEmployee(id, data) {
    try {
        // Validate required fields
        if (!data.name || !data.email || !data.phone || !data.position) {
            return { error: true, status: 400, payload: "Missing required fields" };
        }
       
        // Find employee by ID
        const employee = await Employees.findByPk(id);
        if (!employee) {
            return { error: true, status: 404, payload: "Employee not found" };
        }

         // Check if employee with the same email already exists (excluding current employee)
         const existingEmployee = await Employees.findOne({
            where: {
                email: data.email,
                id: { [Op.ne]: id } // Exclude current employee
            }
        });
        
        if (existingEmployee) {
            return { error: true, status: 409, payload: "Employee with this email already exists" };
        }

        // Update employee
        await employee.update(data);
        return { error: false, status: 200, payload: employee };
    } catch (error) {
        console.error("Error updating employee:", error);
        return { error: true, status: 400, payload: error.message };
    }
}

// DELETE employee
async function deleteEmployee(id) {
    try {
        const employee = await Employees.findByPk(id);
        if (!employee) {
            return { error: true, status: 404, payload: "Employee not found" };
        }

        await employee.destroy();
        return { error: false, status: 204, payload: "Employee deleted successfully" };
    } catch (error) {
        console.error("Error deleting employee:", error);
        return { error: true, status: 400, payload: error.message };
    }
}

module.exports = {
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee,
};
