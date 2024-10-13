// routes/employee.js
import express from 'express';
import Employee from '../models/Employee.js';

const router = express.Router();

// GET /api/v1/emp/employees
router.get('/employees', async (req, res) => {
    try {
        const employees = await Employee.find(); // Fetch all employees
        res.json(employees); // Respond with the list of employees
    } catch (error) {
        console.error("Error fetching employees:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});

// GET /api/v1/emp/employees/:id
router.get('/employees/:id', async (req, res) => {
    const { id } = req.params; // Get the employee ID from the URL

    try {
        const employee = await Employee.findById(id); // Fetch employee by ID
        if (!employee) {
            return res.status(404).json({ message: "Employee not found." });
        }
        res.json(employee); // Respond with the employee data
    } catch (error) {
        console.error("Error fetching employee:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});

// POST /api/v1/emp/employees
router.post('/employees', async (req, res) => {
    const { first_name, last_name, email, position, salary, date_of_joining, department } = req.body;

    try {
        const employee = new Employee({ 
            first_name, 
            last_name, 
            email, 
            position, 
            salary, 
            date_of_joining, 
            department 
        });
        await employee.save();
        
        res.status(201).json({
            message: "Employee created successfully.",
            employee_id: employee._id,
        });
    } catch (error) {
        console.error("Error creating employee:", error);
        res.status(400).json({ message: "Bad request." });
    }
});

// PUT /api/v1/emp/employees/:id
router.put('/employees/:id', async (req, res) => {
    const { id } = req.params; // Get the employee ID from the URL
    const { position, salary } = req.body; // Destructure fields from request body

    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(
            id,
            { position, salary }, // Fields to update
            { new: true, runValidators: true } // Options to return updated document and run validators
        );

        if (!updatedEmployee) {
            return res.status(404).json({ message: "Employee not found." });
        }

        res.json(updatedEmployee); // Respond with updated employee data
    } catch (error) {
        console.error("Error updating employee:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});

// DELETE /api/v1/emp/employees/:id
router.delete('/employees/:id', async (req, res) => {
    const { id } = req.params; // Get the employee ID from the URL

    try {
        const deletedEmployee = await Employee.findByIdAndDelete(id); // Delete employee by ID
        if (!deletedEmployee) {
            return res.status(404).json({ message: "Employee not found." });
        }
        res.status(204).send(); // Respond with 204 No Content
    } catch (error) {
        console.error("Error deleting employee:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});

export default router; // Use ES module export