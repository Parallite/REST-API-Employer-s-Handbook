import EmployeesService from "../services/employees-service.js";

class EmployeesController {
    /**
     * @route GET /api/employees
     * @desc get all employees
     * @access Private
     */
    async getAllEmployees(req, res, next) {
        try {
            const employees = await EmployeesService.getAllEmployees();
            res.status(200).json(employees);
        } catch (err) {
            next(err)
        }
    }
    /**
     * @route GET /api/employees/:id
     * @desc get employee
     * @access Private 
     */
    async getEmployee(req, res, next) {
        const { id } = req.params;
        try {
            const employee = await EmployeesService.getEmployee(id);
            res.status(200).json(employee);
        } catch (err) {
            next(err)
        }
    }
    /**
     * @route POST /api/employees/add
     * @desc add employee
     * @access Private
     */
    async addNewEmployee(req, res, next) {
        try {
            const data = req.body;
            const { refreshToken } = req.cookies;
            const employee = await EmployeesService.addNewEmployee(data, refreshToken);
            return res.status(201).json(employee);
        } catch (err) {
            next(err)
        }
    }
    /**
     * @route PUT /api/employees/edit/:id
     * @desc edit data of employee
     * @access Private
     */
    async editDataEmployee(req, res, next) {
        try {
            const data = req.body;
            const { id } = req.params;
            const { refreshToken } = req.cookies;
            const updatedEmployee = await EmployeesService.editDataEmployee(id, data, refreshToken)
            res.status(204)
        } catch (err) {
            next(err)
        }
    }
    /**
     * @route DELETE /api/employees/remove/:id
     * @desc remove employee
     * @access Private
     */
    async removeEmployee(req, res, next) {
        const { id } = req.params;
        try {
            const { refreshToken } = req.cookies;
            const removedEmployee = await EmployeesService.removeEmployee(id, refreshToken);
            res.status(204)
        } catch (err) {
            next(err)
        }
    }
}


export default new EmployeesController()