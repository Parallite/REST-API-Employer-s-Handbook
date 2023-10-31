import { Employee } from '../models/employee-model.js'
import { User } from '../models/user-model.js'
import tokenService from './token-service.js';
import UserDto from '../dtos/user-dto.js';
import { ApiError } from '../exceptions/api-error.js';
import EmployeeDto from '../dtos/employee-dto.js'

class EmployeesService {
    async getAllEmployees() {
        const employees = await Employee.find();
        return employees
    }
    async getEmployee(id) {
        const employee = await Employee.findById(id);
        if (!employee) {
            throw ApiError.BadRequest('Сотрудник не найден');
        }
        return employee
    }
    async addNewEmployee(data, refreshToken) {
        const currentUser = await tokenService.validateRefreshToken(refreshToken);
        const tokenFromDB = await tokenService.findToken(refreshToken);
        if (!currentUser || !tokenFromDB) {
            throw ApiError.UnathorizedError()
        }
        const existEmployee = await Employee.findOne({ firstName: data.firstName, lastName: data.lastName });
        if (existEmployee) {
            throw ApiError.BadRequest('Сотрудник с таким именем и фамилией уже существует')
        }
        const currentUserFromDB = await User.findById(currentUser.id);
        const userDto = new UserDto(currentUserFromDB);

        const newEmployeeData = { ...data, userId: userDto.id };
        const createdEmployee = await Employee.create(newEmployeeData);
        await User.findByIdAndUpdate(currentUser.id, { $push: { employeesId: createdEmployee.id } })

        return newEmployeeData
    }
    async editDataEmployee(id, data, refreshToken) {
        const currentUser = await tokenService.validateRefreshToken(refreshToken);
        const currentUserFromDB = await User.findById(currentUser.id);
        const employeeFromDB = await Employee.findById(id);
        if (currentUserFromDB.id !== employeeFromDB.userId.toString()) {
            throw ApiError.BadRequest('У вас нет прав на редактирование данных указанного сотрудника')
        }
        const { firstName, lastName, age, address } = data;
        if (!firstName || !lastName || !age || !address) {
            throw ApiError.BadRequest('Заполните все требуемые поля сотрудника')
        }
        const updatedEmployeeData = await Employee.findByIdAndUpdate(employeeFromDB.id, {
            firstName: firstName,
            lastName: lastName,
            age: age,
            address: address
        })
        return updatedEmployeeData
    }
    async removeEmployee(id, refreshToken) {
        const currentUser = await tokenService.validateRefreshToken(refreshToken);
        const currentUserFromDB = await User.findById(currentUser.id);
        const employeeFromDB = await Employee.findById(id);
        if (currentUserFromDB.id !== employeeFromDB.userId.toString()) {
            throw ApiError.BadRequest('У вас нет прав на удаление данного сотрудника')
        }
        const removedEmployee = await Employee.findByIdAndDelete(id);
        const updatedUserData = await User.findByIdAndUpdate(currentUser.id, { $pull: { employeesId: employeeFromDB.id } })
        return removedEmployee
    }
}

export default new EmployeesService()