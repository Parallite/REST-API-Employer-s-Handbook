import EmployeeDto from '../dtos/employee-dto.js'
import { Employee } from '../models/employee-model.js'
import { User } from '../models/user-model.js'
import tokenService from './token-service.js';
import UserDto from '../dtos/user-dto.js';
import { ApiError } from '../exceptions/api-error.js';

class EmployeesService {
    async getAllEmployees() {
        const employees = await Employee.find(
            {},
            '-password -createdAt -updatedAt -__v -field')
            .populate('userId', '-password -createdAt -updatedAt -__v -field');
        return employees
    }
    async getEmployee(id) {
        const employee = await Employee.findById(id);
        if (!employee) {
            throw ApiError.BadRequest('Сотрудник не найден');
        }
        const employeeDto = new EmployeeDto(employee);
        return employeeDto
    }
    async getUserOfEmployee(id) {
        const user = await User.findById(id).populate('employeesId');
        if (!user) {
            throw ApiError.BadRequest('Сотрудник не найден');
        }
        return user
    }
    async addNewEmployee(data, refreshToken) {
        const currentUser = await tokenService.validateRefreshToken(refreshToken);
        const tokenFromDB = await tokenService.findToken(refreshToken);
        if (!currentUser || !tokenFromDB) {
            throw ApiError.UnathorizedError()
        }
        const existEmployee = await Employee.findOne({ firstName: data.firstName, lastName: data.lastName });
        if (existEmployee) {
            throw ApiError.BadRequest('Employee with this First Name & Last Name already exists')
        }
        const currentUserFromDB = await User.findById(currentUser._id);
        const userDto = new UserDto(currentUserFromDB);

        const newEmployeeData = { userId: userDto._id, ...data };
        const createdEmployee = (await Employee.create(newEmployeeData)).populate('userId');

        await User.findByIdAndUpdate(currentUser._id, { $push: { employeesId: (await createdEmployee)._id } })
        const createdEmployeeToClient = await Employee.find(
            { firstName: data.firstName, lastName: data.lastName },
            '-createdAt -updatedAt -__v -field')
            .populate('userId', '-password -createdAt -updatedAt -__v -field');
        return createdEmployeeToClient
    }
    async editDataEmployee(id, data, refreshToken) {
        const currentUser = await tokenService.validateRefreshToken(refreshToken);
        const currentUserFromDB = await User.findById(currentUser._id);
        const employeeFromDB = await Employee.findById(id);
        if (currentUserFromDB._id.toString() !== employeeFromDB.userId.toString()) {
            throw ApiError.BadRequest('У вас нет прав на редактирование данных указанного сотрудника')
        }
        const existEmployee = await Employee.findOne({ firstName: data.firstName, lastName: data.lastName });
        if (existEmployee) {
            throw ApiError.BadRequest('Employee with this First Name & Last Name already exists')
        }
        const { firstName, lastName, position, room, department, telephone, avatar } = data;
        if (!firstName || !lastName || !position || !room || !department || !telephone || !avatar) {
            throw ApiError.BadRequest('Заполните все требуемые поля сотрудника')
        }
        const updatedEmployeeData = await Employee.findByIdAndUpdate(employeeFromDB._id, {
            firstName: firstName,
            lastName: lastName,
            position: position,
            room: room,
            department: department,
            telephone: telephone,
            avatar: avatar,
        })
        return updatedEmployeeData
    }
    async removeEmployee(id, refreshToken) {
        const currentUser = await tokenService.validateRefreshToken(refreshToken);
        const currentUserFromDB = await User.findById(currentUser._id);
        const employeeFromDB = await Employee.findById(id);
        if (currentUserFromDB._id.toString() !== employeeFromDB.userId.toString()) {
            throw ApiError.BadRequest('У вас нет прав на удаление данного сотрудника')
        }
        const removedEmployee = await Employee.findByIdAndDelete(id);
        const updatedUserData = await User.findByIdAndUpdate(currentUser._id, { $pull: { employeesId: employeeFromDB._id } })
        return removedEmployee
    }
}

export default new EmployeesService()