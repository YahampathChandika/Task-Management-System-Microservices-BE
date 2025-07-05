const { Tasks } = require("../models");
const { validateEmployee } = require("./employeeClient");
require("dotenv").config();
const axios = require("axios");

// CREATE Task
async function createTask(data, token) {
  try {
    // Validate employeeId if provided
    if (data.employeeId) {
      const isValid = await validateEmployee(data.employeeId, token);
      if (!isValid) {
        return { error: true, status: 400, payload: "Invalid employeeId" };
      }
    }

    // Create the task
    const task = await Tasks.create(data);
    return { error: false, status: 201, payload: task };
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
}

// GET All Tasks
async function getAllTasks() {
  try {
    const tasks = await Tasks.findAll();
    return { error: false, status: 200, payload: tasks };
  } catch (error) {
    console.error("Error getting all employees:", error);
    throw error;
  }
}

// GET Task by ID
async function getTaskById(id, token) {
  try {
    const task = await Tasks.findByPk(id);
    if (!task) return { error: true, status: 404, payload: "Task not found" };

    let employee = null;

    // Fetch employee data from Employee Service
    try {
      const response = await axios.get(
        `${process.env.EMPLOYEE_SERVICE_URL}/${task.employeeId}`,
        {
          headers: { Authorization: token },
        }
      );
      employee = response.data.payload;
    } catch (err) {
      console.warn("Employee not found or service error:", err.message);
    }

    return {
      error: false,
      status: 200,
      payload: {
        ...task.toJSON(),
        employee: employee,
      },
    };
  } catch (error) {
    console.error("Error getting task by ID:", error);
    throw error;
  }
}

// UPDATE Task
async function updateTask(id, data, token) {
  try {
    // Check if task exists
    const task = await Tasks.findByPk(id);
    if (!task) return { error: true, status: 404, payload: "Task not found" };

    // Validate employeeId if provided
    if (data.employeeId) {
      const isValid = await validateEmployee(data.employeeId, token);
      if (!isValid) {
        return { error: true, status: 400, payload: "Invalid employeeId" };
      }
    }

    // Update the task
    await Tasks.update(data, { where: { id } });
    return { error: false, status: 200, payload: task };
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
}

// DELETE Task
async function deleteTask(id) {
  try {
    // Check if task exists
    const task = await Tasks.findByPk(id);
    if (!task) return { error: true, status: 404, payload: "Task not found" };

    // Delete the task
    await task.destroy();
    return { error: false, status: 204, payload: "Task deleted" };
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
}

// ASSIGN employee to task
async function assignEmployeeToTask(taskId, employeeId, token) {
  try {
    const task = await Tasks.findByPk(taskId);
    if (!task) return { error: true, status: 404, payload: "Task not found" };

    const isValid = await validateEmployee(employeeId, token);
    if (!isValid) {
      return { error: true, status: 400, payload: "Invalid employeeId" };
    }

    task.employeeId = employeeId;
    await task.save();

    return { error: false, status: 200, payload: task };
  } catch (error) {
    console.error("Error assigning employee to task:", error);
    throw error;
  }
}

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  assignEmployeeToTask,
};
