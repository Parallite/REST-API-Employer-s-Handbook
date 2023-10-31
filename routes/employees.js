import express from 'express';
import EmployeesController from '../controllers/employees-controller.js'
import { authMiddleware } from '../middlewares/auth-middleware.js'

const router = express.Router();

// /api/employees
router.get('/', authMiddleware, EmployeesController.getAllEmployees);

// /api/employees/:id
router.get('/:id', authMiddleware, EmployeesController.getEmployee);

// /api/employees/add
router.post('/add', authMiddleware, EmployeesController.addNewEmployee);

// /api/employees//edit/:id
router.patch('/edit/:id', authMiddleware, EmployeesController.editDataEmployee);

// /api/employees/remove/:id
router.delete('/remove/:id', authMiddleware, EmployeesController.removeEmployee);

export default router;